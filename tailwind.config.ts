import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        /* shadcn base aliases */
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT:             "hsl(var(--sidebar-background))",
          foreground:          "hsl(var(--sidebar-foreground))",
          primary:             "hsl(var(--sidebar-primary))",
          "primary-foreground":"hsl(var(--sidebar-primary-foreground))",
          accent:              "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border:              "hsl(var(--sidebar-border))",
          ring:                "hsl(var(--sidebar-ring))",
        },

        /* Theme D — semantic palette as Tailwind classes */
        /* Usage: text-cyan-glow, bg-surface-1, border-cyan-glow/20 */
        "surface-0":    "hsl(0 0%  2%)",
        "surface-1":    "hsl(0 0%  5%)",
        "surface-2":    "hsl(0 0%  7%)",
        "surface-3":    "hsl(0 0% 10%)",
        "surface-4":    "hsl(0 0% 13%)",
        "cyan-glow":    "hsl(191 97% 55%)",
        "sky-blue":     "hsl(205 90% 68%)",
        "ice-blue":     "hsl(199 89% 78%)",
        "text-dim":     "hsl(210 20% 85%)",

        /* Legacy aliases — no breaking changes */
        "neon-cyan":    "hsl(191 97% 55%)",
        "neon-blue":    "hsl(205 90% 68%)",
        "dark-surface": "hsl(0 0% 7%)",
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },

      backgroundImage: {
        "grad-primary": "var(--grad-primary)",
        "grad-ice":     "var(--grad-ice)",
        "grad-dark":    "var(--grad-dark)",
        "grad-glow":    "var(--grad-glow-overlay)",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(22px)" },
          to:   { opacity: "1", transform: "translateY(0)"    },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.93)" },
          to:   { opacity: "1", transform: "scale(1)"    },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)"     },
          "50%":       { transform: "translateY(-10px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 16px rgba(7,212,245,0.16)" },
          "50%":       { boxShadow: "0 0 38px rgba(7,212,245,0.38)" },
        },
        "star-twinkle": {
          "0%, 100%": { opacity: "0.3" },
          "50%":       { opacity: "1"  },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)"   },
          to:   { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        "rotate-border": {
          from: { transform: "rotate(0deg)"   },
          to:   { transform: "rotate(360deg)" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(var(--orbit-r,80px)) rotate(0deg)"     },
          to:   { transform: "rotate(360deg) translateX(var(--orbit-r,80px)) rotate(-360deg)" },
        },
        "particle-drift": {
          "0%":   { transform: "translateY(0) translateX(0)",        opacity: "0" },
          "10%":  { opacity: "1" },
          "90%":  { opacity: "1" },
          "100%": { transform: "translateY(-80px) translateX(20px)", opacity: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-up":        "fade-up 0.6s ease-out",
        "fade-in":        "fade-in 0.5s ease-out",
        "scale-in":       "scale-in 0.5s ease-out",
        float:            "float 4s ease-in-out infinite",
        "glow-pulse":     "glow-pulse 2.5s ease-in-out infinite",
        "star-twinkle":   "star-twinkle 3s ease-in-out infinite",
        "spin-slow":      "spin-slow 8s linear infinite",
        shimmer:          "shimmer 2.5s linear infinite",
        "rotate-border":  "rotate-border 3s linear infinite",
        orbit:            "orbit 12s linear infinite",
        "particle-drift": "particle-drift 4s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;