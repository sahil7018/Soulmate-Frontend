/** @type {import('tailwindcss').Config} */
export default {
  prefix: "tw-",
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfairDisplay: ["Playfair Display", "serif"],
        roboto: ["Roboto", "serif"],
        Lato: ["Lato", "serif"],
        lexenDeca: ["Lexend Deca", "sans-serif"],
      },
      backgroundImage: {
        customDropdown:
          "url('https://res.cloudinary.com/dpunh7hfo/image/upload/v1741255254/SoulmateX/hbjwtb8mpkbell6btm4x.svg')",
        redHover:
          "linear-gradient(89.03deg, #ED1B24 3.44%, #ED1B24 30.52%, #F868E7 99.16%)",
        blueHover:
          "linear-gradient(90.21deg, #0059A9 0.18%, #0059A9 54.69%, #0F8DFE 103.02%)",
        premiumCover:
          "url('https://res.cloudinary.com/dpunh7hfo/image/upload/v1743406340/SoulmateX/o9lqjzfjmlghvc8msgdk.svg')",
        vipCover:
          "url('https://res.cloudinary.com/dpunh7hfo/image/upload/v1743406320/SoulmateX/pmhnaqowes1gqntovyng.svg')",
        productFeature:
          "linear-gradient(89.03deg, #ED1B24 3.44%, #ED1B24 45.38%, #F868E7 99.16%)",
        loveJournalCover:
          "url('https://res.cloudinary.com/dpunh7hfo/image/upload/v1741590123/SoulmateX/jonwmfqombhqstamckig.jpg')",
        loveJournalLinearGradient:
          "linear-gradient(270deg, #000000 0%, rgba(204, 207, 209, 0) 36.9%, rgba(125, 126, 127, 0.17) 67.4%, #000000 100%)",
        loveJournalBlogLinearGradient:
          "linear-gradient(270deg, #000000 0%, rgba(204, 207, 209, 0) 36.9%, rgba(125, 126, 127, 0.17) 67.4%, #000000 100%)",
      },
      colors: {
        premiumTextGradient:
          "linear-gradient(89.03deg, #ED1B24 3.44%, #ED1B24 45.38%, #F868E7 99.16%)",
      },
      backgroundSize: {
        8: "0.5rem",
        16: "1rem",
      },
      screens: {
        sw1440: "1441px",
        sw1392: "1392px",
        sw1232: "1232px",
        sw1154: "1154px",
        sw1093: "1093px",
        sm1048: "1048px",
        sw1024: "1025px",
        sw973: "973px",
        sw851: "851px",
        sw800: "800px",
        sw768: "769px",
        sw731: "731px",
        sw690: "690px",
        sw648: "648px",
        sw598: "598px",
        sw552: "552px",
        sw500: "500px",
        sw484: "484px",
        sw444: "444px",
        sw392: "392px",
        sw378: "378px",
        sw364: "364px",
      },
      animation: {
        "spin-slow": "spin 7s linear infinite",
        colorChange: "colorChange 2s infinite",
      },
      keyframes: {
        colorChange: {
          "0%, 100%": { color: "#dcdcdc" },
          "50%": { color: "#72a3cf" },
        },
      },
    },
  },
  plugins: [],
};
