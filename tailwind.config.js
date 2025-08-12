import { type Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e8b883',
        secondary: '#000000',
        gray: '#6b7280',
      },
      fontFamily: {
        arabic: ['Noto Sans Arabic', 'sans-serif'],
        latin: ['Montserrat', 'sans-serif'],
      },
    },
  },
} satisfies Config;
