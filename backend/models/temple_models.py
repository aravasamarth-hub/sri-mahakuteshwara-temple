from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, EmailStr
import uuid


def generate_ref_id(prefix: str = "MHK") -> str:
    now_str = datetime.utcnow().strftime("%y%m%d")
    short_rand = uuid.uuid4().hex[:5].upper()
    return f"{prefix}-{now_str}-{short_rand}"


class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    fullName: str
    phone: str
    email: Optional[str] = ""
    message: str
    language: str = "en"
    status: str = "Pending"  # Pending, Confirmed, Completed, Cancelled
    notes: Optional[str] = ""
    createdAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class PoojaBooking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    referenceId: str = Field(default_factory=lambda: generate_ref_id("MHK-POOJA"))
    poojaId: str
    poojaName: str
    fullName: str
    phone: str
    email: Optional[str] = ""
    preferredDate: str
    nakshatra: Optional[str] = ""
    amount: float = 0.0
    language: str = "en"
    status: str = "Pending"  # Pending, Confirmed, Completed, Cancelled
    paymentStatus: str = "Pending"  # Pending, Verified, Rejected
    notes: Optional[str] = ""
    createdAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class RoomInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    referenceId: str = Field(default_factory=lambda: generate_ref_id("MHK-ROOM"))
    fullName: str
    phone: str
    email: Optional[str] = ""
    checkInDate: str
    checkOutDate: str
    numberOfRooms: int = 1
    numberOfGuests: int = 2
    roomType: str = "Deluxe Double Bed"
    language: str = "en"
    status: str = "Pending"  # Pending, Confirmed, Completed, Cancelled
    notes: Optional[str] = ""
    createdAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class HallInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    referenceId: str = Field(default_factory=lambda: generate_ref_id("MHK-HALL"))
    fullName: str
    phone: str
    email: Optional[str] = ""
    hallType: str  # Large Kalyan Mantapa / Medium Function Hall
    eventDate: str
    estimatedGuests: Optional[str] = "300"
    additionalDetails: Optional[str] = ""
    language: str = "en"
    status: str = "Pending"  # Pending, Confirmed, Completed, Cancelled
    notes: Optional[str] = ""
    createdAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class DonationIntent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    referenceId: str = Field(default_factory=lambda: generate_ref_id("MHK-HUNDI"))
    sevaCategory: str
    amount: float
    fullName: str
    phone: str
    email: Optional[str] = ""
    panNumber: Optional[str] = ""
    language: str = "en"
    status: str = "Pending"  # Pending, Confirmed, Completed, Cancelled
    paymentStatus: str = "Pending"  # Pending, Verified, Rejected
    notes: Optional[str] = ""
    createdAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class PaymentVerification(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    referenceId: str
    linkedType: str  # "pooja" | "donation" | "room" | "hall"
    linkedId: Optional[str] = ""
    devoteeName: str
    phone: str
    amount: float
    utrNumber: Optional[str] = ""
    screenshotUrl: str
    paymentStatus: str = "Pending"  # Pending, Verified, Rejected
    adminNotes: Optional[str] = ""
    verifiedAt: Optional[str] = None
    createdAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class Festival(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    titleEn: str
    titleKn: str
    titleHi: str
    dateString: str
    descriptionEn: str
    descriptionKn: str
    descriptionHi: str
    bannerImage: Optional[str] = "/images/temple/twin-shrines-canopy.jpg"
    isActive: bool = True
    createdAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class TempleTiming(BaseModel):
    id: str = "default-timings"
    morningDarshan: str = "6:00 AM – 1:30 PM"
    eveningDarshan: str = "4:30 PM – 8:30 PM"
    morningAbhisheka: str = "7:00 AM – 9:00 AM"
    mahaMangalarathi: str = "12:30 PM & 7:30 PM"
    specialDaysNote: str = "Special rituals conducted on Somavara (Mondays), Pradosha, and Maha Shivaratri."
    updatedAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
