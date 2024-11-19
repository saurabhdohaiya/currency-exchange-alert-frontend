module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist"', "sans-serif"],
      },
      backgroundImage: {
        "custom-radial":
          "radial-gradient(50% 50% at 50% 50%, #4602D9 0%, #111111 100%)",
      },
      blur: {
        248: "248px",
      },
    },
  },
  plugins: [],
};
