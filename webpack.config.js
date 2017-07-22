var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./feedViewer.jsx",
  output: {
    path: path.resolve(__dirname, 'scripts'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
