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
                muted: "#776b5d",
                accent: {
                    DEFAULT: "#6366f1",
                    light: "#818cf8",
                    dark: "#4f46e5"
                },
                success: {
                    DEFAULT: "#22c55e",
                    light: "#4ade80",
                    dark: "#16a34a"
                },
                danger: {
                    DEFAULT: "#ef4444",
                    light: "#f87171",
                    dark: "#dc2626"
                },
                warning: {
                    DEFAULT: "#f59e0b",
                    light: "#fbbf24"
                }
            },
            fontFamily: {
                display: ["'DM Serif Display'", "Georgia", "Cambria", "serif"],
                body: ["'Inter'", "system-ui", "sans-serif"]
            },
            keyframes: {
                "fade-in": {
                    from: { opacity: "0", transform: "translateY(8px)" },
                    to: { opacity: "1", transform: "translateY(0)" }
                },
                "fade-in-up": {
                    from: { opacity: "0", transform: "translateY(20px)" },
                    to: { opacity: "1", transform: "translateY(0)" }
                },
                "scale-in": {
                    from: { opacity: "0", transform: "scale(0.95)" },
                    to: { opacity: "1", transform: "scale(1)" }
                },
                "overlay-in": {
                    from: { opacity: "0" },
                    to: { opacity: "1" }
                },
                "slide-up": {
                    from: { opacity: "0", transform: "translateY(100%)" },
                    to: { opacity: "1", transform: "translateY(0)" }
                },
                "counter": {
                    from: { opacity: "0", transform: "translateY(4px)" },
                    to: { opacity: "1", transform: "translateY(0)" }
                }
            },
            animation: {
                "fade-in": "fade-in 0.4s ease-out both",
                "fade-in-up": "fade-in-up 0.5s ease-out both",
                "scale-in": "scale-in 0.25s ease-out both",
                "overlay-in": "overlay-in 0.2s ease-out both",
                "slide-up": "slide-up 0.35s ease-out both",
                "counter": "counter 0.5s ease-out both"
            }
        }
    },
    plugins: []
};
