/*

    ALL DEPS

*/

var browserify = require('browserify'),
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch'),
    sass = require('gulp-ruby-sass'),
    source = require('vinyl-source-stream'),
    minifyCss = require('gulp-minify-css');

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

    MINIFY CSS

*/

// gulp.task('minify-css', function() {
//   return gulp.src('./public/css/style.css')
//     .pipe(minifyCss({compatibility: 'ie8'}))
//     .pipe(gulp.dest('./public/css/style.min.css'));
// });

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

    // watch('./public/css/style.css', batch(function (events, done) {
    //     gulp.start('minify-css', done);
    // }));
});
