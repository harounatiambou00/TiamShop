/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: "#163569",
        secondary: "#A6E2E8",
        warning: "#F1C535",
        background: "#F6F6F6",
        gradientFrom: "#F41A28",
        gradientTo: "#FFAE6D",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
        serif: ["ui-serif", "Georgia"],
        mono: ["ui-monospace", "SFMono-Regular"],
        kanit: ["Kanit", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        amita: ["Amita", "cursive"],
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        tiny: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
        "8xl": "6rem",
      },
      height: {
        "ten-percent": "10%",
        "ninety-percent": "90%",
      },
    },
  },
  plugins: [],
};
