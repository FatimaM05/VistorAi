import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0D0D12",
        surface: "#16161D",
        surface2: "#1D1D26",
        line: "#2A2A35",
        paper: "#F2F0EA",
        muted: "#8B8A94",
        gold: "#E8A33D",
        goldDim: "#7A5A24",
        violet: "#5B5FEF",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "70ch",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
      animation: {
        fadeIn: "fadeIn .7s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
