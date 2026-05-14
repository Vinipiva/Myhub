/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./locales/**/*.{json}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Red Hat Text", "sans-serif"], // Primary sans-serif font
        display: ["Red Hat Display", "sans-serif"], // Display font for headings
        dynalight: ["Dynalight", "cursive"], // Decorative font
      },
    },
  },
  plugins: [],
};