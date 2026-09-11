 /** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fff8df",
          100: "#f9e9a8",
          200: "#f2d27a",
          300: "#e8bd4c",
          400: "#d9a928",
          500: "#b88916",
          600: "#8f6810",
          700: "#684b0c",
          800: "#453109",
          900: "#2b1e06",
        },
      },

      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },

  plugins: [],
};
