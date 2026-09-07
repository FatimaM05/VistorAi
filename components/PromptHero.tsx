"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function PromptHero() {
  const { status } = useSession();
  const router = useRouter();
  const [mode, setMode] = useState<"video" | "image">("video");
  const [prompt, setPrompt] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = prompt.trim();
    const destination = `/generate/${mode}${trimmed ? `?prompt=${encodeURIComponent(trimmed)}` : ""}`;

    if (status === "authenticated") {
      router.push(destination);
    } else {
      router.push(`/auth/signup?next=${encodeURIComponent(destination)}`);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-6 pb-14 pt-20 text-center sm:pt-28">
      <p className="text-sm text-muted">8 free credits · no card required</p>
      <h1 className="mt-4 font-display text-4xl italic leading-[1.1] sm:text-6xl">
        Turn a sentence into a scene.
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
        Describe what you want to see. AzaisAi renders it as cinematic video or a
        finished image in under a minute.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 text-left">
        <div className="rounded-2xl border border-line bg-surface p-3 shadow-2xl shadow-black/30">
          <div className="mb-3 flex gap-2">
            {(["video", "image"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
                  mode === m ? "bg-gold text-ink" : "text-muted hover:text-paper"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              mode === "video"
                ? "A lone astronaut walking across a red desert at dusk, cinematic, wide shot..."
                : "A neon-lit ramen shop in Tokyo, rain on the window, ultra-realistic..."
            }
            rows={3}
            className="w-full resize-none bg-transparent text-base placeholder:text-muted focus:outline-none"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-muted">Sora, Veo, Runway &amp; GPT Image, one prompt away</span>
            <button type="submit" className="btn-primary">
              Generate
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
