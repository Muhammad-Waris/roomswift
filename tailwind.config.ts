import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))"
      },
      boxShadow: {
        soft: "0 20px 45px -30px rgba(15, 23, 42, 0.45)"
      },
      fontFamily: {
        sans: ["var(--font-manrope)"],
        display: ["var(--font-cormorant)"]
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(217, 184, 102, 0.34), transparent 40%), linear-gradient(180deg, rgba(6, 19, 37, 0.95), rgba(8, 15, 28, 1))"
      }
    }
  },
  plugins: []
};

export default config;
