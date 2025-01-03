/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // Include all source files
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1E40AF", // Example primary color
                secondary: "#F59E0B", // Example secondary color
                accent: "#10B981", // Example accent color
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"], // Default sans-serif font
                serif: ["Merriweather", "serif"], // Default serif font
            },
        },
    },
    plugins: [require("daisyui")],
};
