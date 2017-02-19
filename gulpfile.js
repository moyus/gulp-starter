const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()

/**
 * SCSS编译任务
 */
gulp.task('scss', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 8
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      "browsers": ["last 2 versions", "> 2%"]
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
})

/**
 * ES6编译任务
 */
gulp.task('js', function () {
  return gulp.src([
      'src/js/utils.js',
      'src/js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/js"))
})

/**
 * 静态资源复制任务
 */
gulp.task('copy', function () {
  return gulp.src('./src/static/**/*')
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.reload())
})

/**
 * 自动监听任务
 */
gulp.task('watch', function (done) {
  gulp.watch(['./src/scss/**/*.scss'], gulp.series('scss'))
  gulp.watch(['./src/js/**/*.js'], gulp.series('js'))
  gulp.watch(['./src/static/**/*'], gulp.series('copy'))
  done()
})

/**
 * 本地调试服务器
 */
gulp.task('server', function (done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
  done()
})

/**
 * 默认任务
 */
gulp.task('default', gulp.series(gulp.parallel('scss', 'js'), 'server', 'watch'))
