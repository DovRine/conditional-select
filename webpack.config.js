var path = require('path');

module.exports = {
  mode: "production",
  entry: "./src/ConditionalSelect.jsx",
  output: {
    path: path.resolve("lib"),
    filename: "ConditionalSelect.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
      {
        test: /\.scss$|\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
};