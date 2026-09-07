"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";

type Generation = {
  id: string;
  status: string;
  outputUrl: string | null;
  errorMessage: string | null;
};

function ImageGenerator() {
  const { status } = useSession();
  const router = useRouter();
  const params = useSearchParams();

  const [prompt, setPrompt] = useState(params.get("prompt") ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Generation | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/auth/login?next=${encodeURIComponent("/generate/image")}`);
    }
  }, [status, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const res = await fetch("/api/generate/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Generation failed.");
      return;
    }
    setResult(data);
  }

  if (status !== "authenticated") return null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <p className="text-sm text-gold">Image · 1 credit</p>
      <h1 className="mt-2 font-display text-3xl italic">Describe the image</h1>

      <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-line bg-surface p-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          placeholder="A neon-lit ramen shop in Tokyo, rain on the window, ultra-realistic..."
          className="w-full resize-none bg-transparent text-base placeholder:text-muted focus:outline-none"
        />
        <div className="mt-2 flex justify-end">
          <button type="submit" disabled={loading || !prompt.trim()} className="btn-primary">
            {loading ? "Rendering…" : "Generate image"}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 rounded-xl border border-[#5c2a2f] bg-[#241417] p-4 text-sm text-[#e07a7a]">
          {error}{" "}
          {error.toLowerCase().includes("credit") && (
            <Link href="/upgrade" className="underline underline-offset-4">
              Upgrade
            </Link>
          )}
        </div>
      )}

      {loading && (
        <div className="mt-8 flex aspect-square items-center justify-center rounded-2xl border border-line bg-surface">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      )}

      {result?.outputUrl && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-line">
          <Image
            src={result.outputUrl}
            alt={prompt}
            width={1024}
            height={1024}
            className="w-full"
            unoptimized
          />
        </div>
      )}
    </div>
  );
}

export default function ImageGeneratePage() {
  return (
    <Suspense fallback={null}>
      <ImageGenerator />
    </Suspense>
  );
}
