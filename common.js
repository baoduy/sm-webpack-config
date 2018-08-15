// shared config (dev and prod)
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const devMode = process.env.NODE_ENV
  ? process.env.NODE_ENV !== 'production'
  : false;

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  context: resolve(__dirname, '../../src'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        rules: [
          {
            test: /\.less$/,
            use: [
              devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader', // translates CSS into CommonJS
              'postcss-loader',
              'less-loader' // compiles Less to CSS
            ]
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: ['file-loader?name=img/[name].[ext]', 'img-loader']
      },
      {
        test: /\.(svg)$/i,
        use: ['url-loader?mimetype=image/svg+xml', 'img-loader']
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/octet-stream'
      },
      //copy Web config file to dist folder
      {
        test: /web.config/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html.ejs',
      favicon: 'favicon.ico'
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ],
  externals: {
    React: 'react',
    ReactDOM: 'react-dom',
    jsdom: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react-dom/test-utils': true,
    'react-test-renderer/shallow': true
  },
  performance: {
    hints: 'warning'
  }
};
