/** @type {import('next').NextConfig} */
const path = require("path");
module.exports = {
    reactStrictMode: true,
    // generateEtags: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
};