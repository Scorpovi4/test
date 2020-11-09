const gulp = require('gulp');
const ejs = require('gulp-ejs-monster');
const debug = require('gulp-debug');
const htmlValidator = require('gulp-w3c-html-validator');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const filter = require('gulp-filter');

module.exports = () => {
  return gulp.task('ejs', () => {
    const exceptions = filter([$.srcFolder + 'ejs/_pages/modals/**/*.html'], {
      restore: true,
    });
    return gulp
      .src($.srcFolder + 'ejs/_pages/**/*.ejs')
      .pipe(
        plumber({
          errorHandler: notify.onError('Error: <%= error.message %>'),
        })
      )
      .pipe($.cached('ejs'))
      .pipe(ejs().on('error', ejs.preventCrash))
      .pipe(debug())
      .pipe(exceptions)
      .pipe(htmlValidator())
      .pipe(htmlValidator.reporter())
      .pipe(exceptions.restore)
      .pipe(gulp.dest($.distHtml));
  });
};
