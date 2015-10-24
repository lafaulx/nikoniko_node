'use strict';

var path = require('path');
var autoprefixer = require('autoprefixer-core');

module.exports = {
  context: path.join(process.cwd(), 'src'),
  entry: {
    index: ['./js/index']
  },
  output: {
    path: path.join(process.cwd(), 'build/assets'),
    publicPath: 'http://localhost:3000/assets/',
    filename: '[name].js'
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'src/js',
      'src/less'
    ],
    extensions: ['', '.js', '.jsx', '.less']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel?stage=0&optional=runtime', exclude: /node_modules/ },
      { test: /\.less$/, loader: 'style!css?-minimize!postcss!less' }
    ]
  },
  postcss: [autoprefixer({
    browsers: ['last 2 version', 'Opera >= 12', 'ie >= 9'],
    remove: false
  })]
};
