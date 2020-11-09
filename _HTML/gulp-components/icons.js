const gulp = require('gulp');
const debug = require('gulp-debug');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');

module.exports = () => {
  return gulp.task('icons', () => {
    return gulp
      .src($.srcAssets + 'icons/**/*.*', { since: gulp.lastRun('icons') })
      .pipe(newer($.distIcons))
      .pipe(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ])
      )
      .pipe(debug())
      .pipe(gulp.dest($.distIcons));
  });
};
