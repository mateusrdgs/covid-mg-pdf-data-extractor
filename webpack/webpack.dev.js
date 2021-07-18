const { merge } = require('webpack-merge')

const common = require('./webpack.common')

const config = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    hot: true
  },
})

module.exports = config