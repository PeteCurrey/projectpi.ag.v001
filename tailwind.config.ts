import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#111111",
          pure: "#0B0C0C",
          surface: "#161716",
          elevated: "#1D1E1C",
          border: "#252724",
        },
        warmWhite: {
          DEFAULT: "#F5F3EE",
          muted: "#E6E2D8",
          subtle: "#D4CEC2",
        },
        stone: {
          DEFAULT: "#DCD8CF",
          muted: "#9E9A90",
          dark: "#68655E",
          light: "#EBE8E1",
        },
        brass: {
          DEFAULT: "#A58A5C",
          light: "#C0A678",
          dark: "#7E6842",
          subtle: "rgba(165, 138, 92, 0.18)",
          glow: "rgba(165, 138, 92, 0.35)",
        },
        oliveGrey: {
          DEFAULT: "#343832",
          light: "#4A4F47",
          dark: "#252824",
          surface: "#1E201D",
        },
        oxblood: {
          DEFAULT: "#3A1818",
          dark: "#251010",
          subtle: "rgba(58, 24, 24, 0.3)",
          accent: "#5C2626",
        },
      },
      borderRadius: {
        none: "0px",
        xs: "1px",
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
      },
      fontFamily: {
        sans: ["var(--font-work-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest: "0.22em",
        ultra: "0.32em",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.4)",
        etched: "inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.6)",
        brassPlaque: "inset 0 1px 0 0 rgba(192, 166, 120, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
