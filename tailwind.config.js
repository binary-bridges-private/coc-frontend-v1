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
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"], // Default sans-serif font
                serif: ["Merriweather", "serif"], // Default serif font
            },
            fontSize: {
                "mini": "14px",
                "small": "16px",
                "medium": "18px",
                "large": "22px",
            },
            screens: {
                'laptop1': { 'min': '1022px', 'max': '1200px' }, // Custom range
            },
        },
    },
    plugins: [require("daisyui")],
};
