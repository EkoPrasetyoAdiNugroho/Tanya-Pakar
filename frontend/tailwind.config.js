/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#6EE7B7', // Soft Green (Pastel)
                secondary: '#93C5FD', // Soft Blue
                accent: '#FDBA74', // Soft Orange
                background: '#F9FAFB', // Off white
                dark: '#1F2937',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
