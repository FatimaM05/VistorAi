const GRADIENTS = [
  "from-[#3a2a12] via-[#7a5a24] to-[#e8a33d]",
  "from-[#161a2e] via-[#2a2f5c] to-[#5b5fef]",
  "from-[#241417] via-[#5c2a2f] to-[#c9515e]",
  "from-[#0f1f1a] via-[#1f4a3a] to-[#3fae8a]",
  "from-[#1e1730] via-[#3d2a5c] to-[#8a5fef]",
  "from-[#231a0f] via-[#5c4a2a] to-[#d9b877]",
];

export default function GalleryTile({
  label,
  kind,
  index,
  tall,
}: {
  label: string;
  kind: "video" | "image";
  index: number;
  tall?: boolean;
}) {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  return (
    <div
      className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-line bg-gradient-to-br ${gradient} ${
        tall ? "aspect-[3/4]" : "aspect-square"
      }`}
    >
      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
      <div className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-wide text-white/90 backdrop-blur">
        {kind}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-display text-lg italic text-white drop-shadow">{label}</p>
      </div>
    </div>
  );
}
