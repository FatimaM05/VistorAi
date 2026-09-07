const FAQS = [
  {
    q: "How do credits work?",
    a: "An image costs 1 credit, a video costs 2. New accounts get 8 free credits, once. If a render fails, your credit is refunded automatically.",
  },
  {
    q: "What happens to my free trial output?",
    a: "Trial video renders carry a small watermark. Paid plans remove it.",
  },
  {
    q: "Which models power this?",
    a: "Image generation runs on GPT Image today. Video is built against a swappable provider interface — Sora, Veo and Runway-class models can be dropped in without changing the product.",
  },
  {
    q: "Can I get a refund on unused credits?",
    a: "Reach out at hello@vistorai.com and we'll sort it out case by case.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-display text-4xl italic">Frequently asked</h1>
      <div className="mt-8 divide-y divide-line">
        {FAQS.map((item) => (
          <div key={item.q} className="py-6">
            <h2 className="text-base font-medium">{item.q}</h2>
            <p className="mt-2 text-sm text-muted">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
