var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var watermark = require("gulp-watermark");
var jade = require('gulp-jade')

gulp.task('imageProcessing', function () {
	gulp.src('img/portfolio/scr-images/*/*.{jpg,JPG}')//resize big images to small
		.pipe(imageResize({
			width : 300,
			height : 200,
			crop : true,
			upscale : false
		}))
		.pipe(gulp.dest('img/portfolio/mini')
	);

	gulp.src('img/portfolio/scr-images/*/*.{jpg,JPG}')//add watermark to photos
		.pipe(watermark({
			image: 'img/watermark.png',
			resize: '50%',
			gravity: 'South'
		}))
		.pipe(gulp.dest('img/portfolio/main')
	);
});

gulp.task('jade', function() {
	gulp.src(['jade/*.jade', '!jade/_*.jade']) // Jade
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('.'));

	gulp.src('jade/portfolio/*.jade') // Jade
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('portfolio'));
});

//gulp.task('watch', function () {
//	server.listen(35729, function (err) {
//
//	gulp.watch('jade/*/*.jade', ['jade']);
//
//	});

