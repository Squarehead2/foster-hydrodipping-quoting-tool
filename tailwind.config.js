/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
        IBM: ["IBM Plex Sans"],
      },
    },
  },
  plugins: [require("daisyui")],
};
