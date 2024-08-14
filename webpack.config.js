const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const http = require("http");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true,
    allowedHosts: [
      '34.155.149.97',
      'mille-arts.fr',
      'www.mille-arts.fr',
      '34.163.13.68',
      'localhost'
       ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
    new NodePolyfillPlugin(),
    new CopyPlugin({
        patterns: [
            { from: "src/robots.txt", to: "robots.txt" }
        ]})
  ],
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ["file-loader"],
      }, 
    ],
  },
  resolve: {
    fallback: {
      fs: false,
      stream: false,
      zlib: false,
      crypto: false,
    },
    alias: { "stream": require.resolve("stream-browserify") },
  }
};