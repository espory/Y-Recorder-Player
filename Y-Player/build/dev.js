const merge = require('webpack-merge')
const baseWebpackConfig = require('./base')
const webpack = require('webpack')
const path = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const devConfig = merge(baseWebpackConfig, {
  mode: 'development',

  entry: [
    'react-hot-loader/patch', // activate HMR for React
    'webpack-dev-server/client?http://localhost:8080', // bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
    './index.tsx' // the entry point of our app
  ],

  devServer: {
    hot: true,
    disableHostCheck: true,
    inline: true,
    noInfo: true
  },

  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8080/yrecord.html' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),

    new webpack.DefinePlugin({
      PRODUCTION: false
    })
  ],

  devtool: 'cheap-module-eval-source-map'
})

module.exports = devConfig
