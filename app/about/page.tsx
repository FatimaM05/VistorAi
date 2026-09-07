export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-display text-4xl italic">About VistorAi</h1>
      <p className="mt-6 text-muted">
        VistorAi puts the leading video and image models behind one prompt box, so making
        something cinematic doesn't require learning four different tools first. Pick a model,
        describe the shot, and get a finished render in under a minute.
      </p>
      <p className="mt-4 text-muted">
        This build is a from-scratch rebuild of the product: real accounts, a real credit ledger,
        real image generation, and a render history — with video wired for a real provider the
        moment one is configured.
      </p>
    </div>
  );
}
