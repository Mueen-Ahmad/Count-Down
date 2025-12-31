/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index-new.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            colors: {
                festive: {
                    gold: '#FFD700',
                    moon: '#E2E8F0',
                    deep: '#0F172A',
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
