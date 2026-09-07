export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-display text-4xl italic">Contact</h1>
      <p className="mt-6 text-muted">
        Questions, bug reports, or ideas — reach the team at{" "}
        <a href="mailto:hello@azaisai.com" className="text-paper underline underline-offset-4">
          hello@azaisai.com
        </a>
        . We read everything.
      </p>
    </div>
  );
}
