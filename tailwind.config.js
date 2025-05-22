// tailwind.config.js
module.exports = {
  // prefix: 'tw-',  ❌ 이렇게 되어 있다면
  prefix: "", // ✅ 이렇게 바꿔주세요 (또는 삭제)
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
