/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  
    darkModeSelector: ".my-app-dark ",

  plugins: [require("flowbite/plugin")],
  darkMode: "selector",
};
