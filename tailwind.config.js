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
            },
            boxShadow: { drib1: "0px 5px 30px -8px rgba(0,0,0,0.10)" },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
