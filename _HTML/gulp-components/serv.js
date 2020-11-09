const gulp = require('gulp');

module.exports = () => {
  return gulp.task('serv', (callback) => {
    $.browserSync.init({
      server: {
        baseDir: $.distHtml,
      },
    });

    callback();
  });
};
