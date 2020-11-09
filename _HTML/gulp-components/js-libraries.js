const gulp = require('gulp');
const notify = require('gulp-notify');
const IF = require('gulp-if');
const combine = require('stream-combiner2').obj;
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const eslint = require('gulp-eslint');

module.exports = () => {
  return gulp.task('js:libraries', (callback) => {
    combine(
      gulp.src([$.srcAssets + 'js/_modules/**/*.js']),
      eslint({ fix: true }),
      eslint.format()
    ).on('error', notify.onError());

    // js combiner
    gulp
      .src($.srcAssets + 'js/libraries.js')
      .pipe(
        webpackStream(
          {
            mode: λ.isDevelopment ? 'development' : 'production',
            output: {
              pathinfo: false,
            },
            plugins: [
              new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
              }),
            ],
            module: {
              rules: [
                {
                  test: /\.js$/,
                  exclude: /(node_modules)/,
                  use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env'],
                    },
                  },
                },
              ],
            },
            optimization: {
              splitChunks: {
                cacheGroups: {
                  default: false,
                  vendors: false,
                  vendor: {
                    chunks: 'all',
                    test: /node_modules/,
                  },
                },
              },
            },
          },
          webpack
        )
      )
      .pipe(concat('libraries.js'))
      .pipe(IF(!λ.isDevelopment, uglify()))
      .pipe(gulp.dest($.distJs));

    callback();
  });
};
