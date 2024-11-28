/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#fff5eb',
        secondary: '#FF8200',
        acent: '#242124',
        txtPrimary: '#010101',
        txtSecondary: '#4f4f50',
      }

    },
  },
  plugins: [],
}