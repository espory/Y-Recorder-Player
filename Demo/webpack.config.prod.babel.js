import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import HappyPack from 'happypack';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
import { theme } from './theme';
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


import os from 'os';
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const prodEJS = 'template-prod.ejs';
const MdEJS = 'template-md.ejs';
const commonEJS = 'template.ejs';
module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/entry/index', 'index.jsx'),
    login: path.resolve(__dirname, 'src/entry/login', 'login.jsx'),
    register: path.resolve(__dirname, 'src/entry/register', 'register.jsx'),
    homepage: path.resolve(__dirname, 'src/entry/homepage', 'index.jsx'),
    pdfPreview: path.resolve(__dirname, 'src/entry/pdf-preview', 'index.jsx'),
  },
  devtool: 'source-map',
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[name].[chunkhash:8].async.js',
  },
  resolve: {
    extensions: [ '.jsx', '.json', '.js' ],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [ path.resolve(__dirname, 'src') ],
        exclude: /node_modules/,
        use: [ 'happypack/loader?id=babel' ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         // sourceMap: true,
      //         importLoaders: 1,
      //         modules: false,
      //         // localIdentName: '[name]_[local]-[hash:base64:5]',
      //       },
      //     },
      //     {
      //       loader: 'less-loader',
      //       options: {
      //         // sourceMap: true,
      //         javascriptEnabled: true,
      //         // modifyVars: theme(),
      //       },
      //     },
      //   ],
      //   exclude: /node_modules/,
      // },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              // sourceMap: true,
              javascriptEnabled: true,
              modifyVars: {
                ...theme,
              },
              // modifyVars: theme(),
            },
          },
        ],
        // exclude: /src/,
      },
      {
        test: /\.ejs$/,
        use: {
          loader: 'ejs-compiled-loader',
          options: {
            htmlmin: true,
            htmlminOptions: {
              removeComments: true,
            },
          },
        },
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2|png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  stats: {
    children: false,
  },
  performance: {
    hints: false,
  },
  externals: {
    jquery: 'jQuery',
  },
  node: {
    fs: 'empty',
    module: 'empty',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { // 项目基本框架等
          chunks: 'all',
          test(module) {
            const pattern = /(react|react-dom|redux|react-redux|babel-polyfill)/;
            return module.resource && pattern.test(module.resource) && module.resource.endsWith('.js');
          },
          priority: 100,
          // filename: 'commons.js',
          name: 'commons',
        },
        markdown: { // markdown相关
          chunks: 'all',
          // test: /(react-markdown|react-syntax-highlighter|katex|refractor)/,
          test(module) {
            const pattern = /(react-markdown|react-syntax-highlighter|katex|refractor)/;
            return module.resource && pattern.test(module.resource) && module.resource.endsWith('.js');
          },
          priority: 101,
          // filename: 'markdown.js',
          name: 'markdown',
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: false,
          },
        },
        sourceMap: true,
        cache: true,
        parallel: true,
      }),
    ],
    runtimeChunk: {
      name: 'runtime',
    },
  },
  plugins: [
    new ProgressBarPlugin(),
    new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', prodEJS),
      filename: 'index.html',
      inject: false,
      hash: false,
      chunks: [ 'index', 'runtime', 'commons', 'markdown' ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', prodEJS),
      filename: 'login.html',
      inject: true,
      hash: false,
      chunks: [ 'login', 'runtime', 'commons' ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', commonEJS),
      filename: 'register.html',
      inject: true,
      hash: false,
      chunks: [ 'register', 'runtime', 'commons' ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', MdEJS),
      filename: 'homepage.html',
      inject: true,
      hash: false,
      chunks: [ 'homepage', 'runtime', 'commons', 'markdown' ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', commonEJS),
      filename: 'pdfPreview.html',
      inject: true,
      hash: false,
      chunks: [ 'pdfPreview', 'runtime', 'commons' ],
    }),
    new CleanWebpackPlugin([ 'dist' ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/public'),
      },
    ]),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
    new HappyPack({
      id: 'babel',
      loaders: [ 'babel-loader' ],
      threadPool: happyThreadPool,
    }),
    new webpack.HashedModuleIdsPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
};
