/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      background: "hsl(var(--background))",
      primary: "hsl(var(--primary-forground))",
      secondary: "var(--secondary-foreground)",
    },
  },
  plugins: [],
};
