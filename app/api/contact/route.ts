import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message, service, budget } = body;

    // Basic server-side validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { background: #0a0a0a; color: #f0ede8; font-family: 'DM Sans', -apple-system, sans-serif; margin: 0; padding: 0; }
    .wrap { max-width: 560px; margin: 0 auto; padding: 48px 32px; }
    .logo { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #f0ede8; margin-bottom: 40px; opacity: 0.8; }
    .heading { font-size: 22px; font-weight: 400; color: #f0ede8; margin-bottom: 32px; line-height: 1.4; }
    .field { margin-bottom: 20px; border-bottom: 1px solid #222220; padding-bottom: 16px; }
    .field-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #7a7872; margin-bottom: 5px; }
    .field-value { font-size: 14px; color: #f0ede8; line-height: 1.7; }
    .message-box { background: #111111; border: 1px solid #222220; padding: 20px; margin-top: 8px; }
    .footer { margin-top: 48px; font-size: 11px; color: #7a7872; border-top: 1px solid #222220; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="logo">EXOVIO®</div>
    <div class="heading">New project enquiry from ${name}</div>

    <div class="field">
      <div class="field-label">Name</div>
      <div class="field-value">${name}</div>
    </div>

    <div class="field">
      <div class="field-label">Email</div>
      <div class="field-value"><a href="mailto:${email}" style="color:#f0ede8;">${email}</a></div>
    </div>

    ${company ? `<div class="field">
      <div class="field-label">Company / Project</div>
      <div class="field-value">${company}</div>
    </div>` : ""}

    ${service ? `<div class="field">
      <div class="field-label">Service</div>
      <div class="field-value">${service}</div>
    </div>` : ""}

    ${budget ? `<div class="field">
      <div class="field-label">Budget range</div>
      <div class="field-value">${budget}</div>
    </div>` : ""}

    <div class="field">
      <div class="field-label">Message</div>
      <div class="message-box">
        <div class="field-value">${message.replace(/\n/g, "<br>")}</div>
      </div>
    </div>

    <div class="footer">
      Sent via Exovio contact form · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
    </div>
  </div>
</body>
</html>
    `;

    // Send notification to your Gmail inbox
    const notifyRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Exovio Contact <onboarding@resend.dev>",
        to: ["rk035199@gmail.com"],
        reply_to: email,
        subject: `New enquiry from ${name}${company ? ` — ${company}` : ""}`,
        html,
      }),
    });

    if (!notifyRes.ok) {
      const err = await notifyRes.json();
      console.error("Resend error:", err);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Auto-reply to the person who submitted the form
    const autoReplyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { background: #0a0a0a; color: #f0ede8; font-family: 'DM Sans', -apple-system, sans-serif; margin: 0; padding: 0; }
    .wrap { max-width: 560px; margin: 0 auto; padding: 48px 32px; }
    .logo { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #f0ede8; margin-bottom: 40px; opacity: 0.8; }
    .heading { font-size: 22px; font-weight: 400; color: #f0ede8; margin-bottom: 20px; line-height: 1.4; }
    .body-text { font-size: 14px; color: #7a7872; line-height: 1.85; margin-bottom: 16px; }
    .highlight { color: #f0ede8; }
    .footer { margin-top: 48px; font-size: 11px; color: #7a7872; border-top: 1px solid #222220; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="logo">EXOVIO®</div>
    <div class="heading">We got your message, ${name.split(" ")[0]}.</div>
    <p class="body-text">Thank you for reaching out. We've received your enquiry and will be back to you within <span class="highlight">24 hours</span>.</p>
    <p class="body-text">In the meantime, feel free to reply to this email with any extra details.</p>
    <p class="body-text">— The Exovio team</p>
    <div class="footer">
      Exovio · Nashik, India
    </div>
  </div>
</body>
</html>
    `;

    // Fire-and-forget auto-reply
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Exovio <onboarding@resend.dev>",
        to: [email],
        subject: "We got your message — Exovio",
        html: autoReplyHtml,
      }),
    }).catch(console.error);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
