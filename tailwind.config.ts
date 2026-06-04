import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1d1b16",
        parchment: "#f7f2e8",
        linen: "#fffaf1",
        brass: "#b78b43",
        moss: "#24594d",
        muted: "#776b5d"
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "serif"],
        body: ["Aptos", "Segoe UI", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
