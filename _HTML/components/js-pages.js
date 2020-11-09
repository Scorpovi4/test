const gulp = require('gulp');
const notify = require('gulp-notify');
const path = require('path');
const IF = require('gulp-if');
const combine = require('stream-combiner2').obj;
const flatmap = require('gulp-flatmap');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const eslint = require('gulp-eslint');
const cached = require('gulp-cached');
const plumber = require('gulp-plumber');

module.exports = () => {
  return gulp.task('js:pages', (callback) => {
    combine(
      gulp.src([$.srcAssets + 'js/_pages/**/*.js']),
      eslint({ fix: true }),
      eslint.format()
    ).on('error', notify.onError());

    // js combiner
    gulp.src($.srcAssets + 'js/_pages/**/*.js').pipe(
      flatmap(function (stream, file) {
        let basename = path.basename(file.path);
        return gulp
          .src([file.path])
          .pipe(
            plumber({
              errorHandler: notify.onError('Error: <%= error.message %>'),
            })
          )
          .pipe(cached('jsPages'))
          .pipe(
            webpackStream(
              {
                mode: λ.isDevelopment ? 'development' : 'production',
                output: {
                  pathinfo: false,
                },
                plugins: [],
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
                  namedModules: true,
                  namedChunks: true,
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
          .pipe(concat(basename))
          .pipe(IF(!λ.isDevelopment, uglify()))
          .pipe(gulp.dest($.distJs));
      })
    );
    callback();
  });
};
