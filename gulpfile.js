var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var babel = require('gulp-babel');
var react = require('gulp-react');

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

/* BrowserSync */
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './public'
		}
	});
});

/* HTML */
gulp.task('jade', function() {
	gulp.src([
		'./src/**/*.jade'
	])
	.pipe(plumber())
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest('./public'));	
});

/* CSS */
gulp.task('sass', function() {
	gulp.src([
		'./src/sass/app.scss' //pull files from src
	])
	.pipe(plumber())
	.pipe(sass({
		includePaths: [
			'./bower_components/foundation/scss' // include foundation
		]
	})) // compile through gulp-sass
	.pipe(concat('app.css')) // rename
	.pipe(gulp.dest('./public/css')); // deposit
});

/* COFFEE */
gulp.task('coffee', function() {
	gulp.src([
		'./src/coffee/**/*.coffee'
	])
	.pipe(plumber())
	.pipe(coffee({
		bare: true
	})) // TODO: add an "on('error', ...)"
	.pipe(gulp.dest('./public/js'));
});

/* REACT */
gulp.task('react', function() {
	gulp.src([
		'./src/jsx/**/*.jsx'
	])
	.pipe(react())
	.pipe(gulp.dest('./public/js'))
})

/* BABEL (post-transform for js) */
gulp.task('babel', function() {
	gulp.src([
		'./public/js/*.js'
	])
	.pipe(babel())
	.pipe(gulp.dest('./public/js'));
})

/* JS Libraries */
gulp.task('libraries', function() {
	gulp.src([
		// two example libraries, but add those you need
		'./bower_components/jquery/dist/jquery.min.js',
		'./bower_components/bounce.js/bounce.min.js',
		'./bower_components/react/react.js',
		'./bower_components/react/react-dom.js'
	])
	.pipe(concat('libraries.js'))
	.pipe(gulp.dest('./public/js'));
});

/* BUILD */
gulp.task('build', ['jade', 'sass', 'libraries', 'coffee', 'react']);

/* POST */
gulp.task('post-build', ['babel']);

/* SERVE */
gulp.task('serve', ['build', 'post-build', 'browser-sync'], function() {
	gulp.watch('./src/sass/**/*.scss', ['sass', reload]); //every time something changes in a, run b
	gulp.watch('./src/**/*.jade', ['jade', reload]);
	gulp.watch('./src/coffee/**/*.coffee', ['coffee', reload]);
	gulp.watch('./src/jsx/**/*.jsx', ['react', reload]);
});

gulp.task('default', ['serve']);