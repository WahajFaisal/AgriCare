// tailwind.config.js
module.exports = {
  purge: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  content: ["node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("flowbite/plugin")],
};
