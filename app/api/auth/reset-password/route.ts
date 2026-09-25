import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  token: z.string().min(1, "Reset token is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
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
      const issue = parsed.error.issues[0]?.message || "Invalid input.";
      return NextResponse.json({ error: issue }, { status: 400 });
    }

    const { token, password } = parsed.data;

    await ensureResetColumns();

    // Find user by reset token using parameterized raw query
    const users = await prisma.$queryRaw<any[]>`
      SELECT * FROM "User" WHERE "resetToken" = ${token} LIMIT 1
    `;

    const user = users?.[0];

    if (!user || !user.resetTokenExpiry) {
      return NextResponse.json(
        { error: "Invalid or expired password reset link. Please request a new one." },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (new Date() > new Date(user.resetTokenExpiry)) {
      // Clear expired token
      await prisma.$executeRaw`
        UPDATE "User"
        SET "resetToken" = NULL, "resetTokenExpiry" = NULL
        WHERE "id" = ${user.id}
      `;

      return NextResponse.json(
        { error: "This password reset link has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Hash the new password with bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    // Update user password and clear token
    await prisma.$executeRaw`
      UPDATE "User"
      SET "passwordHash" = ${passwordHash}, "resetToken" = NULL, "resetTokenExpiry" = NULL
      WHERE "id" = ${user.id}
    `;

    return NextResponse.json({
      success: true,
      message: "Password has been reset successfully. You can now log in with your new password.",
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { error: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}
