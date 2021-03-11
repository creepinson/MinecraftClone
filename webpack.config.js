const path = require("path");
module.exports = {
    context: __dirname,

    entry: {
        app: "./src/main.ts",
        html: "./index.html",
    },

    output: {
        //output.path: "[name].js",
        path: __dirname + "/dist",
        filename: "[name].js",
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{ loader: "babel-loader" }, { loader: "ts-loader" }],
            },
            {
                test: /\.html$/,
                loader: "file-loader",
                options: {
                    nname: "[name].[ext]",
                },
            },
        ],
    },
};
