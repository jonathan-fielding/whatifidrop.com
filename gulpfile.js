var gulp = require('gulp');
var cssTasks = require('./tasks/css.task');

gulp.task('css', cssTasks.development);
gulp.task('min-css', cssTasks.production);
gulp.task('default', ['css']);
gulp.task('watch', function(){
    gulp.watch('sass/**/*.scss', ['css']);
});
