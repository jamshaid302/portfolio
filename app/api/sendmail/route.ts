import transporter from '../../utils/nodemailer';
import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIp, SECURITY_HEADERS } from '../../utils/rateLimit';
import { sanitizeString, isValidEmail } from '../../utils/security';
import { SITE_CONFIG } from '../../config/site';

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: "Method Not Allowed" }, { status: 405, headers: SECURITY_HEADERS });
    }

    // 1. Rate Limiting Check (5 requests per 10 minutes per IP)
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(clientIp, { intervalMs: 10 * 60 * 1000, maxRequests: 5 });

    if (!rateLimit.success) {
        const retryAfterSeconds = Math.ceil(rateLimit.resetMs / 1000);
        return NextResponse.json(
            { message: `Too many email requests. Please try again in ${retryAfterSeconds} seconds.` },
            { 
                status: 429, 
                headers: { 
                    ...SECURITY_HEADERS,
                    "Retry-After": String(retryAfterSeconds) 
                } 
            }
        );
    }

    try {
        const contentType = req.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            return NextResponse.json({ message: "Invalid Content-Type. Expected application/json." }, { status: 400, headers: SECURITY_HEADERS });
        }

        const body = await req.json();
        const formData = body.data || body;

        // 2. Input Validation & Sanitization
        const rawName = String(formData.name || "").trim();
        const rawEmail = String(formData.email || "").trim();
        const rawMessage = String(formData.message || "").trim();

        const name = sanitizeString(rawName);
        const clientEmail = rawEmail.toLowerCase();
        const message = sanitizeString(rawMessage);

        if (!name || name.length < 2 || name.length > 100) {
            return NextResponse.json({ message: "Name must be between 2 and 100 characters." }, { status: 400, headers: SECURITY_HEADERS });
        }

        if (!isValidEmail(clientEmail)) {
            return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400, headers: SECURITY_HEADERS });
        }

        if (!message || message.length < 5 || message.length > 3000) {
            return NextResponse.json({ message: "Message must be between 5 and 3000 characters." }, { status: 400, headers: SECURITY_HEADERS });
        }

        const authEmail = process.env.EMAIL?.trim() || 'jkniazi302@gmail.com';

        await transporter.sendMail({
            from: `"${name}" <${authEmail}>`,
            replyTo: clientEmail,
            to: authEmail,
            subject: `📩 New Message from ${name} via Portfolio`,
            text: `Name: ${name}\nEmail: ${clientEmail}\n\nMessage:\n${message}`,
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Inquiry</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f6f5f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" style="max-width: 560px; background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 20px; overflow: hidden; border-collapse: separate; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);" border="0" cellspacing="0" cellpadding="0">
                    
                    <!-- Header Bar -->
                    <tr>
                        <td style="padding: 24px 28px 20px; border-bottom: 1px solid #f0f0f0; background-color: #ffffff;">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="left" style="vertical-align: middle;">
                                        <div style="font-size: 18px; font-weight: 700; color: #0a0d1a; letter-spacing: -0.3px;">Muhammad Jamshaid Khan</div>
                                        <div style="font-size: 12px; color: #615d59; font-weight: 500; margin-top: 2px;">Portfolio Contact System</div>
                                    </td>
                                    <td align="right" style="vertical-align: middle;">
                                        <span style="background-color: #e6f4ea; color: #137333; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #ceead6; text-transform: uppercase; letter-spacing: 0.5px;">New Message</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 24px 28px;">
                            
                            <!-- Sender Information Pill -->
                            <table role="presentation" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px 16px; margin-bottom: 20px;" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="42" style="vertical-align: middle;">
                                        <div style="width: 40px; height: 40px; background-color: #0075de; border-radius: 12px; color: #ffffff; font-size: 16px; font-weight: 700; text-align: center; line-height: 40px;">
                                            ${name.charAt(0).toUpperCase()}
                                        </div>
                                    </td>
                                    <td style="padding-left: 12px; vertical-align: middle;">
                                        <div style="font-size: 15px; font-weight: 700; color: #0f172a;">${name}</div>
                                        <div style="font-size: 13px; font-weight: 500; margin-top: 2px;">
                                            <a href="mailto:${clientEmail}" style="color: #0075de; text-decoration: none;">${clientEmail}</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- Message Content Box -->
                            <div style="margin-bottom: 24px;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
                                    Message
                                </div>
                                <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #0075de; border-radius: 12px; padding: 18px; font-size: 14px; line-height: 1.6; color: #1e293b;">
                                    ${message.replace(/\n/g, '<br/>')}
                                </div>
                            </div>

                            <!-- Action Button -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <a href="mailto:${clientEmail}?subject=Re:%20Portfolio%20Inquiry" style="background-color: #0075de; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 24px; display: inline-block; box-shadow: 0 2px 6px rgba(0, 117, 222, 0.2);">
                                            Reply Direct to ${name} &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 28px; background-color: #f8fafc; border-top: 1px solid #f0f0f0; text-align: center;">
                            <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">
                                <a href="${SITE_CONFIG.author.linkedin}" style="color: #0075de; text-decoration: none; font-weight: 600; margin: 0 8px;">LinkedIn</a>
                                <span style="color: #cbd5e1;">•</span>
                                <a href="${SITE_CONFIG.author.github}" style="color: #0075de; text-decoration: none; font-weight: 600; margin: 0 8px;">GitHub</a>
                                <span style="color: #cbd5e1;">•</span>
                                <a href="tel:${SITE_CONFIG.author.phone.replace(/\s+/g, '')}" style="color: #0075de; text-decoration: none; font-weight: 600; margin: 0 8px;">${SITE_CONFIG.author.phone}</a>
                            </div>
                            <div style="font-size: 11px; color: #94a3b8;">
                                © ${new Date().getFullYear()} Muhammad Jamshaid Khan. Sent via portfolio contact form.
                            </div>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            `,
        });

        return NextResponse.json(
            { message: 'Email sent successfully!' }, 
            { status: 200, headers: SECURITY_HEADERS }
        );
    } catch (error: any) {
        console.error('Error sending email:', error);

        let message = "Failed to send email.";
        if (error?.code === 'EAUTH' || error?.responseCode === 535) {
            message = "Gmail Auth Error (535 Bad Credentials). Please verify the App Password in .env is valid and 2-Step Verification is enabled in Google Account.";
        } else if (error?.message) {
            message = error.message;
        }

        return NextResponse.json(
            { message, error: error?.message || String(error) }, 
            { status: 500, headers: SECURITY_HEADERS }
        );
    }
}