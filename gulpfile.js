var gulp = require('gulp');
var sass = require('gulp-sass');
var compileHandlebars = require('gulp-compile-handlebars');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

var path = {
  css: './src/*.scss',
  js: './src/scripts/*.js',
  img:  'src/images/*.*',
  mockapi: './src/mockapi/*.json',
  html: {
    pages: './src/pages/**/*.hbs',
    partials: './src/partials/',
    img:  'src/images/*.*',
    templates: './src/templates/**/*.hbs'
  },
  vendor: {
    js: './src/vendor/js/*.js'
  },
  dist: {
    css:  './dist/',
    js:  './dist/',
    mockapi: './dist/mockapi/',
    html: './dist/',
    img: 'dist/images/',
    templates: './dist/',
    vendor: {
      js: './dist/'
    }
  }
};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('images', function () {
    return gulp.src(path.img)
        .pipe(gulp.dest(path.dist.img));
});

gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('vendor_js', function () {
  return gulp.src(path.vendor.js)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(path.dist.vendor.js));
});

gulp.task('html', function () {
  return gulp.src(path.html.pages)
    .pipe(compileHandlebars({}, {
      ignorePartials: true,
      batch: path.html.partials
    }))
    .pipe(rename({
      dirname: '.',
      extname: '.html'
    }))
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('hbs_templates', function() {
  return gulp.src(path.html.templates)
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'blocks.templates',
      noRedeclare: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(path.dist.templates))
});

gulp.task('mockapi', function() {
  return gulp.src(path.mockapi)
    .pipe(gulp.dest(path.dist.mockapi))
});

gulp.task('build', [
  'html',
  'css',
  'js',
  'hbs_templates',
  'mockapi',
  'vendor_js',
  'images'
]);

gulp.task('watch', function () {
  gulp.watch(path.css, ['css']);
  gulp.watch(path.js, ['js']);
  gulp.watch(path.html.pages, ['html']);
  gulp.watch(path.html.templates, ['hbs_templates']);
  gulp.watch(path.html.partials, ['html']);
  gulp.watch(path.mockapi, ['mockapi']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});
