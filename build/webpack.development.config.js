const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = env => ({
  devtool: 'cheap-module-source-map',
  entry: {
    background: path.resolve(__dirname, '../src/electron/electron.js'),
    app: path.resolve(__dirname, '../src/app.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../app')
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  resolve: {
    modules: [
      path.resolve(__dirname, '../src')
    ],
    alias: {
      env: path.resolve(__dirname, `../config/env.${env}.json`)
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader?sourceMap']
      },
      {
        test: /\.(eot?.+|svg?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        use: 'url-loader?limit=20480'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin({ clearConsole: env === 'development' }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.ejs'),
      path: path.resolve(__dirname, '../app'),
      excludeChunks: ['background'],
      filename: 'index.html'
    })
  ]
});
