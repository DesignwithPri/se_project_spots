const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/pages/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },

  mode: "development",

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },

      {
        test: /\.(woff|woff2)$/i,
        type: "asset/resource",
      },
    ],
  },

  devServer: {
    static: "./dist",
    open: true,
    port: 8080,
  },
};