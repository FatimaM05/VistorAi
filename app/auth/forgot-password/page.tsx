"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to process request.");
        return;
      }

      setSuccessMsg(data.message);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <div className="rounded-2xl border border-line bg-surface/50 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="font-display text-3xl italic text-paper">Reset password</h1>
        <p className="mt-2 text-sm text-muted">
          Enter your account email and we'll send a password reset link to your inbox.
        </p>

        {successMsg ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm leading-relaxed text-emerald-300">
              ✉️ {successMsg}
            </div>

            <p className="text-xs text-muted text-center pt-2">
              Didn't receive an email? Check your spam folder or re-enter your email address.
            </p>

            <div className="pt-2 text-center">
              <Link href="/auth/login" className="text-xs text-paper underline underline-offset-4">
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Account Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field w-full"
                placeholder="name@example.com"
              />
            </div>

            {error && <p className="text-xs text-[#e07a7a] font-medium">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
              {loading ? "Sending reset email…" : "Send Reset Email"}
            </button>
          </form>
        )}

        <div className="mt-6 border-t border-line/50 pt-6 text-center text-xs text-muted">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-paper underline underline-offset-4">
            Back to Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
