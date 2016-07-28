var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var watermark = require("gulp-watermark");
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

//************************************
// IMAGE_PORTFOLIO
//************************************
gulp.task('imgPortfolio', function() {
  // resize big images
  gulp.src('src/img/portfolio/src-images/**/*.{jpg,JPG}')
    .pipe(imageResize({
      width: 300,
      height: 200,
      crop: true,
      upscale: false
    }))
    .pipe(gulp.dest('dist/img/portfolio/mini'));

  gulp.src('src/img/portfolio/src-images/**/*.{jpg,JPG}')
    // add watermark to photos
    .pipe(watermark({
      image: 'src/img/watermark.png',
      resize: '50%',
      gravity: 'South'
    }))
    .pipe(gulp.dest('dist/img/portfolio/main'));
});

//************************************
// IMAGE_REVIEW
//************************************
gulp.task('imgReview', function() {
  // resize big images
  gulp.src('src/img/reviews/src-images/**/*.{jpg,JPG,jpeg}')
    .pipe(imageResize({
      width: 300,
      height: 200,
      crop: true,
      upscale: false
    }))
    .pipe(gulp.dest('dist/img/reviews/mini'));
});

//************************************
// GULP IMAGE
//************************************
gulp.task('image', function() {
  gulp.src([
      'src/img/**/',
      '!src/img/portfolio/**',
      '!src/img/reviews/**'
    ])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});

//************************************
// GULP JADE
//************************************
gulp.task('jade', function() {
  gulp.src([
      'src/jade/*.jade',
      '!src/jade/_*.jade'
    ])
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());

  gulp.src('src/jade/portfolio/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('dist/portfolio'))
    .pipe(connect.reload());
});

//************************************
// GULP SASS
//************************************
gulp.task('sass', function() {
  return gulp.src([
      'src/scss/**/*.scss',
      '!src/scss/_*.scss'
    ])
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

//************************************
// CLEAN
//************************************
gulp.task('clean', function() {
  return del(['dist/**/*']);
});

//************************************
// GULP CONNECT
//************************************
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

//************************************
// GULP SCRIPT
//************************************
gulp.task('script', function() {
  gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

//**************************************
// GULP WATCH
//**************************************
gulp.task('watch', function() {
  gulp.watch('src/**/*.jade', ['jade']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['script']);
});

//**************************************
// GULP BUILD
//**************************************
gulp.task('build', ['clean'], function() {
  gulp.start('jade', 'sass', 'script', 'image', 'imgPortfolio', 'imgReview');
});

//**************************************
// GULP
//**************************************
gulp.task('default', ['watch', 'connect']);
