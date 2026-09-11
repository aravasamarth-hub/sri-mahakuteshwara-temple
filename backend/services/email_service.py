import asyncio
import email.message
import logging
import os
import smtplib
from typing import Optional

logger = logging.getLogger(__name__)

SMTP_HOST = os.environ.get("SMTP_HOST", "")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASS = os.environ.get("SMTP_PASS", "")
SMTP_FROM = os.environ.get("SMTP_FROM", "Sri Mahakuteshwara Temple <noreply@mahakuta.org>")


def _render_heritage_template(title: str, subtitle: str, fields: dict) -> str:
    rows = "".join(
        f"<tr><td style='padding: 10px 14px; border-bottom: 1px solid #dfcda0; color: #86653f; font-size: 13px; font-weight: 600;'>{k}</td>"
        f"<td style='padding: 10px 14px; border-bottom: 1px solid #dfcda0; color: #5c3a21; font-size: 14px;'>{v}</td></tr>"
        for k, v in fields.items()
    )

    return f"""
    <!DOCTYPE html>
    <html>
    <head><meta charset='utf-8'></head>
    <body style='margin:0; padding:30px 15px; background-color:#fdf7e8; font-family:"Poppins", Arial, sans-serif;'>
      <div style='max-width:580px; margin:0 auto; background:#fffcf3; border:2px solid #d4af37; border-radius:12px; overflow:hidden; box-shadow:0 8px 30px rgba(92,58,33,0.08);'>
        <div style='background-color:#7f1734; padding:28px 24px; text-align:center; border-bottom:3px solid #d4af37;'>
          <div style='color:#fbbf24; font-size:12px; letter-spacing:3px; text-transform:uppercase; font-weight:700;'>॥ Om Namah Shivaya ॥</div>
          <h1 style='margin:8px 0 0; color:#fffdf7; font-family:"Lora", Georgia, serif; font-size:24px; font-weight:600;'>Sri Kshetra Mahakuteshwara Temple</h1>
          <p style='margin:4px 0 0; color:#fbd38d; font-size:13px;'>Dakshina Kashi · Badami, Bagalkot, Karnataka</p>
        </div>
        <div style='padding:28px 24px;'>
          <h2 style='margin:0 0 6px; color:#5c3a21; font-family:"Lora", Georgia, serif; font-size:20px;'>{title}</h2>
          <p style='margin:0 0 20px; color:#86653f; font-size:13px; line-height:1.6;'>{subtitle}</p>
          <table style='width:100%; border-collapse:collapse; background:#fbf8f0; border-radius:8px; overflow:hidden; border:1px solid #dfcda0;'>
            {rows}
          </table>
          <div style='margin-top:24px; padding:14px; background:color-mix(in srgb, #d4af37 12%, transparent); border-left:3px solid #d4af37; border-radius:4px; font-size:12px; color:#86653f; line-height:1.7;'>
            For immediate assistance or travel guidance, contact the Temple Office at <strong>+91 94800 00000</strong> or reply directly to this email.
          </div>
        </div>
        <div style='background:#f3e7cc; padding:16px 24px; text-align:center; font-size:11px; color:#86653f; border-top:1px solid #dfcda0;'>
          © Sri Mahakuteshwara Religious & Charitable Trust · Badami, Karnataka · Dedicated to Pilgrim Seva
        </div>
      </div>
    </body>
    </html>
    """


def _send_mail_sync(to_email: str, subject: str, html_content: str) -> bool:
    if not SMTP_HOST or not SMTP_USER:
        logger.info("[MOCK EMAIL] SMTP not configured. Simulating delivery to <%s> | Subject: %s", to_email, subject)
        return True
    try:
        msg = email.message.EmailMessage()
        msg["Subject"] = subject
        msg["From"] = SMTP_FROM
        msg["To"] = to_email
        msg.set_content("Please enable HTML viewing to see your temple receipt.")
        msg.add_alternative(html_content, subtype="html")

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)
        logger.info("Email sent successfully to %s", to_email)
        return True
    except Exception as exc:
        logger.error("Failed to send email to %s: %s", to_email, exc)
        return False


async def send_temple_email(to_email: Optional[str], subject: str, title: str, subtitle: str, fields: dict) -> bool:
    if not to_email:
        return True
    html = _render_heritage_template(title, subtitle, fields)
    return await asyncio.to_thread(_send_mail_sync, to_email, subject, html)
