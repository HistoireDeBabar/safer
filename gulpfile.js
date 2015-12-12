var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	source = require('vinyl-source-stream'),
	browserify = require('browserify'),
	browserSync = require('browser-sync').create();

gulp.task('sass', function() {
	return gulp.src('./scss/**/*')
	.pipe(sass.sync().on('error', sass.logError))
	.pipe(sass())
	.pipe(gulp.dest('./dist/css'));
	});

gulp.task('autoprefix', ['sass'], function() {
	return gulp.src('./dist/css/styles.css')
	.pipe(autoprefixer())
	.pipe(gulp.dest('./dist/css/'));
	});

gulp.task('browserify', function() {
    return browserify('./src/web-app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/js'));
	});

gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
    gulp.watch(["./partials/*.html","*.html", "./dist/css/*.css", "dist/js/*.js"]).on("change", browserSync.reload);
  });

gulp.task('watch-files', function() {
	gulp.watch('./scss/**/*', ['autoprefix']);
	gulp.watch('./src/**/*', ['browserify']);
	});

gulp.task('default', ['autoprefix','browserify','watch-files', 'browser-sync']);