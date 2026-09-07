# AzaisAi — rebuild

A from-scratch rebuild of azaisai.com: an AI video/image generator with a free-trial
credit system, real auth, real image generation, and a render history.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind · Prisma + Postgres · NextAuth
(credentials) · OpenAI (image generation) · Replicate (optional, video generation)

## What's real vs. demo

- **Auth, accounts, and credits are fully real.** Sign up, get 8 credits, spend them,
  see the balance update, hit 0 and get blocked with a link to upgrade.
- **Image generation is fully real**, via OpenAI's image API. Set `OPENAI_API_KEY`
  and every image render is a genuine model call.
- **Video generation is provider-pluggable.** Text-to-video model APIs (Sora/Veo/
  Runway-class) change fast and need an exact model version pinned, so rather than
  hardcode one that could silently break, `lib/generation.ts` calls Replicate if
  `REPLICATE_API_TOKEN` + `REPLICATE_VIDEO_MODEL_VERSION` are set, and otherwise
  returns a clearly-labeled demo clip — the credit spend, history record, and UI
  states are all still exercised end to end.
- **Checkout is not wired to a payment processor.** The pricing page and plan tiers
  exist; "upgrade" routes to sign-up rather than Stripe. Flagged as the first thing
  to add next.

## Product judgement — what got built first, and what got left out

Priority order was: **account + credits → the actual generation loop → history →
pricing shell → static pages.** The generation loop (prompt in, real output out,
credit debited) is the entire reason the product exists, so it's the one piece
that's fully real rather than mocked, even though it meant image generation only
(one working provider) rather than four half-wired ones.

Left out on purpose, given the time box:
- Payment processing (Stripe) — pricing page exists, checkout doesn't.
- Multiple video/image model choices in the UI — the schema supports it
  (`ModelProvider` enum), the picker doesn't exist yet.
- Social/OAuth login — credentials-only for now.
- Rate limiting / abuse protection beyond the credit ledger itself.
- Image variations, editing, or upscaling.

## Local setup

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL and OPENAI_API_KEY at minimum
npm run db:push
npm run dev
```

## Deploying

1. **Database**: create a free Postgres instance (Neon or Supabase both work),
   copy the connection string into `DATABASE_URL`.
2. **Deploy**: push this repo to GitHub, import it in Vercel, add the env vars
   from `.env.example` (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`,
   `OPENAI_API_KEY`, optionally `REPLICATE_API_TOKEN` +
   `REPLICATE_VIDEO_MODEL_VERSION`).
3. Vercel's build runs `prisma generate` automatically via `postinstall`; run
   `npx prisma db push` once (locally, pointed at the prod `DATABASE_URL`) to
   create the tables before first use.

## Design

Dark "screening room" theme rather than a generic SaaS look: near-black
blue-tinted background, warm marquee-gold accent, Fraunces for display type,
Inter for UI. The landing page's hero is the actual prompt box, not marketing
copy pointing elsewhere — the product is the pitch.
