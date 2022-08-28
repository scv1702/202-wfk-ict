/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "blob": "blob 20s infinite",
        "blob2": "blob2 20s infinite",
      },
      keyframes: {
        // random position full screen animation            
        "blob2": {
          '0%': {
            transform: 'translate(0) scale(1)',            
          },
          '33%': {
            transform: 'translate(-100%, 100%) scale(2.2)',
          },
          '66%': {

            transform: 'translate(100%, -100%) scale(1.9)',
          },
          '100%': {
            transform: 'translate(0) scale(1)',
          },
        },
        "blob": {
          '0%': {
            transform: 'translate(0) scale(1)',            
          },
          '33%': {
            transform: 'translate(100%, -100%) scale(1.2)',
          },
          '66%': {

            transform: 'translate(-100%, 100%) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0) scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
}