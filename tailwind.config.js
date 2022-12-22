/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#188796',
        dark: '#071e34',
        'dark-card': '#20354b',
        light: '#f9f9f9',
        'light-card': '#f6f6f0'
      }
    }
  },
  darkMode: 'class',
  plugins: [require('tailwind-scrollbar-hide')]
};
