const gulp = require('gulp')
const minifyHtml = require('gulp-htmlmin')

gulp.task('minify-html', () => {
  return gulp.src('views/*.html')
    .pipe(minifyHtml({collapseWhitespace: true}))
    .pipe(gulp.dest('views/minified'))
})
