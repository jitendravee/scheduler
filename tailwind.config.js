/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        calender: {
          100: "#F5F6FA",
        },
        primary: {
          100: "#6E44FF",
          200: "#B892FF",
          300: "#FFC2E2",
          400: "#FF90B3",
          500: "#EF7A85",
        },
      },
    },
  },
  plugins: [],
};
