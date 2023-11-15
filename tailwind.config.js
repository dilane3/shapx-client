/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        all: "100vw",
        main: "calc(100% - 480px)",
        "mini-block-lg": "calc(100%/4 - 1rem)",
        "mini-block-md": "calc(100%/3 - 1rem)",
        "mini-block-sm": "calc(100%/2 - 1rem)",
        "block-md": "calc(100%/3 - 1rem)",
        "block-sm": "calc(100%/2 - 1rem)",
      },

      height: {
        all: "100vh",
        base: "calc(100% - 48px)",
        "shape-container": "calc(100% - 40px)"
      },
      colors: {
        primary: {
          // default
          DEFAULT: "#FF626B",
          "200": "#C37075",
        },
        secondary: "#313131",
        tertiary: "#212121",
        gray: "#646464",
        white: "#FFFFFF",
      },

      fontFamily: {
        latoBlack: ["LatoBlack", "sans-serif"],
        latoBold: ["LatoBold", "sans-serif"],
        latoRegular: ["LatoRegular", "sans-serif"],
        latoLight: ["LatoLight", "sans-serif"],
        latoThin: ["LatoThin", "sans-serif"],
      },

      zIndex: {
        1000: 1000
      }
    },
  },
  plugins: [],
});
