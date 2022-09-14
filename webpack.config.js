const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    target: "web",
    entry: {
        app: "./scripts/app.ts"
    },
    output: {
        filename: "scripts/[name].js",
        publicPath: "https://localhost:9090/dist",
        libraryTarget: "amd"
    },

    devServer: {
        https: true,
        port: 9090,
        open: true
    },
    externals: [
        /^VSS\/.*/, /^TFS\/.*/, /^q$/
    ],
    devtool: 'inline-source-map',
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "vss-web-extension-sdk": path.resolve(__dirname, "node_modules/vss-web-extension-sdk/lib/VSS.SDK"),
            "chai": path.resolve(__dirname, "node_modules/chai/lib")            
        },
        modules: [path.resolve("."), "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif|html)$/,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "./node_modules/vss-web-extension-sdk/lib/VSS.SDK.min.js", to: "./dist/VSS.SDK.min.js" },
                { from: "**/*.css", to: "./styles", context: "styles" },
                { from: "*.html", to: "./", context: "." },
                { from: "**/*", to: "./img", context: "img" },
                { from: "**/*", to: "./images", context: "images" },
                { from: "./azure-devops-extension.json", to: "azure-devops-extension.json" },
                { from: "./readme.md", to: "readme.md" }
            ]
        })
    ]
};