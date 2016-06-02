var gulp = require("gulp"),
    clean = require("gulp-clean"),
    sourcemaps = require("gulp-sourcemaps"),
    babel = require("gulp-babel"),
    concat = require("gulp-concat"),
    runSequence = require('run-sequence');

gulp.task("clean", function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task("baseline",  function () {
  return gulp.src("src/styles/*.css.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("styles.css.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/baseline"));
});

gulp.task("markup", function () {
  return gulp.src("src/index.*")
    .pipe(gulp.dest("dist"));
});

gulp.task("libs", function () {
  return gulp.src("src/lib/**/*.js")
    .pipe(gulp.dest("dist/lib"));
});

gulp.task("build", function(callback) {
  runSequence('clean', 'baseline', 'markup', 'libs', callback);
});
