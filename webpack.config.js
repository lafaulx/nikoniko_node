'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');
var config = require('./local_config');

module.exports = function(isDevelopment) {
  var prodConfig = {
    context: path.join(process.cwd(), 'src'),
    entry: {
      mood: ['./js/mood'],
      stats: ['./js/stats']
    },
    devtool: isDevelopment ? 'eval' : undefined,
    debug: isDevelopment,
    output: {
      path: path.join(process.cwd(), 'build/assets'),
      publicPath: config.API_ORIGIN + '/assets/',
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

  if (isDevelopment) {
    prodConfig.devtool = 'eval';
    prodConfig.debug = true;
    prodConfig.output.publicPath = 'http://localhost:' + config.DEV_SERVER_PORT + '/assets/';

    for (var key in prodConfig.entry) {
      prodConfig.entry[key].unshift('webpack/hot/only-dev-server');
    }

    var loaders = prodConfig.module.loaders[0].loader;
    delete prodConfig.module.loaders[0].loader;
    prodConfig.module.loaders[0].loaders = ['react-hot', loaders];

    prodConfig.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        '__DEV__': true
      })
    ];
  }

  return prodConfig;
};
