
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    browsersync = require('browser-sync'),
    ngannotate = require('gulp-ng-annotate'),
    del = require('del');

gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

gulp.task('usemin', ['jshint'], function() {
  return gulp.src('./app/menu.html')
  .pipe(usemin({css: [minifycss(), rev()],
                js: [ngannotate(), uglify(), rev()]}))
  .pipe(gulp.dest('dist'));
});

gulp.task('imagemin', function() {
  return del(['dist/images']), gulp.src('app/images/**/*')
  .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
  .pipe(gulp.dest('dist/images'))
  .pipe(notify({message: 'Images task complete'}));
});


gulp.task('copyfonts', ['clean'], function() {
  gulp.src('./bower-components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./dist/fonts'));
  gulp.src('./bower-components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('watch', ['browser-sync'], function() {
  // text files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);

  // image files
  gulp.watch('app/images/**/*', ['imagemin']);
});

gulp.task('browser-sync', ['default'], function() {
  var files = [
    'app/**/*.html',
    'app/styles/**/*.css',
    'app/images/**/*.png',
    'app/scripts/**/*.js',
    'dist/**/*'
  ]
  browsersync.init(files, {server: {baseDir: "dist", index: "menu.html"}});

  gulp.watch(['dist/**']).on("change", browsersync.reload);
});

// clean
gulp.task('clean', function() {
  return del(['dist']);
});

// default
gulp.task('default', ['clean'], function() {
  gulp.start('usemin', 'imagemin', 'copyfonts');  // no return...?
});


