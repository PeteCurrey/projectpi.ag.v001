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
        // Admin OS — light professional operations theme
        admin: {
          bg: "#FAFAF9",
          surface: "#F5F3EF",
          sidebar: "#F2F0EB",
          card: "#FFFFFF",
          border: "#E2E0DA",
          "border-subtle": "#EDEBE6",
          "border-strong": "#CCC9C1",
          text: "#1C1C1A",
          "text-secondary": "#4A4845",
          "text-muted": "#6B6861",
          "text-faint": "#9E9A92",
          hover: "#E8E5DF",
          active: "#E2DED5",
          accent: "#A58A5C",
          "accent-hover": "#8A7248",
          "accent-subtle": "rgba(165,138,92,0.10)",
          "accent-border": "rgba(165,138,92,0.25)",
        },
        // Editorial corporate palette (Rule 04)
        editorial: {
          bg: "#F5F3EE",
          surface: "#E8E5DE",
          text: "#111111",
          muted: "#6F706A",
          rule: "#D6D3CB",
          brass: "#A58A5C",
          oxblood: "#7D2424",
        },
        paper: {
          DEFAULT: "#F5F3EE",
          stone: "#ECEAE4",
          contrast: "#111111",
        },
        ink: {
          DEFAULT: "#111111",
          muted: "#666661",
          faint: "#999893",
        },
        rule: {
          DEFAULT: "#D8D5CD",
          subtle: "#E5E3DC",
        },
      },
      borderRadius: {
        none: "0px",
        xs: "1px",
        sm: "2px",
        DEFAULT: "0px",
        md: "2px",
      },
      fontFamily: {
        sans: ["var(--font-work-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-work-sans)", "system-ui", "-apple-system", "sans-serif"],
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
        "admin-card": "0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)",
        "admin-elevated": "0 4px 12px 0 rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
