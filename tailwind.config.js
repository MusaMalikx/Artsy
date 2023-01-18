/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: 'Montserrat'
      },
      boxShadow: {
        'all-rounded': '0px 0px 4px 3px rgba(0, 0, 0, 0.25)'
      },
      backgroundImage: {
        banner1: "url('/src/assets/images/banner/banner1.jpg')",
        banner2: "url('/src/assets/images/banner/banner2.jpg')",
        banner3: "url('/src/assets/images/banner/banner3.jpg')",
        banner4: "url('/src/assets/images/banner/banner4.jpg')",
        banner5: "url('/src/assets/images/banner/banner5.jpg')",
        banner6: "url('/src/assets/images/banner/banner6.jpg')",
        banner7: "url('/src/assets/images/banner/banner7.jpg')"
      },
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
