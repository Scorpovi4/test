const gulp = require('gulp');
const webp = require('gulp-webp');
const flatmap = require('gulp-flatmap');
const path = require('path');
const rename = require('gulp-rename');
const debug = require('gulp-debug');
const newer = require('gulp-newer');

module.exports = () => {
  return gulp.task('webp', () => {
    return gulp
      .src($.srcAssets + 'images/**/*.{png,jpg,jpeg}', {
        since: gulp.lastRun('webp'),
      })
      .pipe(newer($.distImages))
      .pipe(
        flatmap(function (stream, file) {
          let ext = path.extname(file.path);
          let dir = path.parse(file.path).dir.replace('src', 'public');
          return gulp
            .src(file.path)
            .pipe(
              rename(function (path) {
                path.extname += ext;
              })
            )
            .pipe(
              webp({
                //lossless: true,
              })
            )
            .pipe(debug())
            .pipe(gulp.dest(dir));
        })
      );
  });
};
