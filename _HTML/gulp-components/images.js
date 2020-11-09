const gulp = require('gulp');
const newer = require('gulp-newer');
const debug = require('gulp-debug');
const imagemin = require('gulp-imagemin');

module.exports = () => {
  return gulp.task('images', () => {
    return gulp
      .src($.srcAssets + 'images/**/*.*', { since: gulp.lastRun('images') })
      .pipe(newer($.distImages))
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
      .pipe(gulp.dest($.distImages));
  });
};
