import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d8eeff',
          200: '#b6e0ff',
          300: '#85ccff',
          400: '#4fb2ff',
          500: '#2196f3',
          600: '#167ad1',
          700: '#155fa5',
          800: '#154f84',
          900: '#163f69',
        },
      },
    },
  },
  plugins: [],
};

export default config;
