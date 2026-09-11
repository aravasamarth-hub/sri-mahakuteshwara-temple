import urllib.parse
import os

TEMPLE_WHATSAPP = os.environ.get("TEMPLE_WHATSAPP", "919480000000")


def generate_whatsapp_link(message: str, phone: str = TEMPLE_WHATSAPP) -> str:
    encoded_text = urllib.parse.quote(message)
    clean_phone = phone.replace("+", "").replace(" ", "").replace("-", "")
    return f"https://wa.me/{clean_phone}?text={encoded_text}"


def pooja_whatsapp_message(ref_id: str, name: str, pooja: str, date: str, amount: float = 0, status: str = "Pending") -> str:
    return (
        f"॥ Om Namah Shivaya ॥\n\n"
        f"Sri Kshetra Mahakuteshwara Temple · Badami\n"
        f"Your {pooja} booking request has been received.\n\n"
        f"• Reference ID: {ref_id}\n"
        f"• Devotee Name: {name}\n"
        f"• Sacred Seva: {pooja}\n"
        f"• Preferred Date: {date}\n"
        f"• Offering Amount: ₹{int(amount)}\n"
        f"• Status: {status}\n\n"
        f"May Lord Mahakuteshwara bless you and your family with peace and prosperity."
    )


def donation_whatsapp_message(ref_id: str, name: str, seva: str, amount: float) -> str:
    return (
        f"॥ Om Namah Shivaya ॥\n\n"
        f"Sri Kshetra Mahakuteshwara Temple · Badami\n"
        f"Hundi Seva Offering Intent:\n\n"
        f"• Reference ID: {ref_id}\n"
        f"• Donor Name: {name}\n"
        f"• Seva Category: {seva}\n"
        f"• Contribution: ₹{int(amount)}\n\n"
        f"Thank you for supporting Sri Kshetra Mahakuta. Your offering has been recorded for verification."
    )


def room_whatsapp_message(ref_id: str, name: str, check_in: str, check_out: str, rooms: int) -> str:
    return (
        f"॥ Om Namah Shivaya ॥\n\n"
        f"Sri Kshetra Mahakuteshwara Temple · Badami\n"
        f"Pravasi Nilaya (Guest House) Booking Request:\n\n"
        f"• Reference ID: {ref_id}\n"
        f"• Pilgrim Name: {name}\n"
        f"• Check-in: {check_in}\n"
        f"• Check-out: {check_out}\n"
        f"• Rooms: {rooms}\n\n"
        f"Temple reception team will confirm room availability shortly."
    )
