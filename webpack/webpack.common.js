const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
    entry: {
      "js/popup": path.join(srcDir, 'popup.tsx'),
      "js/options": path.join(srcDir, 'options.tsx'),
      "js/background": path.join(srcDir, 'background.ts'),
      "js/contentScript": path.join(srcDir, 'contentScript.tsx'),
      serviceWorker: path.join(srcDir, 'serviceWorker.ts'),
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "js/vendor",
            chunks: "initial",
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: "../dist", context: "public" }],
            options: {},
        }),
    ],
};
