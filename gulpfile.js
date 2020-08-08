'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const bs = require('browser-sync').create();

const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const rename = require('gulp-rename');
const svgstore = require('gulp-svgstore');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');

const cssnano = require('cssnano');

const sassGlob = require('gulp-sass-glob');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

gulp.task('styles', () => {
  return gulp
    .src('src/styles/main.scss')
    .pipe(plumber())
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulp.dest('build/styles'))
    .pipe(gulpIf(!isDev, postcss([autoprefixer()])))
    .pipe(gulpIf(!isDev, postcss([cssnano()])))
    .pipe(gulpIf(!isDev, rename('main.min.css')))
    .pipe(gulpIf(!isDev, gulp.dest('build/styles')));
});

gulp.task('clean', () => del('build'));

gulp.task('imagemin', () => {
  return gulp
    .src('build/img/**/*.{png,jpg,jpeg,svg}')
    .pipe(
      imagemin({
        progressive: true,
        optimizationLevel: 3,
        svgoPlugins: [
          {
            removeViewBox: false,
          },
        ],
      })
    )
    .pipe(gulp.dest('build/img'));
});

gulp.task('webp', () => {
  return gulp
    .src('build/img/**/*.{png,jpg,jpeg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('src/img'));
});

gulp.task('svgstore', () => {
  return gulp
    .src('build/img/**/**/*.svg')
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('src/img'));
});

gulp.task('html', () => {
  return gulp
    .src('build/*.html', {since: gulp.lastRun('html')})
    .pipe(posthtml([include()]))
    .pipe(gulp.dest('build'));
});

gulp.task('copy', () => {
  return gulp
    .src('src/**/*.{html,js,woff,woff2,png,jpg,jpeg,webp,svg}', {
      since: gulp.lastRun('copy'),
    })
    .pipe(gulp.dest('build'));
});

gulp.task(
  'build',
  gulp.series('clean', gulp.parallel('copy', 'html', 'styles'))
);

gulp.task('watch', () => {
  gulp.watch('src/styles/**/*.*', gulp.series('styles'));
  gulp.watch('src/**/*.{html,js}', gulp.series('copy', 'html'));
});

gulp.task('serve', () => {
  bs.init({
    server: {baseDir: 'build', index: 'index.html'},
  });
  bs.watch('build/**/*.*').on('change', bs.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));
gulp.task('prod', gulp.series('webp', 'svgstore', 'imagemin', 'build'));
