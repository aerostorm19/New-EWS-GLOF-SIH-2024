import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "space-black": "#0a0e1a",
        "deep-void": "#050810",
        "carbon-steel": "#1a1f2e",
        "arc-blue": "#00a8ff",
        "stark-cyan": "#00d4ff",
        "reactor-blue": "#0080ff",
        "jarvis-blue": "#4da6ff",
        "iron-gold": "#ffa500",
        "stark-white": "#e8f4fd",
        "danger-red": "#ff3333",
        "warning-amber": "#ffaa00",
        "success-green": "#00ff88",

        // Utility color mappings
        arc: "#00a8ff",
        stark: "#00d4ff",
        reactor: "#0080ff",
        jarvis: "#4da6ff",
        iron: "#ffa500",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        "space-mono": ["var(--font-space-mono)", "monospace"],
        exo2: ["var(--font-exo2)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        orbitron: ["Orbitron", "monospace"],
      },
      boxShadow: {
        arc: "0 0 20px rgba(0, 168, 255, 0.4)",
        stark: "0 0 20px rgba(0, 212, 255, 0.4)",
        reactor: "0 0 20px rgba(0, 128, 255, 0.4)",
        jarvis: "0 0 20px rgba(77, 166, 255, 0.4)",
        iron: "0 0 20px rgba(255, 165, 0, 0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
