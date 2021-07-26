const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require('webpack-merge')

const common = require('./webpack.common')
const OUTPUT_FOLDER = process.cwd()

const config = merge(common, {
  mode: 'production',
  output: {
    filename: 'bundle.[name].[contenthash].js',
    path: path.resolve(OUTPUT_FOLDER, 'build'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  optimization: {
    splitChunks: {
      maxSize: 244000,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  }
})

module.exports = config