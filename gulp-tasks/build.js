export default gulp => {
  const babel = require('gulp-babel');
  const del = require('del');

  gulp.task('clean:lib', () =>
    del(['lib'])
  );

  gulp.task('build:lib', ['clean:lib'], () =>
    gulp.src('src/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('lib'))
  );

  gulp.task('watch:lib', ['build:lib'], () =>
    gulp.watch('src/**/*.js', ['build:lib'])
  );
};
