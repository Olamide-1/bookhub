/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'serif': ['"Playfair Display"'],
      'sans': ['"Work Sans"']
    },

    extend: {
      colors: {
        primary: "#2199e8",
        primaryDark: "#0e70b1",
      }
    },
  },
  plugins: [],
}
