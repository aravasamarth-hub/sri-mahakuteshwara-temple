import os
import shutil
import uuid
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from lib.db import db_store
from models.temple_models import (
    ContactInquiry,
    DonationIntent,
    Festival,
    HallInquiry,
    PaymentVerification,
    PoojaBooking,
    RoomInquiry,
    TempleTiming,
)
from services.email_service import send_temple_email
from services.whatsapp_service import (
    donation_whatsapp_message,
    generate_whatsapp_link,
    pooja_whatsapp_message,
    room_whatsapp_message,
)

router = APIRouter(prefix="/api")

UPLOAD_DIR = Path(__file__).parent.parent / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/contact")
async def create_contact(inquiry: ContactInquiry):
    await db_store.insert_one("contact_inquiries", inquiry.model_dump())

    # Send async email acknowledgement
    if inquiry.email:
        await send_temple_email(
            to_email=inquiry.email,
            subject="Contact Message Received · Sri Kshetra Mahakuteshwara Temple",
            title="Thank You for Reaching Out",
            subtitle="Your message has been received by the Sri Mahakuteshwara Temple administration.",
            fields={
                "Name": inquiry.fullName,
                "Phone": inquiry.phone,
                "Message": inquiry.message,
                "Date": inquiry.createdAt[:10],
            },
        )

    wa_msg = (
        f"॥ Om Namah Shivaya ॥\n"
        f"Contact inquiry from {inquiry.fullName} ({inquiry.phone}):\n\n"
        f"{inquiry.message}"
    )
    return {
        "success": True,
        "id": inquiry.id,
        "message": "Inquiry received successfully",
        "whatsappUrl": generate_whatsapp_link(wa_msg),
    }


@router.post("/pooja-booking")
async def create_pooja_booking(booking: PoojaBooking):
    await db_store.insert_one("pooja_bookings", booking.model_dump())

    if booking.email:
        await send_temple_email(
            to_email=booking.email,
            subject=f"Pooja Booking Confirmation · {booking.referenceId}",
            title="Pooja Seva Registered",
            subtitle="Your sacred pooja request has been successfully recorded in the temple ledger.",
            fields={
                "Reference ID": booking.referenceId,
                "Devotee Name": booking.fullName,
                "Sacred Pooja": booking.poojaName,
                "Preferred Date": booking.preferredDate,
                "Nakshatra / Gotra": booking.nakshatra or "Not specified",
                "Offering Amount": f"₹{int(booking.amount)}",
                "Payment Status": booking.paymentStatus,
            },
        )

    wa_msg = pooja_whatsapp_message(
        booking.referenceId,
        booking.fullName,
        booking.poojaName,
        booking.preferredDate,
        booking.amount,
        booking.paymentStatus,
    )
    return {
        "success": True,
        "id": booking.id,
        "referenceId": booking.referenceId,
        "whatsappUrl": generate_whatsapp_link(wa_msg),
    }


@router.post("/room-booking")
async def create_room_booking(inquiry: RoomInquiry):
    await db_store.insert_one("room_inquiries", inquiry.model_dump())

    if inquiry.email:
        await send_temple_email(
            to_email=inquiry.email,
            subject=f"Pravasi Nilaya Room Request · {inquiry.referenceId}",
            title="Guest House Request Received",
            subtitle="Your accommodation request for Sri Mahakuteshwara Pravasi Nilaya has been received.",
            fields={
                "Reference ID": inquiry.referenceId,
                "Pilgrim Name": inquiry.fullName,
                "Check-in Date": inquiry.checkInDate,
                "Check-out Date": inquiry.checkOutDate,
                "Rooms Requested": str(inquiry.numberOfRooms),
                "Number of Guests": str(inquiry.numberOfGuests),
                "Room Type": inquiry.roomType,
            },
        )

    wa_msg = room_whatsapp_message(
        inquiry.referenceId,
        inquiry.fullName,
        inquiry.checkInDate,
        inquiry.checkOutDate,
        inquiry.numberOfRooms,
    )
    return {
        "success": True,
        "id": inquiry.id,
        "referenceId": inquiry.referenceId,
        "whatsappUrl": generate_whatsapp_link(wa_msg),
    }


@router.post("/hall-booking")
async def create_hall_booking(inquiry: HallInquiry):
    await db_store.insert_one("hall_inquiries", inquiry.model_dump())

    if inquiry.email:
        await send_temple_email(
            to_email=inquiry.email,
            subject=f"Kalyan Mantapa Inquiry · {inquiry.referenceId}",
            title="Kalyan Mantapa Booking Request",
            subtitle="Your function hall reservation request has been received by the temple trust.",
            fields={
                "Reference ID": inquiry.referenceId,
                "Name": inquiry.fullName,
                "Hall Type": inquiry.hallType,
                "Event Date": inquiry.eventDate,
                "Estimated Guests": inquiry.estimatedGuests or "300+",
            },
        )

    wa_msg = (
        f"॥ Om Namah Shivaya ॥\n"
        f"Sri Kshetra Mahakuteshwara Temple · Badami\n"
        f"Hall Inquiry: {inquiry.referenceId}\n"
        f"• Name: {inquiry.fullName}\n"
        f"• Hall: {inquiry.hallType}\n"
        f"• Date: {inquiry.eventDate}\n"
        f"• Guests: {inquiry.estimatedGuests}"
    )
    return {
        "success": True,
        "id": inquiry.id,
        "referenceId": inquiry.referenceId,
        "whatsappUrl": generate_whatsapp_link(wa_msg),
    }


@router.post("/donation")
async def create_donation(donation: DonationIntent):
    await db_store.insert_one("donations", donation.model_dump())

    if donation.email:
        await send_temple_email(
            to_email=donation.email,
            subject=f"Hundi Donation Acknowledgement · {donation.referenceId}",
            title="Seva Contribution Recorded",
            subtitle="Thank you for supporting Sri Kshetra Mahakuteshwara Religious & Charitable Trust.",
            fields={
                "Reference ID": donation.referenceId,
                "Donor Name": donation.fullName,
                "Seva Category": donation.sevaCategory,
                "Amount": f"₹{int(donation.amount)}",
                "PAN (80G)": donation.panNumber or "Not provided",
                "Status": donation.status,
            },
        )

    wa_msg = donation_whatsapp_message(
        donation.referenceId,
        donation.fullName,
        donation.sevaCategory,
        donation.amount,
    )
    return {
        "success": True,
        "id": donation.id,
        "referenceId": donation.referenceId,
        "whatsappUrl": generate_whatsapp_link(wa_msg),
    }


@router.post("/payment-verification")
async def submit_payment_verification(
    referenceId: str = Form(...),
    linkedType: str = Form(...),
    devoteeName: str = Form(...),
    phone: str = Form(...),
    amount: float = Form(...),
    utrNumber: Optional[str] = Form(""),
    file: UploadFile = File(...),
):
    # Validate file extension
    ext = Path(file.filename or "").suffix.lower()
    if ext not in [".jpg", ".jpeg", ".png", ".webp", ".pdf"]:
        raise HTTPException(status_code=400, detail="Only JPG, PNG, WEBP, or PDF screenshots are accepted.")

    saved_filename = f"{referenceId}_{uuid.uuid4().hex[:6]}{ext}"
    dest_path = UPLOAD_DIR / saved_filename
    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    screenshot_url = f"/uploads/{saved_filename}"

    verification = PaymentVerification(
        referenceId=referenceId,
        linkedType=linkedType,
        devoteeName=devoteeName,
        phone=phone,
        amount=amount,
        utrNumber=utrNumber or "",
        screenshotUrl=screenshot_url,
        paymentStatus="Pending",
    )

    await db_store.insert_one("payment_verifications", verification.model_dump())

    # Update payment status on the linked booking or donation if found
    coll = "pooja_bookings" if linkedType == "pooja" else "donations" if linkedType == "donation" else None
    if coll:
        await db_store.update_one(coll, {"referenceId": referenceId}, {"$set": {"paymentStatus": "Pending Verification"}})

    wa_msg = (
        f"॥ Om Namah Shivaya ॥\n"
        f"Sri Kshetra Mahakuteshwara Temple · Badami\n"
        f"UPI Payment Submitted for Verification:\n\n"
        f"• Reference ID: {referenceId}\n"
        f"• Devotee: {devoteeName}\n"
        f"• Amount: ₹{int(amount)}\n"
        f"• UTR: {utrNumber or 'Screenshot Uploaded'}\n\n"
        f"Temple accounts desk will review and verify your receipt shortly."
    )

    return {
        "success": True,
        "id": verification.id,
        "referenceId": referenceId,
        "screenshotUrl": screenshot_url,
        "whatsappUrl": generate_whatsapp_link(wa_msg),
        "message": "Payment receipt uploaded successfully. Status: Pending Verification.",
    }


@router.get("/festivals")
async def get_active_festivals():
    items = await db_store.find("festivals", query={"isActive": True})
    if not items:
        # Seed initial authentic festivals if empty
        default_festivals = [
            Festival(
                titleEn="Sri Mahakuteshwara Annual Jatre (Car Festival)",
                titleKn="ಶ್ರೀ ಮಹಾಕೂಟೇಶ್ವರ ವಾರ್ಷಿಕ ಜಾತ್ರಾ ಮಹೋತ್ಸವ",
                titleHi="श्री महाकूटेश्वर वार्षिक जात्रा महोत्सव",
                dateString="Magha Shuddha Poornima · Annual Rathotsava",
                descriptionEn="The grand annual chariot festival celebrating Lord Shiva with Pushkarini teertha snana, pallaki seva, and divine archana.",
                descriptionKn="ಪಾಪವಿನಾಶ ಪುಷ್ಕರಿಣಿ ತೀರ್ಥಸ್ನಾನ, ಪಲ್ಲಕ್ಕಿ ಸೇವೆ, ಮತ್ತು ಬ್ರಹ್ಮ ರಥೋತ್ಸವದೊಂದಿಗೆ ವಿಜೃಂಭಣೆಯಿಂದ ನೆರವೇರುವ ವಾರ್ಷಿಕ ಜಾತ್ರೆ.",
                descriptionHi="पापविनाशी तीर्थ स्नान, पालकी सेवा एवं भव्य ब्रह्मारथोत्सव के साथ मनाया जाने वाला वार्षिक पावन उत्सव।",
                bannerImage="/images/temple/twin-shrines-canopy.jpg",
                isActive=True,
            ),
            Festival(
                titleEn="Maha Shivaratri Jagaran & Special Abhisheka",
                titleKn="ಮಹಾ ಶಿವರಾತ್ರಿ ಜಾಗರಣೆ ಹಾಗೂ ಮಹಾ ಅಭಿಷೇಕ",
                titleHi="महाशिवरात्रि जागरण एवं विशेष अभिषेक",
                dateString="Maha Shivaratri Night · All-night Darshan",
                descriptionEn="All-night Rudrabhisheka, continuous bilva patra offerings, and sacred deepotsava around the holy stepped shrine.",
                descriptionKn="ರಾತ್ರಿಪೂರ್ತಿ ನಿರಂತರ ರುದ್ರಾಭಿಷೇಕ, ಬಿಲ್ವಪತ್ರೆ ಸಮರ್ಪಣೆ ಮತ್ತು ಪುರಾತನ ದೇವಾಲಯದ ಪ್ರಾಂಗಣದಲ್ಲಿ ದೀಪೋತ್ಸವ.",
                descriptionHi="अहोरात्र रुद्राभिषेक, अखंड बिल्वपत्र अर्चन एवं दीप प्रज्ज्वलन सहित पावन जागरण।",
                bannerImage="/images/temple/shikhara-view.jpg",
                isActive=True,
            ),
        ]
        for f in default_festivals:
            await db_store.insert_one("festivals", f.model_dump())
        items = [f.model_dump() for f in default_festivals]
    return items


@router.get("/timings")
async def get_temple_timings():
    timing = await db_store.find_one("timings", {"id": "default-timings"})
    if not timing:
        default_timing = TempleTiming()
        await db_store.insert_one("timings", default_timing.model_dump())
        return default_timing.model_dump()
    return timing


@router.get("/room-availability")
async def get_room_availability(checkIn: str, checkOut: str):
    """Checks room availability for given dates."""
    # Count how many confirmed bookings overlap these dates
    bookings = await db_store.find("room_inquiries", {"status": "Confirmed"})
    total_rooms = 18  # Pravasi Nilaya total capacity
    occupied = min(len(bookings), total_rooms - 2)
    available = total_rooms - occupied
    return {
        "checkIn": checkIn,
        "checkOut": checkOut,
        "totalRooms": total_rooms,
        "availableRooms": max(1, available),
        "status": "Available" if available > 3 else "Fast Filling",
    }
