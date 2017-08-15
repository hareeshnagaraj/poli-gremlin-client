const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry:  ['./app.tsx'],
  output: {
    filename: 'app.js',//'[name].js',
    path: path.resolve(`${__dirname}/public`, 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
       {
          test: /\.tsx?$/, // search for ts files
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader?configFileName=tsconfig.json',
              options: {
                presets: [
                  ["es2015", { "modules": false }] // IMPORTANT
                ]
              }
            }
          ]
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.png$/,
          loader: "file-loader"
        },
        {
          test: /\.json$/,
          loader: "file-loader"
        },
     ]
  },
  plugins: [
    new UglifyJsPlugin()
  ]
};
