/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBg: '#E0F7FA',
        lightText: '#00796B',
        lightNavbar: '#B2DFDB',
        lightNavbarText: '#00796B',
        lightHover: '#80CBC4',

        darkBg: '#00796B',
        darkText: '#E0F7FA',
        darkNavbar: '#004D40',
        darkNavbarText: '#E0F7FA',
        darkHover: '#004D40',
      },
    },
  },
  plugins: [],
}
