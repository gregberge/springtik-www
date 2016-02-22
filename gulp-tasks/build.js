export default gulp => {
  const babel = require('gulp-babel');
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

  gulp.task('clean:dist', () =>
    del(['public/dist'])
  );

  gulp.task('build:dist', ['clean:dist'], () => {
    gulp.src('src/client/index.js')
      .pipe(webpack(require('../webpack.config.babel.js')))
      .pipe(gulp.dest('public/dist/'));
  });

  gulp.task('watch:dist', ['build:dist'], () =>
    gulp.watch('src/**/*.js', ['build:dist'])
  );
};
