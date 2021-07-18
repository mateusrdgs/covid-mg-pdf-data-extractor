const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const OUTPUT_FOLDER = process.cwd()

const config = {
  entry: path.resolve(OUTPUT_FOLDER, 'src', 'index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(OUTPUT_FOLDER, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'covig-mg-pdf-data-extractor',
      template: 'src/index.html'
    })
  ]
}

module.exports = config