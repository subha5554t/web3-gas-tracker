/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-main': '#2563eb',
        'green-main': '#17b26a',
        'orange-main': '#fa9917',
        'gray-dark': '#475569',
        'body-muted': '#6b7280',
      },
    },
  },
  plugins: [],
}
