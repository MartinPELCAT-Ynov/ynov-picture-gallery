module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./src/**/*.tsx"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backdropFilter: {
        none: "none",
        blur: "blur(2px)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-filters"), require("@tailwindcss/line-clamp")],
};
