/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1F6E8C', // Agave Teal
                secondary: '#84A98C', // Sage Green
                accent: '#D4A373', // Earth Gold
                dark: '#0E2A3A', // Navy Charcoal
                surface: '#F8F9FA', // Off-white background
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
