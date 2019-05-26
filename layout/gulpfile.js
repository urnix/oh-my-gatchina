const gulp = require('gulp');
const sass = require('gulp-sass');
const nunjucks = require('gulp-nunjucks-html');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
 
gulp.task('nun', function() {
  return gulp.src('src/templates/!(_)*.html')
    .pipe(nunjucks({
      searchPaths: ['src/templates']
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function(){
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('css/'))
});

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('src/templates/*.html', gulp.series('nun'));
});
