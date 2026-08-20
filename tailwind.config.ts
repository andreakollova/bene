import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        mascot: '#7C9070',
        gray: {
          400: '#888888',
          300: '#CCCCCC',
          200: '#E8E8E8',
          100: '#F5F5F5',
        },
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        sans: ['var(--font-hanken)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        btn: '999px',
        input: '12px',
        chip: '999px',
        pill: '999px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};

export default config;
