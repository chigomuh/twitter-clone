/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        loading: {
          "0%": {
            left: "10%",
          },
          "100%": {
            left: "80%",
          },
        },
      },
      animation: {
        loading: "loading 3s linear infinite",
      },
    },
  },
  plugins: [],
};
