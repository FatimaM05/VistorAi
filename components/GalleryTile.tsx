"use client";

import { useState } from "react";

export default function GalleryTile({
  label,
  kind,
  tall,
  src,
}: {
  label: string;
  kind: "video" | "image";
  tall?: boolean;
  src: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-line bg-surface ${
        tall ? "aspect-[3/4]" : "aspect-square"
      }`}
    >
      {/* Shimmer while image loads from CDN */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-white/5" />
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Dark scrim */}
      <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/20" />

      {/* Kind badge */}
      <div className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] uppercase tracking-wide text-white/90 backdrop-blur">
        {kind}
      </div>

      {/* Label */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-display text-lg italic text-white drop-shadow">{label}</p>
      </div>
    </div>
  );
}
