var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./local_config');
var webpackConfig = require('./webpack.config');

gulp.task('webpack', function(callback) {
  webpack(webpackConfig(), function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    callback();
  });
});

gulp.task('webpack-dev-server', function(callback) {
  var webpackDevConfig = webpackConfig(true);

  console.log(webpackDevConfig);

  new WebpackDevServer(webpack(webpackDevConfig), {
    contentBase: './build',
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    stats: {
      colors: true
    }
  }).listen(config.DEV_SERVER_PORT, '0.0.0.0', function(err) {
      if(err) throw new gutil.PluginError('webpack-dev-server', err);

      gutil.log('[webpack-dev-server]', 'http://localhost:' + config.DEV_SERVER_PORT);
  });
});

gulp.task('default', ['webpack-dev-server']);
gulp.task('prod', ['webpack']);