"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ENGINE_MODELS = [
  {
    id: "sora",
    name: "Sora 2.0 Motion Engine",
    provider: "OpenAI Sora",
    tagline: "Physics-informed fluid motion with 60FPS temporal consistency",
    badge: "Cinema Motion",
    promptSample: "A glowing crystalline dragon flying over a luminescent alien fjord, 8k resolution, cinematic volumetric fog...",
    stats: { fps: "60 FPS", depth: "3D Motion Vector", speed: "1.4s/frame", quality: "Ultra HD" },
    accentColor: "from-indigo-500 to-cyan-400",
    glowColor: "rgba(99,102,241,0.25)",
  },
  {
    id: "veo",
    name: "Google Veo 4K Matrix",
    provider: "DeepMind Veo",
    tagline: "Anamorphic lens optics, cinematic depth-of-field & photorealism",
    badge: "Photoreal",
    promptSample: "Close-up macro of raindrops sliding on a neon-lit glass window in futuristic Tokyo at dusk, cinematic bokeh...",
    stats: { fps: "48 FPS", depth: "Anamorphic Lens", speed: "1.8s/frame", quality: "4K Master" },
    accentColor: "from-cyan-400 to-emerald-400",
    glowColor: "rgba(34,211,238,0.25)",
  },
  {
    id: "runway",
    name: "Runway Gen-3 Alpha",
    provider: "RunwayML",
    tagline: "Precision camera trajectory control & lighting coherence",
    badge: "VFX Grade",
    promptSample: "FPV drone camera swooping through a bioluminescent cyber forest with floating glowing jellyfish spores...",
    stats: { fps: "60 FPS", depth: "Drone Orbit", speed: "1.1s/frame", quality: "1080p High" },
    accentColor: "from-purple-500 to-pink-500",
    glowColor: "rgba(168,85,247,0.25)",
  },
  {
    id: "gptimage",
    name: "GPT Image Precision",
    provider: "GPT-4o Vision",
    tagline: "Hyper-detailed raytraced lighting & complex text rendering",
    badge: "Raytraced",
    promptSample: "A vintage glass perfume bottle filled with a mini galaxy floating inside, hyper-realistic studio lighting, octane render...",
    stats: { fps: "Still Render", depth: "Raytraced Subsurface", speed: "0.8s total", quality: "8K Still" },
    accentColor: "from-amber-400 to-rose-500",
    glowColor: "rgba(245,158,11,0.25)",
  },
];

const MAGIC_TAGS = [
  "✨ Volumetric Fog",
  "🎥 Anamorphic 35mm",
  "🌌 Deep Space Motion",
  "⚡ Neural Upscaling",
  "💎 Raytraced Glass",
  "🔮 Bioluminescence",
  "🪐 Cyberpunk Noir",
  "🔥 Octane Render",
];

export default function MagicShowcase() {
  const [activeEngineIndex, setActiveEngineIndex] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState("");
  const activeEngine = ENGINE_MODELS[activeEngineIndex];

  // Typewriter effect simulation for the active prompt
  useEffect(() => {
    let index = 0;
    setTypedPrompt("");
    const targetText = activeEngine.promptSample;

    const timer = setInterval(() => {
      if (index < targetText.length) {
        setTypedPrompt((prev) => prev + targetText.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [activeEngineIndex]);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20">
      {/* Container with semi-transparent glass so the space motion background shines through */}
      <div
        className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-surface/20 p-8 sm:p-12 backdrop-blur-xl shadow-2xl transition-all duration-500"
        style={{
          boxShadow: `0 30px 80px -20px ${activeEngine.glowColor}, inset 0 1px 1px rgba(255,255,255,0.1)`,
        }}
      >
        {/* Animated Background Magic Aura & Particle Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-br ${activeEngine.accentColor} opacity-15 blur-3xl transition-all duration-700`}
          />
          <div
            className={`absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br ${activeEngine.accentColor} opacity-15 blur-3xl transition-all duration-700`}
          />
          {/* Moving magic grid line shimmer */}
          <div className="magic-grid-bg" />
        </div>

        {/* Section Header */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            <span className="h-2 w-2 animate-ping rounded-full bg-cyan-400" />
            Neural Motion Engine 2.0
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl italic text-paper drop-shadow-md">
            Watch the AI dream in real time.
          </h2>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-muted">
            Select a neural engine model to inspect live motion parameters, raytracing physics, and prompt magic.
          </p>
        </div>

        {/* Engine Tabs Switcher */}
        <div className="relative z-10 mt-10 flex flex-wrap justify-center gap-2.5">
          {ENGINE_MODELS.map((engine, idx) => (
            <button
              key={engine.id}
              onClick={() => setActiveEngineIndex(idx)}
              className={`group relative rounded-full px-5 py-2.5 text-xs font-medium transition-all duration-300 ${
                activeEngineIndex === idx
                  ? "bg-gradient-to-r " + engine.accentColor + " text-white shadow-lg shadow-indigo-500/25 scale-105"
                  : "border border-line bg-surface/40 text-muted hover:border-indigo-500/40 hover:text-paper"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>{engine.name}</span>
                <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] opacity-80">
                  {engine.badge}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Magical Visual Workspace */}
        <div className="relative z-10 mt-10 grid gap-8 lg:grid-cols-12 items-center">
          
          {/* Left: Dynamic Live Prompt Console */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-indigo-500/20 bg-black/40 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-muted">
                    {activeEngine.provider} · Prompt Synthesis
                  </span>
                </div>
                <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest animate-pulse">
                  ● LIVE RENDER
                </span>
              </div>

              {/* Dynamic Typewriter Box */}
              <div className="mt-4 min-h-[90px] font-mono text-sm leading-relaxed text-indigo-100">
                <span>{typedPrompt}</span>
                <span className="inline-block h-4 w-2 translate-y-0.5 bg-cyan-400 animate-pulse ml-1" />
              </div>

              {/* Magical Tags Pills */}
              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {MAGIC_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-indigo-500/15 bg-indigo-500/5 px-2.5 py-1 text-[11px] font-medium text-indigo-200 transition-all hover:scale-105 hover:border-cyan-400/40 hover:bg-cyan-400/10 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA directly launching prompt */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-muted">
                {activeEngine.tagline}
              </p>
              <Link
                href={`/generate/video?prompt=${encodeURIComponent(activeEngine.promptSample)}`}
                className={`btn-primary !py-2.5 !px-6 !text-xs bg-gradient-to-r ${activeEngine.accentColor}`}
              >
                Try This Magic Prompt ✨
              </Link>
            </div>
          </div>

          {/* Right: Magical Animated Orbit Engine Core */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative h-64 w-64 sm:h-72 sm:w-72 flex items-center justify-center">
              
              {/* Outer Orbit Ring */}
              <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-[spin_15s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-cyan-400/15 animate-[spin_25s_linear_infinite_reverse]" />
              
              {/* Central Glowing Core Image Orb */}
              <div
                className="relative h-44 w-44 rounded-full border border-white/20 p-2 backdrop-blur-md shadow-2xl transition-all duration-700 flex items-center justify-center overflow-hidden"
                style={{
                  background: `radial-gradient(circle at center, ${activeEngine.glowColor} 0%, rgba(8,11,16,0.9) 80%)`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-cyan-400/20 animate-pulse" />
                <div className="relative z-10 text-center p-4">
                  <p className="font-display text-2xl italic text-paper drop-shadow">
                    {activeEngine.badge}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-cyan-300">
                    {activeEngine.stats.quality}
                  </p>
                </div>
              </div>

              {/* Floating Node Satellites */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-indigo-500/30 bg-surface/80 px-3 py-1 text-[10px] font-mono text-indigo-200 backdrop-blur shadow-lg">
                ⚡ {activeEngine.stats.fps}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-cyan-500/30 bg-surface/80 px-3 py-1 text-[10px] font-mono text-cyan-200 backdrop-blur shadow-lg">
                🎯 {activeEngine.stats.depth}
              </div>
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 rounded-full border border-purple-500/30 bg-surface/80 px-3 py-1 text-[10px] font-mono text-purple-200 backdrop-blur shadow-lg">
                ⏱️ {activeEngine.stats.speed}
              </div>
            </div>

            {/* Performance Stats Cards */}
            <div className="mt-6 grid grid-cols-3 gap-3 w-full text-center">
              <div className="rounded-xl border border-line bg-surface/40 p-2.5 backdrop-blur">
                <p className="text-[10px] text-muted uppercase tracking-wider">Framerate</p>
                <p className="mt-0.5 text-xs font-semibold text-paper">{activeEngine.stats.fps}</p>
              </div>
              <div className="rounded-xl border border-line bg-surface/40 p-2.5 backdrop-blur">
                <p className="text-[10px] text-muted uppercase tracking-wider">Physics</p>
                <p className="mt-0.5 text-xs font-semibold text-paper truncate">{activeEngine.stats.depth}</p>
              </div>
              <div className="rounded-xl border border-line bg-surface/40 p-2.5 backdrop-blur">
                <p className="text-[10px] text-muted uppercase tracking-wider">Latency</p>
                <p className="mt-0.5 text-xs font-semibold text-paper">{activeEngine.stats.speed}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
