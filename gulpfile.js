var browserify = require('browserify'),
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    source = require('vinyl-source-stream');

/*

  BUNDLE EVERYTHING UP FOR THE BROWSER WITH BROWSERIFY

*/

gulp.task('browserify', function() {
    return browserify('./app.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('main.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./public/js/'));
});

/*

  WATCH FOR ALL FILE CHANGES

*/

// gulp.task('stream', function () {
//     return gulp.src('./public/css/**/*.css')
//         .pipe(watch('./public/css/**/*.css'))
//         .pipe(gulp.dest('build'));
// });

// gulp.task('callback', function (cb) {
//     watch('./public/css/**/*.css', function () {
//         gulp.src('./public/css/**/*.css')
//             .pipe(watch('css/**/*.css'))
//             .on('end', cb);
//     });
// });
