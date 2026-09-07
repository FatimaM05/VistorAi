import Link from "next/link";

const PLANS = [
  {
    name: "Trial",
    price: "Free",
    cadence: "",
    credits: "8 credits, once",
    features: ["Access to all models", "Watermarked video output", "Standard render queue"],
    cta: "Claim free trial",
    href: "/auth/signup",
  },
  {
    name: "Creator",
    price: "$19",
    cadence: "/month",
    credits: "150 credits / month",
    features: ["No watermark", "Priority render queue", "Full history retention"],
    cta: "Start Creator",
    href: "/auth/signup",
    featured: true,
  },
  {
    name: "Studio",
    price: "$59",
    cadence: "/month",
    credits: "600 credits / month",
    features: ["Everything in Creator", "4K image export", "Early access to new models"],
    cta: "Start Studio",
    href: "/auth/signup",
  },
];

export default function UpgradePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center">
        <h1 className="font-display text-4xl italic">Simple, credit-based pricing</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          One credit for an image, two for a video. Cancel any time.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-2xl border p-6 ${
              plan.featured ? "border-gold bg-surface" : "border-line bg-surface/40"
            }`}
          >
            {plan.featured && (
              <span className="mb-3 w-fit rounded-full bg-gold px-2.5 py-0.5 text-[10px] font-medium uppercase text-ink">
                Most popular
              </span>
            )}
            <h2 className="font-display text-xl italic">{plan.name}</h2>
            <p className="mt-3">
              <span className="font-display text-4xl">{plan.price}</span>
              <span className="text-sm text-muted">{plan.cadence}</span>
            </p>
            <p className="mt-1 text-xs text-muted">{plan.credits}</p>

            <ul className="mt-6 flex-1 space-y-2 text-sm text-muted">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-gold">·</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link href={plan.href} className={plan.featured ? "btn-primary mt-6" : "btn-ghost mt-6"}>
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-muted">
        Checkout isn't wired to a payment processor in this build — plans route to sign up so the
        credit system underneath is fully real and testable.
      </p>
    </div>
  );
}
