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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      fontFamily: {
        elegant: ["var(--font-regatto)"],
        regular: ["var(--font-regular)"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", filter: "blur(4px)" },
          "100%": { opacity: "1", filter: "blur(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 1s ease-out forwards",
        "fade-in-up": "fade-in-up 1s ease-out forwards",
      },
    },
  },
  plugins: [],
  safelist: ["fill-red-700"],
};
export default config;
