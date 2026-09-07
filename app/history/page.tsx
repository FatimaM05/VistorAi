"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Generation = {
  id: string;
  type: "IMAGE" | "VIDEO";
  prompt: string;
  status: string;
  outputUrl: string | null;
  createdAt: string;
};

export default function HistoryPage() {
  const { status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<Generation[] | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/auth/login?next=${encodeURIComponent("/history")}`);
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/history")
      .then((r) => r.json())
      .then(setItems);
  }, [status]);

  if (status !== "authenticated") return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-display text-3xl italic">Your history</h1>
      <p className="mt-2 text-sm text-muted">Everything you've generated, newest first.</p>

      {items === null ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-2xl bg-surface" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-line py-16 text-center">
          <p className="text-muted">Nothing here yet.</p>
          <Link href="/generate/video" className="btn-primary mt-4 inline-flex">
            Make your first generation
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="relative aspect-square bg-surface2">
                {item.status === "COMPLETE" && item.outputUrl ? (
                  item.type === "IMAGE" ? (
                    <Image src={item.outputUrl} alt={item.prompt} fill unoptimized className="object-cover" />
                  ) : (
                    <video src={item.outputUrl} muted loop className="h-full w-full object-cover" />
                  )
                ) : item.status === "FAILED" ? (
                  <div className="flex h-full items-center justify-center text-xs text-[#e07a7a]">Failed</div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                  </div>
                )}
                <span className="absolute left-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] uppercase text-white backdrop-blur">
                  {item.type}
                </span>
              </div>
              <p className="line-clamp-2 p-3 text-xs text-muted">{item.prompt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
