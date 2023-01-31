/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      'sm': '344px',
      'md': '646px',
      'lg': '960px',
      'xl': '1180px',
      '2xl': '1400px',
    },
    extend: {},
  },
  plugins: [],
}
