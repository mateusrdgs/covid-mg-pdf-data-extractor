const path = require('path')
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