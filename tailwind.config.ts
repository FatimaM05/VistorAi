import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Electric Indigo Palette ───────────────────────────
        ink:      "#080B10",   // near-black body
        surface:  "#111622",   // card bg
        surface2: "#161D2E",   // elevated surface
        line:     "#1E2A45",   // border
        paper:    "#EEF2FF",   // primary text
        muted:    "#8892B0",   // secondary text
        dim:      "#4A5568",   // placeholder / disabled
        // ── Accents ───────────────────────────────────────────
        indigo:   "#6366F1",   // primary accent
        indigo2:  "#818CF8",   // lighter accent
        cyan:     "#22D3EE",   // secondary accent
        // ── Legacy compat ─────────────────────────────────────
        gold:     "#818CF8",   // keeps old gold refs → maps to indigo2
        violet:   "#6366F1",
        goldDim:  "#2D2F6A",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        sans:    ["'DM Sans'", "system-ui", "sans-serif"],
      },
      maxWidth: { prose: "70ch" },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
      animation: {
        fadeIn: "fadeIn .6s ease both",
      },
    },
  },
  plugins: [],
};
export default config;


