import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";

const schema = z.object({
  email: z.string().email(),
});

async function ensureResetColumns() {
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "resetToken" TEXT;`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "resetTokenExpiry" TIMESTAMP(3);`);
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "User_resetToken_key" ON "User"("resetToken");`);
  } catch (e) {
    // Ignore if already existing
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email } });

    // Always respond with generic success to prevent user enumeration attacks
    const successResponse = {
      message: "If an account exists with that email address, a password reset link has been sent to your inbox.",
    };

    if (!user) {
      return NextResponse.json(successResponse);
    }

    // Ensure resetToken and resetTokenExpiry columns exist on PostgreSQL
    await ensureResetColumns();

    // Generate a secure random token valid for 1 hour
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.$executeRaw`
      UPDATE "User"
      SET "resetToken" = ${resetToken}, "resetTokenExpiry" = ${resetTokenExpiry}
      WHERE "id" = ${user.id}
    `;

    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const resetUrl = `${protocol}://${host}/auth/reset-password?token=${resetToken}`;

    // Send password reset email via Nodemailer
    await sendPasswordResetEmail({ to: email, resetUrl });

    return NextResponse.json(successResponse);
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
