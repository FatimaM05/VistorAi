import Link from "next/link";
import PromptHero from "@/components/PromptHero";
import GalleryTile from "@/components/GalleryTile";

const GALLERY: { label: string; kind: "video" | "image"; tall?: boolean }[] = [
  { label: "Arctic ice cave", kind: "video", tall: true },
  { label: "Retro vintage archive", kind: "image" },
  { label: "Alien planet, blue hour", kind: "video" },
  { label: "Rain-soaked streets", kind: "image", tall: true },
  { label: "Fashion in motion", kind: "video" },
  { label: "Cosmic dust", kind: "image" },
  { label: "Desert dunes, sandstorm", kind: "video", tall: true },
  { label: "Ancient temple, dawn light", kind: "image" },
  { label: "Bioluminescent forest", kind: "video" },
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
        <div className="mb-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="border-t border-line pt-4">
              <p className="font-display text-2xl italic text-gold">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-base font-medium">{step.title}</h3>
              <p className="mt-1 text-sm text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="font-display text-3xl italic">Made with a single prompt</h2>
        <p className="mt-2 max-w-md text-sm text-muted">
          Everything below started as one line of text.
        </p>
        <div className="mt-8 columns-2 gap-4 sm:columns-3">
          {GALLERY.map((item, i) => (
            <GalleryTile key={item.label} label={item.label} kind={item.kind} tall={item.tall} index={i} />
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
