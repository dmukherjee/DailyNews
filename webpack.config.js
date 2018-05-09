var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
       }
      },
      { test: /\.css$/, 
        use: [ 'style-loader', 'css-loader' ]}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${SRC_DIR}/index.html`
    })
  ],
  mode: 'development'   
};
