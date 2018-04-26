# notes
notes

learn webpack demo from [webpack](https://webpack.js.org)

```javascript
drwxr-xr-x 1  dist
drwxr-xr-x 1  node_modules
-rw-r--r-- 1  package.json
drwxr-xr-x 1  public
-rw-r--r-- 1  server.js
drwxr-xr-x 1  src
-rw-r--r-- 1  webpack.config.js
```

* package.json
```javascript

{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack --display-error-details",
    "watch": "webpack --progress --watch",
    "start": "webpack-dev-server",
    "open": "webpack-dev-server --open",
    "server": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["demo", "webpack"],
  "author": "webpack",
  "license": "MIT",
  "devDependencies": {
    "@babel/plugin-transform-runtime": "^7.0.0-beta.40",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-plugin-import": "^1.6.6",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-runtime": "^6.26.0",
    "clean-webpack-plugin": "^0.1.17",
    "css-loader": "^0.28.7",
    "express": "^4.16.2",
    "file-loader": "^1.1.5",
    "html-webpack-plugin": "^2.30.1",
    "html-webpack-template": "^6.1.0",
    "less": "^3.0.1",
    "less-loader": "^4.1.0",
    "style-loader": "^0.19.0",
    "webpack": "^3.10.0",
    "webpack-dev-middleware": "^1.12.2",
    "webpack-dev-server": "^2.9.7"
  },
  "dependencies": {
    "antd": "^3.0.0",
    "jquery": "^3.3.1",
    "lodash": "^4.17.4",
    "moment": "^2.21.0",
    "react": "^16.2.0",
    "react-dom": "^16.2.0"
  }
}
```

* webpack.config.js
```javascript
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

```

* .babelrc
```javascript

{
    "presets": [
        [ "env"], ["react"]
    ]
}

```

* server.js
```javascript

const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});

```


