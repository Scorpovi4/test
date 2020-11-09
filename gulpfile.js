'use strict';

const gulp = require('gulp');
const fs = require('fs');

// Global flags
global.λ = {
  isDevelopment: true,
};

// global variables
global.$ = {
  browserSync: require('browser-sync').create(),
  cached: require('gulp-cached'),
  // src PATHs
  srcFolder: './_HTML/src/',
  srcAssets: './_HTML/src/assets/',
  // dist PATHs
  distFolder: './public/',
  distAssets: './public/assets/',
  distHtml: './_HTML/public/',
  distCss: './_HTML/public/assets/css/',
  distFonts: './_HTML/public/assets/fonts/',
  distJs: './_HTML/public/assets/js/',
  distImages: './_HTML/public/assets/images/',
  distIcons: './_HTML/public/assets/icons/',
  distSvg: './_HTML/public/assets/svg/',
  componentsPath: './_HTML/components/',
};

// require all gulp modules
fs.readdirSync($.componentsPath).forEach((file) => {
  require($.componentsPath + file)();
});

// assets module
gulp.task(
  'assets',
  gulp.parallel(
    'vendors-fonts',
    gulp.series('scss:libraries', 'scss:pages'),
    gulp.series('js:libraries', 'js:pages'),
    'svg-sprite',
    'images',
    'webp',
    'icons',
    'favicon'
  )
);

// build module
gulp.task('build', gulp.series('assets', 'ejs'));

// rebuild module
gulp.task('rebuild', gulp.series('clean:assets', 'assets', 'ejs'));

// main module
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serv')));
