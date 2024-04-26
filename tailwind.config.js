/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        inter: ["Inter", "Helvetica", "Arial", "sans-serif"],
        poppins: ["Poppins", "Inter", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        22: "22px",
        24: "24px",
        28: "28px",
        30: "30px",
        31: "31px",
        35: "35px",
        42: "42px",
        50: "50px",
        55: "55px",
        61: "61px",
        70: "70px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
