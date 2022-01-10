module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "drib-gray": "#aeaeb8",
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
