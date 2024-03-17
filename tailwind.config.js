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
          100: "#78A083",
          200: "#50727B",
          300: "#344955",
          400: "#35374B",
        },
        greyish: "#282c34",
      },
    },
  },
  plugins: [require("daisyui")],
};
