import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line/60 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg text-paper">VistorAi</p>
          <p className="mt-1 max-w-xs">Cinematic video and image generation, in one place.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/about" className="hover:text-paper">About</Link>
          <Link href="/contact" className="hover:text-paper">Contact</Link>
          <Link href="/faq" className="hover:text-paper">FAQ</Link>
          <Link href="/upgrade" className="hover:text-paper">Pricing</Link>
        </div>
        <p>© {new Date().getFullYear()} VistorAi</p>
      </div>
    </footer>
  );
}
