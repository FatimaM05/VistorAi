import nodemailer from "nodemailer";

export async function sendPasswordResetEmail({
  to,
  resetUrl,
}: {
  to: string;
  resetUrl: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || `"VistorAi Security" <${user || "no-reply@vistorai.com"}>`;

  if (!host || !user || !pass) {
    console.warn("[Email Service]: SMTP environment variables not configured. Skipping email dispatch.");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      subject: "Reset your VistorAi password",
      html: `
        <div style="font-family: 'DM Sans', Arial, sans-serif; background-color: #080B10; color: #EEF2FF; padding: 40px 20px;">
          <div style="max-width: 500px; margin: 0 auto; background-color: #121620; border: 1px solid rgba(99,102,241,0.25); border-radius: 16px; padding: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            <h2 style="color: #ffffff; font-size: 24px; font-weight: 700; margin-top: 0;">VistorAi Password Reset</h2>
            <p style="color: #94A3B8; font-size: 15px; line-height: 1.6;">
              We received a request to reset your password for <strong>${to}</strong>.
            </p>
            <p style="color: #94A3B8; font-size: 15px; line-height: 1.6; margin-bottom: 28px;">
              Click the button below to set up a new password for your account. This link will expire in <strong>1 hour</strong>.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 99px; font-weight: 600; font-size: 14px; box-shadow: 0 8px 20px rgba(99,102,241,0.4);">
                Reset Password
              </a>
            </div>
            <p style="color: #64748B; font-size: 12px; margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px; line-height: 1.5;">
              If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
            </p>
          </div>
        </div>
      `,
    });
  } catch (err: any) {
    console.error("[Email Service]: Failed to deliver password reset email. Verify SMTP credentials.");
  }
}
