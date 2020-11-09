const gulp = require('gulp');
const combine = require('stream-combiner2').obj;

module.exports = () => {
  return gulp.task('vendors-fonts', () => {
    return combine(
      gulp.src($.srcAssets + 'vendors/fonts/**/*.*'),
      gulp.dest($.distFonts)
    );
  });
};
