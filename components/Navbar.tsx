"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function firstName(name: string | null | undefined): string {
  if (!name) return "You";
  return name.split(" ")[0];
}
function initials(name: string | null | undefined): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return parts.length === 1 ? parts[0][0] : `${parts[0][0]}${parts[parts.length - 1][0]}`;
}

const NAV_LINKS = [
  { href: "/generate/video", label: "Video" },
  { href: "/generate/image", label: "Image" },
  { href: "/history",        label: "History" },
  { href: "/upgrade",        label: "Pricing" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const [credits, setCredits] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setCredits(data.credits))
      .catch(() => {});
  }, [status]);

  const userName = session?.user?.name;

  return (
    <div className="navbar-wrapper">
      <div className="navbar-inner">

        {/* ── Brand ── */}
        <Link href="/" className="navbar-logo" aria-label="VistorAi home">
          VistorAi
        </Link>

        {/* ── Nav links (desktop) ── */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-link ${pathname?.startsWith(link.href) ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Right side controls ── */}
        <div className="flex items-center gap-2">
          {status === "authenticated" ? (
            <>
              {/* User chip */}
              <span className="user-chip hidden sm:inline-flex">
                <span className="user-avatar">{initials(userName)}</span>
                <span className="user-name">{firstName(userName)}</span>
              </span>

              {/* Credits */}
              {credits !== null && (
                <span className="credits-badge hidden sm:inline-flex">
                  {credits} cr
                </span>
              )}

              {/* Sign out */}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="btn-sm-ghost"
              >
                Sign out
              </button>
            </>
          ) : status === "loading" ? (
            <div className="h-8 w-24 animate-pulse rounded-full bg-surface2" />
          ) : (
            <>
              <Link
                href="/auth/login"
                className="navbar-link"
              >
                Log in
              </Link>
              <Link href="/auth/signup" className="btn-primary !py-2 !px-5 !text-xs">
                Get started
              </Link>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
