var path = require("path");
var gulp = require("gulp");
var less = require("gulp-less");
var inject = require("gulp-inject");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var browserSync = require("browser-sync").create();
var sequence = require("run-sequence");
var cleanCss = require("gulp-clean-css");
var uglify = require("gulp-uglify");

var production = process.env.NODE_ENV === "production";

gulp.task("clean", function() {
  return del("build");
});

gulp.task("compile", function() {
  return gulp
    .src("src/index.html")
    .pipe(
      inject(
        gulp
          .src(["src/styles/index.less"])
          .pipe(less({ paths: path.join(__dirname, "vendor") }))
          .pipe(cleanCss({ level: 2, compatibility: "ie8" })),
        {
          removeTags: true,
          transform: function(filePath, file) {
            return "<style>" + file.contents.toString() + "</style>";
          }
        }
      )
    )
    .pipe(
      inject(gulp.src(["src/scripts/*.js"]).pipe(uglify()), {
        removeTags: true,
        transform: function(filePath, file) {
          return "<script>" + file.contents.toString() + "</script>";
        }
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function() {
  return gulp.src("src/assets/**/*.*").pipe(gulp.dest("build/assets/"));
});

gulp.task("build", function() {
  return sequence("clean", ["compile", "copy"]);
});

gulp.task("watch", function() {
  return gulp.watch("src/**/*.*", ["build", browserSync.reload]);
});

gulp.task("browserSync", function() {
  browserSync.init({ server: { baseDir: "./build" } });
});

gulp.task("dev", ["build", "watch", "browserSync"]);

gulp.task("default", production ? ["build"] : ["dev"]);
