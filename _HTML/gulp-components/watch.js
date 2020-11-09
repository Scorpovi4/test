const gulp = require('gulp');

module.exports = () => {
  return gulp.task('watch', (callback) => {
    // EJS watchers

    // Watch _pages
    gulp.watch([$.srcFolder + 'ejs/_pages/**/*.ejs']).on('change', () => {
      gulp.series('ejs')(() => {
        $.browserSync.reload();
      });
    });

    // Watch not _pages
    gulp
      .watch([$.srcFolder + 'ejs/**/*.*', '!./_HTML/src/ejs/_pages/**/*.ejs'])
      .on('change', () => {
        delete $.cached.caches['ejs'];
        gulp.series('ejs')(() => {
          $.browserSync.reload();
        });
      });
    // Drop cache when file was deleted
    gulp.watch($.srcFolder + 'ejs/**/*.ejs').on('unlink', function () {
      delete $.cached.caches['ejs'];
    });

    // JS watchers

    // Watch _pages js
    gulp.watch($.srcAssets + 'js/_pages/**/*.js', gulp.series('js:pages'));
    // Watch libraries js
    gulp.watch(
      [$.srcAssets + 'js/**/*.js', '!./_HTML/src/assets/js/_pages/**/*.js'],
      gulp.series('js:libraries')
    );
    // Drop cache when file was deleted
    gulp.watch($.srcAssets + 'js/**/*.js').on('unlink', function () {
      delete $.cached.caches['jsPages'];
    });
    // Page reload when js has been changed
    gulp.watch($.distJs + '**/*.js').on('change', $.browserSync.reload);

    // SCSS watchers
    // Watch _pages scss
    gulp.watch(
      $.srcAssets + 'scss/_pages/**/*.scss',
      gulp.series('scss:pages')
    );
    // Watch libraries scss
    gulp.watch(
      [
        $.srcAssets + 'scss/**/*.scss',
        '!./_HTML/src/assets/scss/_pages/**/*.scss',
      ],
      gulp.series('scss:libraries')
    );
    // Drop cache when file was deleted
    gulp.watch($.srcAssets + 'scss/**/*.scss').on('unlink', function () {
      delete $.cached.caches['scssPages'];
    });

    // ASSETS watchers
    gulp.watch($.srcAssets + 'images/**/*.*', gulp.series('images', 'webp'));
    gulp.watch($.srcAssets + 'icons/**/*.*', gulp.series('icons'));
    gulp.watch($.srcAssets + 'favicon/**/*.*', gulp.series('favicon'));
    gulp.watch($.srcAssets + 'svg/**/*.svg', gulp.series('svg-sprite'));

    // Page reload when html has been changed
    //gulp.watch($.distHtml + '**/*.html').on('change', $.browserSync.reload);

    callback();
  });
};
