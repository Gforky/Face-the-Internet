/*

    ALL DEPS

*/

var browserify = require('browserify'),
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    sass = require('gulp-ruby-sass'),
    source = require('vinyl-source-stream');

/*

  BUNDLE JS UP FOR THE BROWSER WITH BROWSERIFY

*/

gulp.task('browserify', function() {
    return browserify('./app.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/js/'));
});

/*

    COMPILE SCSS FILES

*/

gulp.task('sass', function () {
  return sass('./sass/style.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('./public/css/'));
});

/*

  WATCH FOR ALL FILE CHANGES

*/

gulp.task('watch', function () {
    watch('./app.js', batch(function (events, done) {
        gulp.start('browserify', done);
    }));

    watch('./sass/style.scss', batch(function (events, done) {
        gulp.start('sass', done);
    }));
});
