const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/App.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    /*
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      title: 'Demo',
      bodyHtmlSnippet: '<div id="root"></div>',
    }),
    */
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.less$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader', options: { javascriptEnabled: true } }]
      },
      { test: /\.(png|svg|gif)$/, use: ['file-loader'] },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules|bower_components/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  }
};
