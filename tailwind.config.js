/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        art: {
          coral: "#FF8A7A",
          peach: "#FFECE4",
          yellow: "#FFE27A",
          mint: "#90E0EF",
          mintbg: "#E8F8F5",
          lavender: "#C77DFF",
          lavenderbg: "#F4ECFF",
          cream: "#FAF8F5",
          charcoal: "#2B2D42",
          gray: "#71797E",
          warmbg: "#F9F6F0"
        }
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0,0,0,0.06)',
        'float': '0 14px 35px rgba(255, 138, 122, 0.15)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
