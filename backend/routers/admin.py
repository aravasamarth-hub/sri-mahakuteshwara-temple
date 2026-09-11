import csv
import io
import os
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Header, HTTPException, Query, Response
from lib.db import db_store
from models.temple_models import Festival, TempleTiming
from pydantic import BaseModel

router = APIRouter(prefix="/api/admin")

ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Mahakuta@2026")
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "mahakuta_secret_admin_token_2026")


class AdminLoginRequest(BaseModel):
    username: str
    password: str


class StatusUpdateRequest(BaseModel):
    collection: str  # "pooja_bookings" | "room_inquiries" | "hall_inquiries" | "contact_inquiries" | "donations"
    status: str
    notes: Optional[str] = ""


class PaymentVerifyRequest(BaseModel):
    status: str  # "Verified" | "Rejected"
    notes: Optional[str] = ""


def verify_admin_auth(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Admin authorization required.")
    token = authorization.replace("Bearer ", "").strip()
    if token != ADMIN_TOKEN:
        raise HTTPException(status_code=403, detail="Invalid admin token.")
    return True


@router.post("/login")
async def admin_login(req: AdminLoginRequest):
    if req.username == ADMIN_USERNAME and req.password == ADMIN_PASSWORD:
        return {
            "success": True,
            "token": ADMIN_TOKEN,
            "user": {"username": req.username, "role": "Temple Administrator"},
        }
    raise HTTPException(status_code=401, detail="Invalid username or password.")


@router.get("/stats")
async def get_dashboard_stats():
    pooja_count = await db_store.count("pooja_bookings")
    room_count = await db_store.count("room_inquiries")
    hall_count = await db_store.count("hall_inquiries")
    contact_count = await db_store.count("contact_inquiries")
    donations = await db_store.find("donations")
    pending_payments = await db_store.count("payment_verifications", {"paymentStatus": "Pending"})

    today_str = datetime.utcnow().strftime("%Y-%m-%d")
    today_donation_total = sum(
        float(d.get("amount", 0)) for d in donations if str(d.get("createdAt", ""))[:10] == today_str
    )
    all_donation_total = sum(float(d.get("amount", 0)) for d in donations)

    return {
        "totalBookings": pooja_count + room_count + hall_count,
        "poojaBookings": pooja_count,
        "roomRequests": room_count,
        "hallRequests": hall_count,
        "contactMessages": contact_count,
        "todayDonations": today_donation_total,
        "totalDonations": all_donation_total,
        "pendingPayments": pending_payments,
    }


@router.get("/bookings")
async def get_all_bookings(
    status: Optional[str] = Query(None),
    kind: Optional[str] = Query(None),  # "pooja", "room", "hall"
    search: Optional[str] = Query(None),
):
    results = []

    if not kind or kind == "pooja":
        poojas = await db_store.find("pooja_bookings")
        for p in poojas:
            p["kind"] = "pooja"
            results.append(p)

    if not kind or kind == "room":
        rooms = await db_store.find("room_inquiries")
        for r in rooms:
            r["kind"] = "room"
            results.append(r)

    if not kind or kind == "hall":
        halls = await db_store.find("hall_inquiries")
        for h in halls:
            h["kind"] = "hall"
            results.append(h)

    # Sort descending by createdAt
    results.sort(key=lambda x: str(x.get("createdAt", "")), reverse=True)

    if status and status != "All":
        results = [r for r in results if r.get("status") == status]

    if search:
        s = search.lower()
        results = [
            r
            for r in results
            if s in str(r.get("fullName", "")).lower()
            or s in str(r.get("phone", "")).lower()
            or s in str(r.get("referenceId", "")).lower()
        ]

    return results


@router.get("/inquiries")
async def get_contact_inquiries(search: Optional[str] = Query(None)):
    items = await db_store.find("contact_inquiries")
    if search:
        s = search.lower()
        items = [
            i
            for i in items
            if s in str(i.get("fullName", "")).lower()
            or s in str(i.get("phone", "")).lower()
            or s in str(i.get("message", "")).lower()
        ]
    return items


@router.get("/donations")
async def get_donations(search: Optional[str] = Query(None)):
    items = await db_store.find("donations")
    if search:
        s = search.lower()
        items = [
            i
            for i in items
            if s in str(i.get("fullName", "")).lower()
            or s in str(i.get("phone", "")).lower()
            or s in str(i.get("referenceId", "")).lower()
            or s in str(i.get("sevaCategory", "")).lower()
        ]
    return items


@router.get("/payments")
async def get_payments(status: Optional[str] = Query(None)):
    query = {"paymentStatus": status} if status and status != "All" else None
    items = await db_store.find("payment_verifications", query=query)
    return items


@router.patch("/{id}/status")
async def update_booking_status(id: str, req: StatusUpdateRequest):
    allowed_collections = ["pooja_bookings", "room_inquiries", "hall_inquiries", "contact_inquiries", "donations"]
    if req.collection not in allowed_collections:
        raise HTTPException(status_code=400, detail="Invalid collection name.")

    update_payload = {"status": req.status}
    if req.notes is not None:
        update_payload["notes"] = req.notes

    updated = await db_store.update_one(req.collection, {"id": id}, {"$set": update_payload})
    if not updated:
        # Also try matching by referenceId
        updated = await db_store.update_one(req.collection, {"referenceId": id}, {"$set": update_payload})

    return {"success": updated, "status": req.status}


@router.patch("/payments/{id}/verify")
async def verify_payment(id: str, req: PaymentVerifyRequest):
    record = await db_store.find_one("payment_verifications", {"id": id})
    if not record:
        record = await db_store.find_one("payment_verifications", {"referenceId": id})
    if not record:
        raise HTTPException(status_code=404, detail="Payment record not found.")

    update_data = {
        "paymentStatus": req.status,
        "adminNotes": req.notes or "",
        "verifiedAt": datetime.utcnow().isoformat(),
    }
    await db_store.update_one("payment_verifications", {"id": record["id"]}, {"$set": update_data})

    # Update corresponding pooja or donation
    ref_id = record.get("referenceId")
    if record.get("linkedType") == "pooja":
        await db_store.update_one(
            "pooja_bookings",
            {"referenceId": ref_id},
            {"$set": {"paymentStatus": req.status, "status": "Confirmed" if req.status == "Verified" else "Pending"}},
        )
    elif record.get("linkedType") == "donation":
        await db_store.update_one(
            "donations",
            {"referenceId": ref_id},
            {"$set": {"paymentStatus": req.status, "status": "Confirmed" if req.status == "Verified" else "Pending"}},
        )

    return {"success": True, "referenceId": ref_id, "status": req.status}


@router.post("/festivals")
async def create_festival(festival: Festival):
    await db_store.insert_one("festivals", festival.model_dump())
    return {"success": True, "id": festival.id}


@router.delete("/festivals/{id}")
async def delete_festival(id: str):
    deleted = await db_store.delete_one("festivals", {"id": id})
    return {"success": deleted}


@router.put("/timings")
async def update_temple_timings(timings: TempleTiming):
    timings.updatedAt = datetime.utcnow().isoformat()
    await db_store.insert_one("timings", timings.model_dump())
    return {"success": True, "timings": timings}


@router.get("/export-csv")
async def export_data_csv(kind: str = Query("bookings")):
    output = io.StringIO()
    writer = csv.writer(output)

    if kind == "bookings":
        writer.writerow(["Reference ID", "Kind", "Name", "Phone", "Date", "Status", "Created At"])
        poojas = await db_store.find("pooja_bookings")
        for p in poojas:
            writer.writerow([p.get("referenceId"), "Pooja", p.get("fullName"), p.get("phone"), p.get("preferredDate"), p.get("status"), p.get("createdAt")])
        rooms = await db_store.find("room_inquiries")
        for r in rooms:
            writer.writerow([r.get("referenceId"), "Room", r.get("fullName"), r.get("phone"), r.get("checkInDate"), r.get("status"), r.get("createdAt")])
        halls = await db_store.find("hall_inquiries")
        for h in halls:
            writer.writerow([h.get("referenceId"), "Hall", h.get("fullName"), h.get("phone"), h.get("eventDate"), h.get("status"), h.get("createdAt")])

    elif kind == "donations":
        writer.writerow(["Reference ID", "Donor Name", "Phone", "Seva Category", "Amount", "PAN", "Status", "Payment Status", "Date"])
        donations = await db_store.find("donations")
        for d in donations:
            writer.writerow([d.get("referenceId"), d.get("fullName"), d.get("phone"), d.get("sevaCategory"), d.get("amount"), d.get("panNumber", ""), d.get("status"), d.get("paymentStatus"), d.get("createdAt")])

    else:
        writer.writerow(["ID", "Name", "Phone", "Email", "Message", "Date"])
        inquiries = await db_store.find("contact_inquiries")
        for i in inquiries:
            writer.writerow([i.get("id"), i.get("fullName"), i.get("phone"), i.get("email"), i.get("message"), i.get("createdAt")])

    filename = f"mahakuta_{kind}_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.csv"
    return Response(
        content=output.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )
