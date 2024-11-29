/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      background: "hsl(var(--background))",
      gray: "hsl(var(--gray-background))",
      primary: "var(--primary-foreground)",
      secondary: "var(--secondary-foreground)",
    },
  },
  plugins: [],
};
