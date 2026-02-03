/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'selector', // v4에서는 'class' 대신 'selector'를 권장합니다 (동작은 동일)
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}