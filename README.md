# Gulp xliff to json

```
//target language is fr
gulp.src('./test.xlf')
.pipe(xliff2json())
.pipe(gulp.dest('./'))
//result is test.fr.json
```
