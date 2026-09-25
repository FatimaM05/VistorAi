"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!token) {
      setError("Missing reset token. Please request a new password reset link.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please retype.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="mx-auto max-w-md px-6 py-20">
        <div className="rounded-2xl border border-line bg-surface/50 p-8 shadow-2xl backdrop-blur-xl text-center">
          <h1 className="font-display text-2xl italic text-paper">Invalid Request</h1>
          <p className="mt-3 text-sm text-muted">
            No password reset token was provided in the link.
          </p>
          <div className="mt-6">
            <Link href="/auth/forgot-password" className="btn-primary inline-block py-2.5 px-6">
              Request Reset Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <div className="rounded-2xl border border-line bg-surface/50 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="font-display text-3xl italic text-paper">Set new password</h1>
        <p className="mt-2 text-sm text-muted">
          Choose a strong password to secure your account.
        </p>

        {success ? (
          <div className="mt-6 space-y-5 text-center">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300">
              🎉 Your password has been successfully updated!
            </div>
            <Link href="/auth/login" className="btn-primary w-full inline-block py-3">
              Log in with New Password →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field w-full"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Confirm New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="field w-full"
                placeholder="Re-enter new password"
              />
            </div>

            {error && <p className="text-xs text-[#e07a7a] font-medium">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
              {loading ? "Updating password…" : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
