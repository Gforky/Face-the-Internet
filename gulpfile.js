var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var glob = require('glob');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var child = require('child_process');
var fs = require('fs');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
	'react',
  'react/addons'
];

var browserifyTask = function (options) {

  // Our app bundler
	var appBundler = browserify({
		entries: [options.src], // Only need initial file, browserify finds the rest
   	transform: [reactify], // We want to convert JSX to normal javascript
		debug: options.development, // Gives us sourcemapping
		cache: {}, packageCache: {}, fullPaths: options.development // Requirement of watchify
	});

	// We set our dependencies as externals on our app bundler when developing		
	(options.development ? dependencies : []).forEach(function (dep) {
		appBundler.external(dep);
	});

  // The rebundle process
  var rebundle = function () {
    var start = Date.now();
    console.log('----------------------------------');
    console.log('[SERVER - BUILD] Building APP bundle...');
    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('main.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, livereload()))
      .pipe(notify(function () {
        console.log('[SERVER - BUILD] APP bundle built in ' + (Date.now() - start) + 'ms');
        console.log('----------------------------------');
      }));
  };

  // Fire up Watchify when developing
  if (options.development) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);
  }
      
  rebundle();

  // We create a separate bundle for our dependencies as they
  // should not rebundle on file changes. This only happens when
  // we develop. When deploying the dependencies will be included 
  // in the application bundle
  if (options.development) {

  	var testFiles = glob.sync('./specs/**/*-spec.js');
		var testBundler = browserify({
			entries: testFiles,
			debug: true, // Gives us sourcemapping
			transform: [reactify],
			cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
		});

		dependencies.forEach(function (dep) {
			testBundler.external(dep);
		});

  	var rebundleTests = function () {
  		var start = Date.now();
      console.log('----------------------------------');
      console.log('[SERVER - BUILD] Building TEST bundle...');
  		testBundler.bundle()
      .on('error', gutil.log)
	      .pipe(source('specs.js'))
	      .pipe(gulp.dest(options.dest))
	      .pipe(livereload())
	      .pipe(notify(function () {
          console.log('[SERVER - BUILD] TEST bundle built in ' + (Date.now() - start) + 'ms');
          console.log('----------------------------------');
	      }));
  	};

    testBundler = watchify(testBundler);
    testBundler.on('update', rebundleTests);
    rebundleTests();

    // Remove react-addons when deploying, as it is only for
    // testing
    if (!options.development) {
      dependencies.splice(dependencies.indexOf('react-addons'), 1);
    }

    var vendorsBundler = browserify({
      debug: true,
      require: dependencies
    });
    
    // Run the vendor bundle
    var start = new Date();
    console.log('----------------------------------');
    console.log('[SERVER - BUILD] Building VENDORS bundle...');
    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        console.log('[SERVER - BUILD] VENDORS bundle built in ' + (Date.now() - start) + 'ms');
        console.log('----------------------------------');
      }));
    
  }
  
}

var cssTask = function (options) {
    if (options.development) {
      var run = function () {
        console.log(arguments);
        var start = new Date();
        console.log('----------------------------------');
      console.log('[SERVER - BUILD] Building CSS bundle...');
        gulp.src(options.src)
          .pipe(concat('main.css'))
          .pipe(gulp.dest(options.dest))
          .pipe(notify(function () {
            console.log('[SERVER - BUILD] CSS bundle built in ' + (Date.now() - start) + 'ms');
            console.log('----------------------------------');
          }));
      };
      run();
      gulp.watch(options.src, run);
    } else {
      gulp.src(options.src)
        .pipe(concat('main.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(options.dest));   
    }
}

// Starts our development workflow
gulp.task('default', function () {

  // Listen for script changes in app
  livereload.listen();

  // Start up server
  var server = child.spawn('node', ['index.js']);
  var log = fs.createWriteStream('server.log', {flags: 'a'});
  server.stdout.pipe(log);
  server.stderr.pipe(log);

  // Browserify dependencies
  browserifyTask({
    development: true,
    src: './app/main.js',
    dest: './build'
  });

  // Watch changes to SASS
  gulp.watch('./sass/*.scss', function() {
    gulp.src('./sass/main.scss')
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(gulp.dest('./styles'));
  });
  
  // Build css file
  cssTask({
    development: true,
    src: './styles/**/*.css',
    dest: './build'
  });

});

gulp.task('deploy', function () {

  browserifyTask({
    development: false,
    src: './app/main.js',
    dest: './public'
  });
  
  cssTask({
    development: false,
    src: './styles/**/*.css',
    dest: './public'
  });

});

gulp.task('crop', function () {

});

gulp.task('slice', function () {

});
