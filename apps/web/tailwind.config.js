/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/background-0.jpg')",
      },
      colors: {
        bgGray: "#DED6D6",
        cBlue: "#7D938A",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
