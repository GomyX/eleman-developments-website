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
        // El Eman Developments Brand Colors
        'warm-gold': '#E8B883',
        'pure-black': '#040404',
        'charcoal': '#6D6C6B',
        'light-gray': '#9D9B98',
        'off-white': '#F3F2F2',
        'dark-gray': '#4E4D4C',
        'deep-charcoal': '#3C3B3C',
        'burnt-orange': '#D79C5C',
        'muted-purple': '#847C84',
        'caramel': '#BC8C64',
      },
      fontFamily: {
        'arabic': ['Noto Sans Arabic', 'sans-serif'],
        'english': ['Montserrat', 'sans-serif'],
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;