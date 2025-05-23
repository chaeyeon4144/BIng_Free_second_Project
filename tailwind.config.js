// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",

    // ❗ 제외할 파일 명시 (경로는 정확히 수정)
    "!./src/views/BingFree.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
