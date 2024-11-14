/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors:{
        'text-white': '#e3e3ec',
        'primary-blue': '#010124',
        'secondary-blue': '#2a2b7e',
        'tertiary-blue': '#9e9fd5',
        'accent': '#3d3fd0',
        'primary-pink': '#6b62fe',
        'secondary-pink': '#f9da12',
      },
      fontFamily:{
        primary: ['Noto Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

