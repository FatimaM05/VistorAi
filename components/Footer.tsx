import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/about",   label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq",     label: "FAQ" },
  { href: "/upgrade", label: "Pricing" },
];

export default function Footer() {
  return (
    <footer className="footer-root py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 text-sm sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="footer-brand font-display text-base font-bold italic">VistorAi</p>
          <p className="footer-sub mt-1 max-w-xs">
            Cinematic video and image generation, in one place.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-1.5">
          {FOOTER_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="footer-link">
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="footer-copy">© {new Date().getFullYear()} VistorAi</p>

      </div>
    </footer>
  );
}
