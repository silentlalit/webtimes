import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#ff5e69",
        "secondary-color": "#b16cea",
        "ternary-color": "#ff8a56",

        "blue-color": "#aeb5ff",
        "black-color": "#030303",
        "lightGray-color": "#e3e1e1",
        "exLightGray-color": "#fafafa",
        "gray-color": "#6b7688",
        "brown-color": "#46364a",
        "white-color": "#ffffff",
        "red-color": "#c41604",
        "green-color": "#228b22",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
