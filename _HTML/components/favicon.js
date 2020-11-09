const gulp = require('gulp');
const debug = require('gulp-debug');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');

module.exports = () => {
  return gulp.task('favicon', () => {
    return gulp
      .src($.srcAssets + 'favicon/*.*', { since: gulp.lastRun('favicon') })
      .pipe(newer($.distHtml))
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
      .pipe(gulp.dest($.distHtml));
  });
};
