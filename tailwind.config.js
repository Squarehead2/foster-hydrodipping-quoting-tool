/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
      },
      colors: {
        primary: {
          50: "#F0F4F8",
          100: "#78A083",
          150: "#6A8E7F",
          200: "#50727B",
          250: "#4B6C75",
          300: "#344955",
          350: "#2E3F4A",
          400: "#35374B",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
