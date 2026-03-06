/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f2f6ff",
          100: "#e0ebff",
          200: "#bed3ff",
          300: "#93b4ff",
          400: "#5a86ff",
          500: "#315eff",
          600: "#2545db",
          700: "#1f36ac",
          800: "#1b2f87",
          900: "#18286d",
        },
        ink: {
          50: "#f6f7fb",
          100: "#e4e7f2",
          200: "#cdd3e3",
          300: "#a7b0cd",
          400: "#7480ae",
          500: "#4e5c90",
          600: "#3b4574",
          700: "#30385f",
          800: "#252b49",
          900: "#1a1f35",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.25)",
      },
    },
  },
  plugins: [],
};

