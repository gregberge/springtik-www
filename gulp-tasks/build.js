export default gulp => {
  const babel = require('gulp-babel');
  const sass = require('gulp-sass');
  const del = require('del');
  const webpack = require('webpack-stream');

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

  gulp.task('clean:js', () =>
    del(['public/dist/*.js'])
  );

  gulp.task('build:js', ['clean:js'], () => {
    gulp.src('src/client/index.js')
      .pipe(webpack(require('../webpack.config.babel.js')))
      .pipe(gulp.dest('public/dist/'));
  });

  gulp.task('watch:js', ['build:js'], () =>
    gulp.watch('src/**/*.js', ['build:dist'])
  );

  gulp.task('clean:css', () =>
    del(['public/dist/*.css'])
  );

  gulp.task('build:css', ['clean:css'], () =>
    gulp.src('src/styles/index.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('public/dist/'))
  );

  gulp.task('watch:css', ['build:css'], () =>
    gulp.watch('src/**/*.scss', ['build:css'])
  );
};
