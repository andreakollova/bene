import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF9F5',   // main bg
          100: '#F0EEE6',  // cards, panels
          200: '#E8E6DC',  // pressed, tracks
        },
        sage: {
          DEFAULT: '#7C9070',
          dark: '#64775A',
          soft: '#E4EADF',
          light: '#8FA383',
        },
        ink: {
          DEFAULT: '#3D3929',
          muted: '#7A7568',
          faint: '#A8A395',
        },
        ochre: '#D9A26A',
        clay: '#B5654F',
        amber: '#C89B5A',
        dark: {
          bg: '#262624',
          card: '#30302E',
          text: '#F5F4EF',
          muted: '#A8A395',
          border: '#3A3A37',
        },
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        sans: ['var(--font-hanken)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '14px',
        input: '12px',
        chip: '12px',
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
