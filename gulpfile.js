var gulp = require('gulp'),
	imageResize = require('gulp-image-resize'),
	watermark = require("gulp-watermark"),
	jade = require('gulp-jade');


gulp.task('build', function() {
	gulp.start('jade', 'imgReview', 'imgPortfolio');
});


//IMAGE_PORTFOLIO
gulp.task('imgPortfolio', function () {
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

//IMAGE_REVIEW
gulp.task('imgReview', function () {
	gulp.src('img/reviews/scr-images/**/*.{jpg,JPG,jpeg}')//resize big images to small
		.pipe(imageResize({
			width : 300,
			height : 200,
			crop : true,
			upscale : false
		}))
		.pipe(gulp.dest('img/reviews/mini')
	);
});

//JADE
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
