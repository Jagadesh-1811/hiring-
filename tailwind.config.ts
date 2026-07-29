import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        primary: ["Inter", "sans-serif"],
      },
      colors: {
        // Semantic Text Tokens
        textPrimary: "#374151",
        textSecondary: "#7c3aed",
        textTertiary: "#111827",
        textInverse: "#ffffff",

        // Semantic Surface Tokens
        surfaceBase: "#000000",
        surfaceMuted: "#f8fafc",
        surfaceRaised: "#059669",

        // Semantic Border Tokens
        borderDefault: "#e5e7eb",
        borderMuted: "#f3f4f6",
        borderStrong: "#ddd6fe",
      },
      borderRadius: {
        xs: "8px",
        sm: "12px",
        md: "16px",
      },
      boxShadow: {
        token1: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        token2: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        token3: "0 4px 6px -1px rgba(124, 58, 237, 0.2), 0 2px 4px -2px rgba(124, 58, 237, 0.2)",
      },
      transitionDuration: {
        instant: "150ms",
      },
      transitionTimingFunction: {
        tokenEase: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
