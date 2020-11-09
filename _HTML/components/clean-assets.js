const gulp = require('gulp');
const combine = require('stream-combiner2').obj;
const clean = require('gulp-clean');
const notify = require("gulp-notify");

module.exports = () => {
	return gulp.task('clean:assets', () => {
		return combine(gulp.src($.distHtml),
		clean())
		.on('error', notify.onError())
	})
}