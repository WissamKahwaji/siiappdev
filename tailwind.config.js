/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

const customStyle = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective-1000": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
  });
});

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        header: ["Cairo", "Montserrat", "Open Sans", "Poppins"],
        body: ["Lateef", "sans-serif"],
      },
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        background: "hsl(var(--background))",
        seconBackground: "hsl(var(--seconBackground))",
        navBackground: "hsl(var(--navBackground))",
      },
    },
  },
  plugins: [customStyle],
};
