/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 12s linear infinite",
      },
    },
  },
  plugins: [],
};
