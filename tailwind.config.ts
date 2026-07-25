import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brandViolet: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        brandPurple: {
          50: '#FAF5FF',
          mid: '#8A63B7',
          deep: '#724E99',
        }
      },
      boxShadow: {
        'violet-glow': '0 4px 20px -2px rgba(124, 58, 237, 0.18), 0 2px 8px rgba(124, 58, 237, 0.12)',
        'card-hover': '0 12px 30px -4px rgba(109, 40, 217, 0.22)',
      },
      keyframes: {
        daveBob: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-3px)' },
        }
      },
      animation: {
        'dave-bob': 'daveBob 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};

export default config;
