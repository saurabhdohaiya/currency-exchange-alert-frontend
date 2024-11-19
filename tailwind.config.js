module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist"', "sans-serif"],
      },
      backgroundImage: {
        "custom-radial-bg-dark-blue":
          "radial-gradient(50% 50% at 50% 50%, #4602D9 0%, #111111 100%)",
        "custom-radial-bg-dark-red":
          "radial-gradient(50% 50% at 50% 50%, #C31111 0%, #111111 100%)",
      },
      blur: {
        248: "248px",
        458: "458px",
      },
    },
  },
  plugins: [],
};
