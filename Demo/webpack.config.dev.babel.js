import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import { theme } from './theme';

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/entry/index', 'index.jsx'),
    login: path.resolve(__dirname, 'src/entry/login', 'login.jsx'),
    register: path.resolve(__dirname, 'src/entry/register', 'register.jsx'),
    homepage: path.resolve(__dirname, 'src/entry/homepage', 'index.jsx'),
    pdfPreview: path.resolve(__dirname, 'src/entry/pdf-preview', 'index.jsx'),
  },
  devServer: {
    // contentBase: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 8053,
    open: false,
    hot: true,
    quiet: true,
    historyApiFallback: true,
    overlay: {
      errors: true,
    },
    stats: {
      children: false,
      chunks: true,
      assets: false,
      modules: false,
    },
    proxy: {
      '/local-server': {
        target: 'http://101.43.119.45:7001',
        pathRewrite: { '^/local-server': '' },
      },
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
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
        exclude: [],
        loader: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
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
      //     'css-hot-loader',
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         hmr: true,
      //         // if hmr does not work, this is a forceful method.
      //         reloadAll: true,
      //         // modifyVars: theme(),
      //       },
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: true,
      //         importLoaders: 1,
      //         modules: false,
      //         // localIdentName: '[name]_[local]-[hash:base64:5]',
      //       },
      //     },
      //     {
      //       loader: 'less-loader',
      //       options: {
      //         sourceMap: true,
      //         javascriptEnabled: true,
      //         modifyVars: {
      //           'primary-color': '#1DA57A',
      //           'link-color': '#1DA57A',
      //           'border-radius-base': '2px',
      //         },
      //         // modifyVars: theme(),
      //       },
      //     },
      //   ],
      //   exclude: /node_modules/,
      // },
      {
        test: /\.less$/,
        use: [
          'css-hot-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
              // modifyVars: theme(),
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              modifyVars: {
                // 'layout-trigger-background': '#1DA57A',
                ...theme,
                // 'primary-color': '#1DA57A',
                // 'link-color': '#1DA57A',
                // 'border-radius-base': '2px',
              },
              // modifyVars: theme(),
            },
          },
        ],
        // exclude: /src/,
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
  node: {
    fs: 'empty',
    module: 'empty',
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { // 项目基本框架等
          chunks: 'all',
          test: /(react|react-dom|redux|react-redux|babel-polyfill)/,
          priority: 100,
          name: 'commons',
        },
      },
    },
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8053/' }),
    new ProgressBarPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'template.ejs'),
      filename: 'index.html',
      inject: true,
      hash: false,
      chunks: [ 'commons', 'index' ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'template.ejs'),
      filename: 'login.html',
      inject: true,
      hash: false,
      chunks: [ 'commons', 'login' ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'template.ejs'),
      filename: 'register.html',
      inject: true,
      hash: false,
      chunks: [ 'commons', 'register' ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'template.ejs'),
      filename: 'homepage.html',
      inject: true,
      hash: false,
      chunks: [ 'commons', 'homepage' ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'template.ejs'),
      filename: 'pdfPreview.html',
      inject: true,
      hash: false,
      chunks: [ 'commons', 'pdfPreview' ],
    }),
    new CleanWebpackPlugin([ 'dist' ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/public'),
      },
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new ManifestPlugin(),
  ],
};
