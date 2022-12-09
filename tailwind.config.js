/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary':'#188796',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
