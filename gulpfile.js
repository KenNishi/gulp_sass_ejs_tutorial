'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var frontnote = require('gulp-frontnote');
var uglify = require('gulp-uglify');
var browser = require('browser-sync');
var plumber = require("gulp-plumber");
var ejs = require("gulp-ejs");
// var fs = require('fs');
// var fs = require('gulp-fs');
var rename = require('gulp-rename');

gulp.task("server", function () {
  browser({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("default",['server'], function () {
  gulp.watch(["js/**/*.js", "!js/min/**/*.js"], ["js"]);
  gulp.watch("sass/**/*.scss", ["sass"]);
});

gulp.task("sass", function () {
  gulp.src("./sass/**/*scss")
    .pipe(plumber())
    .pipe(frontnote({
      css: '../css/test.css'
    }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest("./css"))
    .pipe(browser.reload({stream:true}))
});

gulp.task("js", function () {
  gulp.src(["js/**/*.js", "!js/min/**/*.js"])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest("./js/min"))
    .pipe(browser.reload({stream:true}))
});

gulp.task("ejs", function () {
  // var json = JSON.parse(fs.readFileSync('./var.json'));

  gulp.src(
    ["ejs/**/*.ejs",'!' + "ejs/**/_*.ejs"]
  )
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(ejs())
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest("./"))
});