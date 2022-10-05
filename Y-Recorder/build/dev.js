
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./base')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const devConfig = merge(baseWebpackConfig, {
  mode: 'development',

  context: resolve('example'),

  entry: {
    index: './index'
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body'
    }),

    new CopyWebpackPlugin([
      {
        from: 'index.html',
        to: resolve('dist')
      }
    ])
  ],  

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    host: '127.0.0.1',
    port: 8000,
    contentBase: 'dist',
    disableHostCheck: true,
    historyApiFallback: true
  }

})

module.exports = devConfig