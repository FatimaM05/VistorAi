"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"enter" | "greet" | "exit" | "done">("done");

  useEffect(() => {
    // If splash was already displayed in this session, stay done (no render, no flash)
    if (typeof window !== "undefined" && sessionStorage.getItem("splashShown")) {
      return;
    }

    // First view in session: start enter sequence
    setPhase("enter");

    const tGreet = setTimeout(() => setPhase("greet"), 400);
    const tExit  = setTimeout(() => setPhase("exit"), 3600);
    const tDone  = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("splashShown", "1");
    }, 4300);

    return () => {
      clearTimeout(tGreet);
      clearTimeout(tExit);
      clearTimeout(tDone);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`splash-overlay${phase === "exit" ? " splash-exit" : ""}`}
    >
      {/* Grid texture */}
      <div className="splash-grid" />

      {/* Ambient glows */}
      <div className="splash-glow splash-glow-rose" />
      <div className="splash-glow splash-glow-blush" />
      <div className="splash-glow splash-glow-center" />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <span key={i} className={`splash-particle splash-particle-${i}`} />
      ))}

      {/* Corner brackets */}
      <span className="splash-corner splash-corner-tl" />
      <span className="splash-corner splash-corner-tr" />
      <span className="splash-corner splash-corner-bl" />
      <span className="splash-corner splash-corner-br" />

      {/* Core content */}
      <div className={`splash-content${phase !== "enter" ? " splash-content-visible" : ""}`}>

        {/* Logo ring */}
        <div className="splash-logo-ring">
          <div className="splash-logo-halo" />
          <div className="splash-logo-ring-outer" />
          <div className="splash-logo-ring-inner-ring" />
          <Image
            src="/logo.png"
            alt="VistorAi"
            width={120}
            height={120}
            className="splash-logo-image"
            priority
          />
        </div>

        {/* Wordmark */}
        <p className="splash-wordmark">VistorAi</p>

        {/* Greeting */}
        <div className={`splash-greeting${phase === "greet" || phase === "exit" ? " splash-greeting-visible" : ""}`}>
          <span className="splash-greeting-text">Hi — welcome to the future of visual creation</span>
        </div>

        {/* Tagline */}
        <p className={`splash-tagline${phase === "greet" || phase === "exit" ? " splash-tagline-visible" : ""}`}>
          Sora · Veo · Runway · GPT Image — one platform
        </p>

        {/* Progress bar */}
        <div className="splash-bar-wrap">
          <div className={`splash-bar${phase !== "enter" ? " splash-bar-fill" : ""}`} />
        </div>

      </div>
    </div>
  );
}
