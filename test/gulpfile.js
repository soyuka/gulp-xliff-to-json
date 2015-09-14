var xliff2json = require('../index.js')
var gulp = require('gulp')

gulp.task('xliff2json', function() {
 return gulp.src('./test.xlf') 
 .pipe(xliff2json())
 .pipe(gulp.dest('./'))
})
