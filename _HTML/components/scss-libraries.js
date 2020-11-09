const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const gcmq = require('gulp-group-css-media-queries');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const size = require('gulp-size');

let plugins = [autoprefixer];

if (!λ.isDevelopment) {
  plugins.push(
    cssnano({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    })
  );
}

module.exports = () => {
  return gulp.task('scss:libraries', () => {
    return gulp
      .src($.srcAssets + 'scss/style.scss')
      .pipe(
        plumber({
          errorHandler: notify.onError('Error: <%= error.message %>'),
        })
      )
      .pipe(
        sass({
          includePaths: ['node_modules'],
          style: 'compact',
          sourcemap: true,
        })
      )
      .pipe(concat('libraries.css'))
      .pipe(gcmq())
      .pipe(postcss(plugins))
      .pipe(
        size({
          gzip: !λ.isDevelopment,
        })
      )
      .pipe(gulp.dest($.distCss))
      .pipe($.browserSync.stream());
  });
};
