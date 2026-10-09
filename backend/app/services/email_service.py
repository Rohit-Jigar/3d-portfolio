import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import httpx
from backend.app.config import settings

logger = logging.getLogger("portfolio.email_service")


def build_email_content(
    name: str,
    email: str,
    subject: str,
    message: str,
    ticket_id: str,
    timestamp: str,
    client_ip: str = "unknown"
) -> tuple[str, str]:
    """Generates both plain text and executive HTML versions of the inquiry notification."""
    text_content = f"""
=====================================================
NEW PORTFOLIO INQUIRY RECEIVED
=====================================================

Ticket ID   : {ticket_id}
Timestamp   : {timestamp}
Client IP   : {client_ip}

FROM        : {name}
EMAIL       : {email}
SUBJECT     : {subject}

MESSAGE:
-----------------------------------------------------
{message}
-----------------------------------------------------

To reply directly to {name}, reply to this email or write to: {email}
"""

    html_content = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #18181b;
      background-color: #f4f4f5;
      margin: 0;
      padding: 24px;
    }}
    .container {{
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e4e4e7;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }}
    .header {{
      background: #09090b;
      color: #ffffff;
      padding: 24px 32px;
      border-bottom: 2px solid #27272a;
    }}
    .header h1 {{
      margin: 0;
      font-size: 18px;
      letter-spacing: -0.02em;
      font-weight: 700;
    }}
    .badge {{
      display: inline-block;
      margin-top: 8px;
      font-size: 11px;
      font-family: monospace;
      color: #a1a1aa;
      background: #18181b;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid #27272a;
    }}
    .body {{
      padding: 32px;
    }}
    .meta-table {{
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 13px;
    }}
    .meta-table td {{
      padding: 8px 0;
      border-bottom: 1px solid #f4f4f5;
    }}
    .meta-label {{
      color: #71717a;
      width: 110px;
      font-weight: 500;
    }}
    .meta-value {{
      color: #09090b;
      font-weight: 600;
    }}
    .message-box {{
      background: #fafafa;
      border: 1px solid #e4e4e7;
      border-radius: 8px;
      padding: 20px;
      margin-top: 16px;
      color: #27272a;
      font-size: 14px;
      white-space: pre-wrap;
      line-height: 1.6;
    }}
    .footer {{
      background: #fafafa;
      padding: 16px 32px;
      border-top: 1px solid #e4e4e7;
      font-size: 12px;
      color: #71717a;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}
    .btn {{
      display: inline-block;
      background: #09090b;
      color: #ffffff !important;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      margin-top: 20px;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Portfolio Inquiry</h1>
      <span class="badge">Ticket: {ticket_id}</span>
    </div>
    <div class="body">
      <table class="meta-table">
        <tr>
          <td class="meta-label">From:</td>
          <td class="meta-value">{name}</td>
        </tr>
        <tr>
          <td class="meta-label">Email:</td>
          <td class="meta-value"><a href="mailto:{email}" style="color: #09090b;">{email}</a></td>
        </tr>
        <tr>
          <td class="meta-label">Subject:</td>
          <td class="meta-value">{subject}</td>
        </tr>
        <tr>
          <td class="meta-label">Timestamp:</td>
          <td class="meta-value" style="font-family: monospace; font-size: 12px;">{timestamp}</td>
        </tr>
      </table>

      <div style="font-size: 12px; text-transform: uppercase; color: #71717a; font-weight: 700; letter-spacing: 0.05em; margin-top: 16px;">
        Inquiry Message
      </div>
      <div class="message-box">{message}</div>

      <a href="mailto:{email}?subject=Re:%20{subject}%20(Ticket:%20{ticket_id})" class="btn">
        Reply to {name}
      </a>
    </div>
    <div class="footer">
      <span>Jigar Rohit 3D Portfolio Notification Engine</span>
      <span>Origin IP: {client_ip}</span>
    </div>
  </div>
</body>
</html>"""

    return text_content, html_content


def send_via_smtp(
    name: str,
    email: str,
    subject: str,
    text_content: str,
    html_content: str,
    ticket_id: str
) -> bool:
    """Dispatches email via standard SMTP (Gmail, Brevo, SendGrid, etc.)."""
    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"[Portfolio Inquiry] {subject} (Ticket: {ticket_id})"
    msg["From"] = f"Portfolio Inquiry <{settings.SMTP_USER}>"
    msg["To"] = settings.NOTIFICATION_EMAIL
    msg["Reply-To"] = email

    part_text = MIMEText(text_content, "plain", "utf-8")
    part_html = MIMEText(html_content, "html", "utf-8")
    msg.attach(part_text)
    msg.attach(part_html)

    logger.info("Attempting SMTP dispatch to %s via %s:%d...", settings.NOTIFICATION_EMAIL, settings.SMTP_HOST, settings.SMTP_PORT)

    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=12) as server:
            if settings.SMTP_USE_TLS:
                server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.SMTP_USER, [settings.NOTIFICATION_EMAIL], msg.as_string())
        logger.info("SMTP email delivered successfully for ticket %s to %s", ticket_id, settings.NOTIFICATION_EMAIL)
        return True
    except Exception as e:
        logger.error("SMTP dispatch failed for ticket %s: %s", ticket_id, str(e))
        return False


def send_via_resend(
    name: str,
    email: str,
    subject: str,
    text_content: str,
    html_content: str,
    ticket_id: str
) -> bool:
    """Dispatches email via Resend REST API."""
    if not settings.RESEND_API_KEY:
        return False

    logger.info("Attempting Resend API dispatch for ticket %s...", ticket_id)
    try:
        resp = httpx.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {settings.RESEND_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "from": "Portfolio <onboarding@resend.dev>",
                "to": [settings.NOTIFICATION_EMAIL],
                "reply_to": email,
                "subject": f"[Portfolio Inquiry] {subject} (Ticket: {ticket_id})",
                "html": html_content,
                "text": text_content
            },
            timeout=10.0
        )
        if resp.status_code in (200, 201):
            logger.info("Resend email delivered successfully for ticket %s", ticket_id)
            return True
        else:
            logger.error("Resend API rejected dispatch for ticket %s: %d %s", ticket_id, resp.status_code, resp.text)
            return False
    except Exception as e:
        logger.error("Resend API exception for ticket %s: %s", ticket_id, str(e))
        return False


def send_via_web3forms(
    name: str,
    email: str,
    subject: str,
    message: str,
    ticket_id: str
) -> bool:
    """Dispatches email via Web3Forms API."""
    if not settings.WEB3FORMS_ACCESS_KEY:
        return False

    logger.info("Attempting Web3Forms dispatch for ticket %s...", ticket_id)
    try:
        resp = httpx.post(
            "https://api.web3forms.com/submit",
            json={
                "access_key": settings.WEB3FORMS_ACCESS_KEY,
                "name": name,
                "email": email,
                "subject": f"[Portfolio Inquiry] {subject} ({ticket_id})",
                "message": f"Ticket: {ticket_id}\n\n{message}",
                "from_name": f"{name} (via Portfolio)"
            },
            timeout=10.0
        )
        data = resp.json()
        if data.get("success"):
            logger.info("Web3Forms email delivered successfully for ticket %s", ticket_id)
            return True
        else:
            logger.error("Web3Forms error for ticket %s: %s", ticket_id, data.get("message"))
            return False
    except Exception as e:
        logger.error("Web3Forms dispatch exception for ticket %s: %s", ticket_id, str(e))
        return False


def send_via_formsubmit(
    name: str,
    email: str,
    subject: str,
    message: str,
    ticket_id: str
) -> bool:
    """
    Dispatches email via FormSubmit.co AJAX endpoint.
    Automated zero-configuration delivery to settings.NOTIFICATION_EMAIL.
    """
    if not settings.NOTIFICATION_EMAIL:
        logger.error("FormSubmit dispatch failed: settings.NOTIFICATION_EMAIL is not configured.")
        return False

    url = f"https://formsubmit.co/ajax/{settings.NOTIFICATION_EMAIL}"
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Referer": "https://rohit-jigar.github.io/3d-portfolio/",
        "Origin": "https://rohit-jigar.github.io/3d-portfolio/",
    }
    payload = {
        "name": name,
        "email": email,
        "_subject": f"[Portfolio Inquiry] {subject} (Ticket: {ticket_id})",
        "subject": f"[Portfolio Inquiry] {subject} (Ticket: {ticket_id})",
        "message": f"Ticket: {ticket_id}\n\n{message}",
        "ticket_id": ticket_id,
        "_template": "table",
        "_captcha": "false"
    }

    logger.info("Attempting FormSubmit dispatch for ticket %s to %s...", ticket_id, settings.NOTIFICATION_EMAIL)
    try:
        resp = httpx.post(
            url,
            headers=headers,
            json=payload,
            timeout=10.0
        )
        if resp.status_code in (200, 201):
            try:
                data = resp.json()
                if str(data.get("success", "")).lower() == "false":
                    logger.error("FormSubmit rejected dispatch for ticket %s: %s", ticket_id, data.get("message"))
                    return False
            except Exception:
                pass
            logger.info("FormSubmit email delivered successfully for ticket %s", ticket_id)
            return True
        else:
            logger.error("FormSubmit HTTP error for ticket %s: %d %s", ticket_id, resp.status_code, resp.text)
            return False
    except Exception as e:
        logger.error("FormSubmit dispatch exception for ticket %s: %s", ticket_id, str(e))
        return False


def send_inquiry_notification(
    name: str,
    email: str,
    subject: str,
    message: str,
    ticket_id: str,
    timestamp: str,
    client_ip: str = "unknown"
) -> bool:
    """
    Main notification router.
    Evaluates available transport methods (SMTP -> Resend -> Web3Forms -> FormSubmit)
    and delivers the inquiry directly to Jigar's email (rohitjigarmaheshbhai@gmail.com).
    """
    text_content, html_content = build_email_content(
        name=name,
        email=email,
        subject=subject,
        message=message,
        ticket_id=ticket_id,
        timestamp=timestamp,
        client_ip=client_ip
    )

    # 1. Try SMTP if configured (e.g. Gmail App Password)
    if settings.SMTP_USER and settings.SMTP_PASSWORD:
        if send_via_smtp(name, email, subject, text_content, html_content, ticket_id):
            return True

    # 2. Try Resend API if configured
    if settings.RESEND_API_KEY:
        if send_via_resend(name, email, subject, text_content, html_content, ticket_id):
            return True

    # 3. Try Web3Forms if configured
    if settings.WEB3FORMS_ACCESS_KEY:
        if send_via_web3forms(name, email, subject, message, ticket_id):
            return True

    # 4. Try FormSubmit.co zero-configuration automated transport
    if send_via_formsubmit(name, email, subject, message, ticket_id):
        return True

    # 5. If credentials not yet populated in production env or all transports failed, log structured notification
    logger.warning(
        "EMAIL NOTIFICATION QUEUED [Simulation/Unconfigured]: "
        "Ticket: %s | From: %s <%s> | Subject: %s | Target: %s. "
        "All delivery transports (SMTP, Resend, Web3Forms, FormSubmit) failed or were unconfigured.",
        ticket_id,
        name,
        email,
        subject,
        settings.NOTIFICATION_EMAIL
    )
    return False
