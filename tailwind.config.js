/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // Include all source files
    ],
    theme: {
        extend: {
            colors: {
                primary: "#FFFFFF40", // Example primary color
                secondary: "#F59E0B", // Example secondary color
                accent: "#10B981", // Example accent color
                theme1: "rgb(63, 97, 217)"
            },
            fontFamily: {
                sans: ['"SF Pro Display"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
            },
            fontSize: {
                "mini": "14px",
                "small": "16px",
                "medium": "18px",
                "large": "22px",

                "hl": "3rem",
                "hm": "2.5rem",
                "hs": "2rem",

                "pl": "1.6rem",
                "pm": "1.4rem",
                "ps": "1.2rem",

                "n": "1.1rem",
                "n2": "1rem"
            },
            screens: {
                'laptop1': { 'min': '1022px', 'max': '1200px' }, // Custom range
            },
            keyframes: {
                scrollLeft: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-115%)' },
                },
            },
            animation: {
                scrollLeft: 'scrollLeft 10s linear infinite',
            },
        },
    },
    plugins: [require("daisyui")],
};


