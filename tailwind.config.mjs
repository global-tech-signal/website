/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        grotesk: ["Grotesk", "sans-serif"],
      },
      fontWeight: {
        regular: 400,
        medium: 500,
      },
      colors: {
        red: "var(--red)",
        "red-soft": "var(--red-soft)",
        brand: "var(--red)",
        black: "var(--black)",
        dark: "var(--dark)",
        gray: "var(--gray)",
        white: "var(--white)",
        accent: "var(--accent)",
        signal: "var(--accent)",
        // Deprecated alias kept temporarily — prefer `red` / `red-soft`
        green: "var(--red)",
      },
    },
  },
  plugins: [],
};
