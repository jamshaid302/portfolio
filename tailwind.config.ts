import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        notion: {
          primary: "#0075de",
          "primary-active": "#005bab",
          secondary: "#213183",
          canvas: "#ffffff",
          "canvas-soft": "#f6f5f4",
          "canvas-dark": "#0a0d1a",
          "canvas-dark-soft": "#141727",
          surface: "#ffffff",
          "surface-dark": "#181b2e",
          ink: "#000000",
          "ink-secondary": "#31302e",
          "ink-muted": "#615d59",
          "ink-faint": "#a39e98",
          hairline: "#e6e6e6",
          "hairline-dark": "#262a42",
          sky: "#62aef0",
          purple: "#d6b6f6",
          pink: "#ff64c8",
          orange: "#dd5b00",
          teal: "#2a9d99",
          green: "#1aae39",
        },
      },
      fontFamily: {
        "discord-display": ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        notion: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '5px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'pill': '9999px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
};
export default config;
