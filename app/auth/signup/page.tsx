"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function SignupForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("callbackUrl") || params.get("next") || "/generate/video";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    const signInResult = await signIn("credentials", { redirect: false, email, password });
    setLoading(false);

    if (signInResult?.error) {
      setError("Account created — log in to continue.");
      router.push("/auth/login");
      return;
    }
    router.push(next);
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <p className="text-sm text-gold">8 free credits · no card required</p>
      <h1 className="mt-2 font-display text-3xl italic">Create your account</h1>
      <p className="mt-2 text-sm text-muted">One trial per account. Start generating in under a minute.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs text-muted">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="field" placeholder="Ada Lovelace" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-muted">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field"
            placeholder="ada@example.com"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-muted">Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field"
            placeholder="At least 8 characters"
          />
        </div>

        {error && <p className="text-sm text-[#e07a7a]">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Creating account…" : "Claim free trial"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-paper underline underline-offset-4">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}
