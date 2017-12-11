var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var path = {
    css:  'src/styles/*.scss',
    html: 'src/templates/*.html',
    images:'src/images/*.*',
    dist: {
      css:  'dist/styles/',
      html: 'dist/',
      images:'dist/images/'
    }
};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.dist.html));
});
gulp.task('images', function () {
  return gulp.src(path.images)
    .pipe(gulp.dest(path.dist.images));
});


gulp.task('build', ['html', 'css','images']);


gulp.task('watch', function () {
  gulp.watch(path.css, ['css']);
  gulp.watch(path.html, ['html']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});
