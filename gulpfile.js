var gulp 		= require('gulp'),
	imageResize = require('gulp-image-resize'),
	watermark 	= require("gulp-watermark"),
	jade	 	= require('gulp-jade'),
	imagemin 	= require('gulp-imagemin'),
	sass	 	= require('gulp-sass'),
	rename		= require('gulp-rename'),
	uglify      = require('gulp-uglify');
	del			= require('del'),
	connect		= require('gulp-connect'),
	livereload 	= require('gulp-livereload');



//************************************
//		IMAGE_PORTFOLIO
//************************************
gulp.task('imgPortfolio', function () {
	gulp.src('src/img/portfolio/src-images/**/*.{jpg,JPG}')//resize big images to small
		.pipe(imageResize({
			width : 300,
			height : 200,
			crop : true,
			upscale : false
		}))
		.pipe(gulp.dest('dist/img/portfolio/mini')
	);

	gulp.src('src/img/portfolio/src-images/**/*.{jpg,JPG}')//add watermark to photos
		.pipe(watermark({
			image: 'src/img/watermark.png',
			resize: '50%',
			gravity: 'South'
		}))
		.pipe(gulp.dest('dist/img/portfolio/main')
	);
});

//************************************
//		IMAGE_REVIEW
//************************************
gulp.task('imgReview', function () {
	gulp.src('src/img/reviews/src-images/**/*.{jpg,JPG,jpeg}')//resize big images to small
		.pipe(imageResize({
			width : 300,
			height : 200,
			crop : true,
			upscale : false
		}))
		.pipe(gulp.dest('dist/img/reviews/mini')
	);
});

//************************************
//		GULP IMAGE
//************************************
gulp.task('image', function () {
	gulp.src(['src/img/**/', '!src/img/portfolio/**', '!src/img/reviews/**'])
		.pipe( imagemin() )
		.pipe( gulp.dest('dist/img') )
});

//************************************
//		GULP JADE
//************************************
gulp.task('jade', function() {
	gulp.src(['src/jade/*.jade', '!src/jade/_*.jade']) // Jade
		.pipe(jade({ pretty: true }))
		.pipe(gulp.dest('dist'))
		.pipe( connect.reload() );

	gulp.src('src/jade/portfolio/*.jade') // Jade
		.pipe(jade({ pretty: true }))
		.pipe(gulp.dest('dist/portfolio'))
		.pipe( connect.reload() );
});

//************************************
//		GULP SASS
//************************************
gulp.task('sass', function() {
	return gulp.src(['src/scss/**/*.scss', '!src/scss/_*.scss'])
		.pipe( sass({outputStyle: 'compressed'}) )
		.pipe( rename({ suffix: '.min' }) )
		.pipe( gulp.dest('dist/css') )
		.pipe( connect.reload() );
});

//************************************
//		ClEAN
//************************************

gulp.task('clean', function() {
	return del(['dist/**/*']);
});

//************************************
//		GULP CONNECT
//************************************

gulp.task('connect', function() {
	connect.server({
		root	   : 'dist',
		livereload : true
	});
});


//************************************
//		GULP SCRIPT
//************************************
gulp.task('script', function() {
	gulp.src('src/js/**/*.js')
		.pipe(uglify())
		.pipe( rename({
				suffix: '.min'
			}))
		.pipe(gulp.dest('dist/js'))
		.pipe( connect.reload() );
});

// //***********************************
//		GULP WATCH
//**************************************
gulp.task('watch', function() {
	gulp.watch( 'src/**/*.jade', ['jade'] );
	gulp.watch( 'src/scss/**/*.scss', ['sass'] );
	gulp.watch( 'src/js/**/*.js', ['script'] );
});

// //***********************************
//		GULP BUILD
//**************************************
gulp.task('build', ['clean'], function() {
	gulp.start('jade', 'sass', 'script', 'image', 'imgPortfolio', 'imgReview');
});

// //***********************************
//		GULP
//**************************************
gulp.task( 'default', ['watch', 'connect'] );
