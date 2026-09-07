"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setCredits(data.credits))
      .catch(() => {});
  }, [status]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl tracking-tight">
          VistorAi
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          <Link href="/generate/video" className="hover:text-paper">Video</Link>
          <Link href="/generate/image" className="hover:text-paper">Image</Link>
          <Link href="/history" className="hover:text-paper">History</Link>
          <Link href="/upgrade" className="hover:text-paper">Pricing</Link>
        </nav>

        <div className="flex items-center gap-3">
          {status === "authenticated" ? (
            <>
              {credits !== null && (
                <span className="hidden rounded-full border border-line px-3 py-1.5 text-xs text-muted sm:inline">
                  {credits} credit{credits === 1 ? "" : "s"}
                </span>
              )}
              <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-ghost !py-2 !px-4 text-xs">
                Sign out
              </button>
            </>
          ) : status === "loading" ? (
            <div className="h-9 w-20 animate-pulse rounded-full bg-surface2" />
          ) : (
            <>
              <Link href="/auth/login" className="text-sm text-muted hover:text-paper">
                Log in
              </Link>
              <Link href="/auth/signup" className="btn-primary !py-2 !px-4 text-xs">
                Claim free trial
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
