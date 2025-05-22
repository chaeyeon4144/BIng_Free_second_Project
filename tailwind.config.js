/** @type {import('tailwindcss').Config} */
export default {
  prefix: "tw-", // 모든 클래스 앞에 tw- 접두사 붙음
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B71CA",
      },
      spacing: {
        "login-container": "400px",
      },
      borderRadius: {
        login: "8px",
      },
      boxShadow: {
        login: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
