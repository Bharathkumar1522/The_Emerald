import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                forest: "#102A1D",
                "forest-mid": "#1A3628",
                gold: "#D4B483",
                "gold-light": "#E5C790",
                charcoal: "#111111",
                alabaster: "#F9F8F6",
                cream: "#F0EDE6",
            },
            fontFamily: {
                display: ["var(--font-cormorant)", "Georgia", "serif"],
                body: ["var(--font-jost)", "Helvetica Neue", "sans-serif"],
            },
            letterSpacing: {
                "widest-2": "0.3em",
                "widest-3": "0.45em",
            },
        },
    },
    plugins: [],
};
export default config;
