/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandBlue: "#004ef1",
        textblack: "#000715",
        subtext: "#667085",
        stroke: "#EFEFF4"
      }
    },
  },
  plugins: [],
};
