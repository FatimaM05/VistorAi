import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateVideo } from "@/lib/generation";

const schema = z.object({ prompt: z.string().min(3).max(1000) });
const VIDEO_COST = 2;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) return NextResponse.json({ error: "Sign in to generate." }, { status: 401 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Write a prompt with at least a few words." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: "Account not found." }, { status: 404 });
  if (user.credits < VIDEO_COST) {
    return NextResponse.json(
      { error: `Video costs ${VIDEO_COST} credits and you have ${user.credits}. Upgrade to keep generating.` },
      { status: 402 }
    );
  }

  const reserved = await prisma.user.updateMany({
    where: { id: userId, credits: { gte: VIDEO_COST } },
    data: { credits: { decrement: VIDEO_COST } },
  });
  if (reserved.count === 0) {
    return NextResponse.json({ error: "You're out of credits. Upgrade to keep generating." }, { status: 402 });
  }

  const generation = await prisma.generation.create({
    data: {
      userId,
      type: "VIDEO",
      provider: "SORA",
      prompt: parsed.data.prompt,
      status: "PROCESSING",
      creditsSpent: VIDEO_COST,
    },
  });

  try {
    const { url, demo } = await generateVideo(parsed.data.prompt);
    const updated = await prisma.generation.update({
      where: { id: generation.id },
      data: { status: "COMPLETE", outputUrl: url, watermarked: demo },
    });
    return NextResponse.json(updated);
  } catch (err) {
    await prisma.user.update({ where: { id: userId }, data: { credits: { increment: VIDEO_COST } } });
    const message = err instanceof Error ? err.message : "Generation failed.";
    const updated = await prisma.generation.update({
      where: { id: generation.id },
      data: { status: "FAILED", errorMessage: message, creditsSpent: 0 },
    });
    return NextResponse.json({ error: message, generation: updated }, { status: 502 });
  }
}
