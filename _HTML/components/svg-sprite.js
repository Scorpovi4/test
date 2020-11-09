const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const debug = require('gulp-debug');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const svgmin = require('gulp-svgmin');

const config = {
    mode: {
	  symbol: {
				dest: '.',
				sprite: 'sprite.svg'
      }
    }
  };

module.exports = () => {
	return gulp.task('svg-sprite', () => {
		return gulp.src($.srcAssets + 'svg/**/*.svg')
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		.pipe(cheerio({
			run: ($) => {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		.pipe(replace('&gt;', '>'))
		.pipe(svgSprite(config))
		.pipe(debug())
		.pipe(gulp.dest($.distSvg));
	});
}