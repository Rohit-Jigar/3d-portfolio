import html
from urllib.parse import quote
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
    """
    Generates both plain text and an extraordinary 3D Liquid Glassmorphism HTML email.
    Crafted with deep obsidian tones (#030508), multi-layer translucent glass cards,
    frosted crystal borders, 3D embossed specular highlights, metallic titanium badges,
    and a liquid beveled CTA button with 100% email client compatibility.
    """
    # Plain text version for non-HTML email readers
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

    # Sanitize variables for secure HTML rendering
    safe_name = html.escape(name)
    safe_email = html.escape(email)
    safe_subject = html.escape(subject)
    safe_message = html.escape(message)
    safe_ticket_id = html.escape(ticket_id)
    safe_timestamp = html.escape(timestamp)
    safe_client_ip = html.escape(client_ip)

    # Encode mailto URL query parameters
    reply_subject_encoded = quote(f"Re: {subject} (Ticket: {ticket_id})")
    reply_mailto_url = f"mailto:{safe_email}?subject={reply_subject_encoded}"

    # 3D Liquid Glassmorphism HTML email template
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>New Portfolio Inquiry - {safe_subject}</title>
  <style type="text/css">
    /* Reset & email client normalizations */
    body, table, td, a {{ -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }}
    table, td {{ mso-table-lspace: 0pt; mso-table-rspace: 0pt; }}
    img {{ -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }}
    body {{ margin: 0; padding: 0; width: 100% !important; background-color: #030508; }}

    /* Interactive hover enhancements */
    .cta-btn:hover {{
      background: linear-gradient(180deg, #ffffff 0%, #e4e4e7 100%) !important;
      box-shadow: 0 10px 30px -2px rgba(255, 255, 255, 0.4), 0 16px 36px 0 rgba(0, 0, 0, 0.9), inset 0 1px 0 #ffffff !important;
      transform: translateY(-1px);
    }}
    .email-link:hover {{
      color: #38bdf8 !important;
      text-decoration: underline !important;
    }}

    /* Mobile Responsive Adaptation */
    @media screen and (max-width: 620px) {{
      .email-wrapper {{
        padding: 16px 8px !important;
      }}
      .main-glass-card {{
        width: 100% !important;
        border-radius: 16px !important;
      }}
      .card-content-padding {{
        padding: 24px 18px !important;
      }}
      .header-title {{
        font-size: 20px !important;
      }}
      .meta-label-col {{
        width: 80px !important;
      }}
      .message-bubble-cell {{
        padding: 18px 16px !important;
      }}
      .cta-button-table {{
        width: 100% !important;
      }}
      .cta-btn {{
        display: block !important;
        text-align: center !important;
        padding: 14px 20px !important;
      }}
    }}
  </style>
</head>
<body bgcolor="#030508" style="margin: 0; padding: 0; background-color: #030508; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- Hidden Inbox Preheader (Prevents raw code leakage in inbox previews) -->
  <div style="display: none; font-size: 1px; color: #030508; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    New portfolio inquiry from {safe_name} regarding &ldquo;{safe_subject}&rdquo; (Ticket: {safe_ticket_id}).
    &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <!-- Deep Obsidian Outer Canvas with Ambient Caustic Mesh Aura -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#030508" style="background-color: #030508; background-image: radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.12) 0%, rgba(99, 102, 241, 0.05) 50%, #030508 85%); min-height: 100vh;">
    <tr>
      <td align="center" class="email-wrapper" style="padding: 40px 16px;">
        
        <!-- Center Max-Width Container: 3D Liquid Glass Card -->
        <table role="presentation" class="main-glass-card" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0a0e17" style="max-width: 620px; width: 100%; margin: 0 auto; background-color: #0a0e17; background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%); border: 1px solid rgba(255, 255, 255, 0.16); border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(255, 255, 255, 0.35); overflow: hidden; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);">
          
          <!-- 3D Specular Highlight Edge (Liquid Light Prism) -->
          <tr>
            <td height="2" style="height: 2px; line-height: 2px; font-size: 2px; background: linear-gradient(90deg, rgba(56, 189, 248, 0) 0%, rgba(255, 255, 255, 0.75) 50%, rgba(129, 140, 248, 0) 100%);">
              &nbsp;
            </td>
          </tr>

          <!-- Main Card Content -->
          <tr>
            <td class="card-content-padding" style="padding: 36px 36px 30px 36px;">
              
              <!-- Top Bar: Status Orb & 3D Metallic Titanium Badge -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="left" valign="middle">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <!-- Glowing Liquid Cyan Dot -->
                        <td valign="middle" style="padding-right: 8px;">
                          <div style="width: 8px; height: 8px; border-radius: 50%; background-color: #38bdf8; box-shadow: 0 0 12px #38bdf8, 0 0 4px #ffffff;"></div>
                        </td>
                        <td valign="middle">
                          <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #7dd3fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                            PORTFOLIO DISPATCH &bull; LIVE TRANSMISSION
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle">
                    <!-- 3D Metallic Titanium Badge for Ticket ID -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td bgcolor="#1a1e24" style="background-color: #1a1e24; background: linear-gradient(180deg, #2f3540 0%, #1c2028 50%, #12151b 100%); border: 1px solid rgba(255, 255, 255, 0.22); border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.45), inset 0 -1px 0 rgba(0, 0, 0, 0.85); padding: 5px 12px;">
                          <span style="font-family: 'SF Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: #e2e8f0; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8); display: inline-block;">
                            TICKET: {safe_ticket_id}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Header Title & Subtitle -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 26px;">
                <tr>
                  <td>
                    <h1 class="header-title" style="margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.03em; color: #ffffff; text-shadow: 0 2px 14px rgba(0, 0, 0, 0.6); line-height: 1.25;">
                      New Portfolio Inquiry
                    </h1>
                    <p style="margin: 0; font-size: 13px; color: #94a3b8; font-weight: 400; line-height: 1.5;">
                      Incoming communique received via the interactive 3D WebGL portfolio contact portal.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Translucent Glass Metadata Dossier Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0c1018" style="background-color: #0c1018; background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 100%); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 14px; box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 8px 24px rgba(0, 0, 0, 0.45); margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="padding: 20px 22px;">
                    
                    <!-- Row: Sender -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 14px;">
                      <tr>
                        <td width="95" class="meta-label-col" valign="top" style="width: 95px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; padding-top: 3px;">
                          SENDER
                        </td>
                        <td valign="top" style="font-size: 15px; font-weight: 700; color: #ffffff;">
                          {safe_name}
                        </td>
                      </tr>
                    </table>

                    <!-- Glass divider -->
                    <div style="height: 1px; background: rgba(255, 255, 255, 0.06); margin-bottom: 14px;"></div>

                    <!-- Row: Email -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 14px;">
                      <tr>
                        <td width="95" class="meta-label-col" valign="top" style="width: 95px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; padding-top: 3px;">
                          EMAIL
                        </td>
                        <td valign="top" style="font-size: 14px; font-weight: 600;">
                          <a href="mailto:{safe_email}" class="email-link" style="color: #38bdf8; text-decoration: none; word-break: break-all;">
                            {safe_email}
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Glass divider -->
                    <div style="height: 1px; background: rgba(255, 255, 255, 0.06); margin-bottom: 14px;"></div>

                    <!-- Row: Subject -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 14px;">
                      <tr>
                        <td width="95" class="meta-label-col" valign="top" style="width: 95px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; padding-top: 3px;">
                          SUBJECT
                        </td>
                        <td valign="top" style="font-size: 14px; font-weight: 600; color: #f1f5f9;">
                          {safe_subject}
                        </td>
                      </tr>
                    </table>

                    <!-- Glass divider -->
                    <div style="height: 1px; background: rgba(255, 255, 255, 0.06); margin-bottom: 14px;"></div>

                    <!-- Row: Received Timestamp -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="95" class="meta-label-col" valign="top" style="width: 95px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; padding-top: 2px;">
                          RECEIVED
                        </td>
                        <td valign="top" style="font-family: 'SF Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace; font-size: 12px; font-weight: 500; color: #94a3b8;">
                          {safe_timestamp}
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Message Section Pill Label -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 10px;">
                <tr>
                  <td>
                    <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8;">
                      INQUIRY MESSAGE &bull; REFRACTION BUBBLE
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Liquid Message Bubble with Glass Refraction Styling -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                <tr>
                  <td class="message-bubble-cell" bgcolor="#0b111a" style="background-color: #0b111a; background: linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%); border: 1px solid rgba(255, 255, 255, 0.14); border-left: 3px solid #38bdf8; border-radius: 12px; box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.25), 0 12px 30px -8px rgba(0, 0, 0, 0.6); padding: 22px 24px; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);">
                    <div style="font-size: 15px; line-height: 1.75; color: #f8fafc; font-weight: 400; white-space: pre-wrap; word-break: break-word; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">{safe_message}</div>
                  </td>
                </tr>
              </table>

              <!-- 3D Liquid Beveled "Reply to Sender" CTA Button -->
              <table role="presentation" class="cta-button-table" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 12px auto;">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="border-radius: 10px; background-color: #ffffff; background: linear-gradient(180deg, #ffffff 0%, #d4d4d8 100%); box-shadow: 0 8px 25px -4px rgba(255, 255, 255, 0.25), 0 12px 28px -2px rgba(0, 0, 0, 0.8), inset 0 1px 0 #ffffff, inset 0 -2px 0 rgba(0, 0, 0, 0.2); border: 1px solid #ffffff;">
                    <a href="{reply_mailto_url}" class="cta-btn" target="_blank" style="display: inline-block; padding: 14px 34px; font-size: 14px; font-weight: 700; color: #09090b !important; text-decoration: none; letter-spacing: 0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border-radius: 10px; text-shadow: 0 1px 0 rgba(255, 255, 255, 0.6);">
                      Reply to {safe_name} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Sub-action helper text -->
              <div align="center" style="font-size: 11px; color: #64748b; margin-top: 6px;">
                Direct recipient: <a href="mailto:{safe_email}" style="color: #94a3b8; text-decoration: underline;">{safe_email}</a>
              </div>

            </td>
          </tr>

          <!-- Frosted Glass Horizontal Divider -->
          <tr>
            <td style="padding: 0 36px;">
              <div style="height: 1px; background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0) 100%);"></div>
            </td>
          </tr>

          <!-- Footer Metadata Bar -->
          <tr>
            <td bgcolor="#05080f" style="padding: 24px 36px 28px 36px; background-color: #05080f; background: linear-gradient(180deg, rgba(5, 8, 15, 0.6) 0%, rgba(3, 5, 8, 0.95) 100%);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle" style="font-size: 11px; color: #64748b; line-height: 1.6;">
                    <strong style="color: #94a3b8;">Jigar Rohit 3D Portfolio</strong> &bull; Notification Engine<br />
                    Origin Client Node: <span style="font-family: 'SF Mono', Menlo, Consolas, monospace; color: #cbd5e1;">{safe_client_ip}</span>
                  </td>
                  <td align="right" valign="middle" style="font-size: 11px; color: #475569;">
                    <span style="display: inline-block; padding: 4px 10px; border-radius: 4px; background-color: #0d1117; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); font-family: 'SF Mono', Menlo, Consolas, monospace; color: #7dd3fc; font-size: 10px; font-weight: 600; letter-spacing: 0.05em;">
                      AES &bull; TLS 1.3 DISPATCH
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- End 3D Liquid Glass Card -->

      </td>
    </tr>
  </table>
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
