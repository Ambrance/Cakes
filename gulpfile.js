var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require("gulp-plumber"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat');

    /* .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ])) */

    gulp.task('sass', function() {
    return gulp.src('sass/*.scss')
    .pipe(plumber())
    .pipe(sass())
.pipe(postcss([
      autoprefixer({browsers: [
        "last 2 versions"
      ]})
    ])) 
    .pipe(concat('style.css'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
    stream: true
    }))
  });

gulp.task('browserSync', function () {
  var files = [
    '*.html',
    'css/*.css',
    'img/*.png',
    'js/*.js'
  ];

  browserSync.init(files, {
    server: {
      baseDir: './'
    }
  });
});

gulp.task('watch', ['browserSync', 'sass'], function (){
gulp.watch('sass/*.scss', ['sass']);
gulp.watch('*.html', browserSync.reload);
// gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', function (callback) {
runSequence(['sass','browserSync', 'watch'], callback)
});
