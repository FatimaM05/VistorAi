import Link from "next/link";
import PromptHero from "@/components/PromptHero";
import GalleryTile from "@/components/GalleryTile";
import MagicShowcase from "@/components/MagicShowcase";

const GALLERY: { label: string; kind: "video" | "image"; tall?: boolean; src: string }[] = [
  {
    label: "Arctic ice cave",
    kind: "video",
    tall: true,
    src: "/gallery/arctic-ice-cave.png",
  },
  {
    label: "Neon city skyline",
    kind: "image",
    src: "/gallery/neon-city-skyline.png",
  },
  {
    label: "Alien planet, blue hour",
    kind: "video",
    src: "/gallery/alien-planet.png",
  },
  {
    label: "Rain on glass, city reflections",
    kind: "image",
    tall: true,
    src: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=768&q=80",
  },
  {
    label: "Volcanic eruption at night",
    kind: "video",
    src: "https://images.unsplash.com/photo-1619033861892-ae4f77c9d9ba?w=768&q=80",
  },
  {
    label: "Cosmic dust",
    kind: "image",
    src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=768&q=80",
  },
  {
    label: "Desert dunes, sandstorm",
    kind: "video",
    tall: true,
    src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=768&q=80",
  },
  {
    label: "Ancient temple, dawn light",
    kind: "image",
    src: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=768&q=80",
  },
  {
    label: "Bioluminescent forest",
    kind: "video",
    src: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=768&q=80",
  },
];

const STEPS = [
  { title: "Pick your model", body: "Sora, Veo, Runway or GPT Image — each suited to a different look. Pick one and go." },
  { title: "Describe it", body: "A sentence is enough. The model fills in the lighting, motion and detail." },
  { title: "Download & use", body: "Your render lands in seconds, in your history, ready to post or ship." },
];

export default function HomePage() {
  return (
    <>
      <PromptHero />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="border-t border-line pt-4">
              <p className="font-display text-2xl italic text-gold">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-base font-medium">{step.title}</h3>
              <p className="mt-1 text-sm text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NEW MAGICAL NEURAL MOTION SHOWCASE ─── */}
      <MagicShowcase />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="font-display text-3xl italic">Made with a single prompt</h2>
        <p className="mt-2 max-w-md text-sm text-muted">
          Everything below started as one line of text.
        </p>
        <div className="mt-8 columns-2 gap-4 sm:columns-3">
          {GALLERY.map((item, i) => (
            <GalleryTile key={item.label} label={item.label} kind={item.kind} tall={item.tall} src={item.src} />
          ))}
        </div>
      </section>

      <section className="border-t border-line/60 bg-surface/40">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl italic">Start creating today</h2>
            <p className="mt-2 max-w-md text-sm text-muted">
              8 free credits, no card required. One trial per account.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/signup" className="btn-primary">Get started free</Link>
            <Link href="/upgrade" className="btn-ghost">View pricing</Link>
          </div>
        </div>
      </section>
    </>
  );
}
