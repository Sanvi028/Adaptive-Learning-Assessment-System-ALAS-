/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#fef9ff",
        text: "#181625",
        primary: "#736ced",
      },
      boxShadow: {
        glass: "0 24px 80px rgba(115, 108, 237, 0.16)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        rise: "rise 0.65s ease both",
      },
    },
  },
  plugins: [],
};