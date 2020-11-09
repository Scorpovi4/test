const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const path = require('path');
const flatmap = require('gulp-flatmap');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const gcmq = require('gulp-group-css-media-queries');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const cached = require('gulp-cached');
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
  return gulp.task('scss:pages', () => {
    return gulp
      .src($.srcAssets + 'scss/_pages/**/*')
      .pipe(cached('scssPages'))
      .pipe(
        flatmap(function (stream, file) {
          let basename = path.basename(file.path, '.scss');
          return gulp
            .src([file.path])
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
            .pipe(concat(basename + '.css'))
            .pipe(gcmq())
            .pipe(postcss(plugins))
            .pipe(
              size({
                gzip: !λ.isDevelopment,
              })
            )
            .pipe(gulp.dest($.distCss))
            .pipe($.browserSync.stream());
        })
      );
  });
};
