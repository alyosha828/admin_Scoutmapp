var gulp = require('gulp');
const changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var minifyJS = require('gulp-minify')
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var del = require('del');
var deploy = false;
var deployDate = new Date().getTime();
var deploypath = `minify/deploy/`
var debugpath  = `minify/debug/`
gulp.task('css', function () {
  var cssname;
  var path;
  if (deploy){
    cssname = `vendermain_${deployDate}.min.css`;
    path = deploypath;
  }else{
    cssname = `vendermain.min.css`;
    path = debugpath;
  }
  gulp.src(['assets/css/style.css'])
    .pipe(concat(cssname))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path))
    .pipe(browserSync.reload({
      stream: true
    }));
});
gulp.task('menucss', function () {
  var cssname;
  var path;
  if (deploy) {
    cssname = `mobilemenu_${deployDate}.min.css`;
    path = deploypath;
  } else {
    cssname = `mobilemenu.min.css`;
    path = debugpath;
  }
  gulp.src(['assets/css/mobilemenu.css'])
    .pipe(concat(cssname))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('introjscss', function () {
  var cssname;
  var path;
  if (deploy) {
    cssname = `venderintrojs_${deployDate}.min.css`;
    path = deploypath;
  } else {
    cssname = `venderintrojs.min.css`;
    path = debugpath;
  }
  gulp.src(['assets/css/introjs.css'])
    .pipe(concat(cssname))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('introjs', function () {
  var introjsname, path;
  if (deploy) {
    introjsname = `venderintrojs_${deployDate}.min.js`;
    path = deploypath;
  } else {
    introjsname = `venderintrojs.min.js`;
    path = debugpath;
  }
  gulp.src('assets/introjs/*.js')
    .pipe(concat(introjsname))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(path))
    .pipe(browserSync.reload({
      stream: true
    }));
});
gulp.task('adminjs', function () {
  var adminjsname, path;
  if (deploy) {
    adminjsname = `venderadmin_${deployDate}.min.js`;
    path = deploypath;
  } else {
    adminjsname = `venderadmin.min.js`;
    path = debugpath;
  }
  gulp.src([
    'assets/adminjs/*.js',
    'assets/utilsjs/contactus.js'
  ])
    .pipe(concat(adminjsname))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(path))
    .pipe(browserSync.reload({
      stream: true
    }));
});
gulp.task('datafeedjs', function () {
  var datafeedjsname,path;
  if (deploy) {
    datafeedjsname = `venderbundle_${deployDate}.min.js`;
    path = deploypath;
  } else {
    datafeedjsname = `venderbundle.min.js`;
    path = debugpath;
  }
  gulp.src('assets/datafeedjs/*.js')
    .pipe(concat(datafeedjsname))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(path))
    .pipe(browserSync.reload({
      stream: true
    }));
});
gulp.task('authjs', function () {
  var authjsname, path;
  if (deploy) {
    authjsname = `venderauth_${deployDate}.min.js`;
    path = deploypath;
  } else {
    authjsname = `venderauth.min.js`;
    path = debugpath;
  }
  gulp.src([
    'assets/authjs/*.js',
    'assets/utilsjs/contactus.js'
  ])
    .pipe(concat(authjsname))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(path))
    .pipe(browserSync.reload({
      stream: true
    }));
});
gulp.task('mainjs', function () {  
  var mainjsname,path;
  if (deploy) {
    mainjsname = `vendermain_${deployDate}.min.js`;
    path = deploypath;
  } else {
    mainjsname = `vendermain.min.js`;
    path = debugpath;
  }
  gulp.src([
    'assets/utilsjs/global.js',
    'assets/utilsjs/chartutils.js',
    'assets/mainjs/main.js',
    'assets/mainjs/tab-order-book.js',
    'assets/mainjs/tab-order-chart.js',
    'assets/mainjs/tab-radar-radar.js',
    'assets/mainjs/tab-radar-active.js',
    'assets/utilsjs/contactus.js'
  ])
    .pipe(concat(mainjsname))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(path))
    .pipe(browserSync.reload({
      stream: true
    }));
});
gulp.task('mobilejs', function () {
  var mobilejsname, path;
  if (deploy) {
    mobilejsname = `vendermobile_${deployDate}.min.js`;
    path = deploypath;
  } else {
    mobilejsname = `vendermobile.min.js`;
    path = debugpath;;
  }
  gulp.src([
    'assets/utilsjs/global.js',
    'assets/utilsjs/chartutils.js',
    'assets/mobilejs/main.js',
    'assets/mobilejs/tab-radar-radar.js',
    'assets/mobilejs/tab-radar-active.js',
    'assets/mobilejs/tab-order-book.js',
    'assets/mobilejs/tab-order-chart.js',
    'assets/utilsjs/contactus.js'
  ])
    .pipe(concat(mobilejsname))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest(path))
    .pipe(browserSync.reload({
      stream: true
    }));
});
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
})
gulp.task('default', ['datafeedjs', 'css', 'introjscss', 'introjs' ,'menucss','adminjs', 'authjs', 'mainjs', 'mobilejs'], function () {
  gulp.watch('assets/css/style.css', ['css']);
  gulp.watch('assets/css/mobile_menu.css', ['menucss']);
  gulp.watch('assets/css/introjs/*.js', ['introjs']);
  gulp.watch('assets/authjs/*.js', ['authjs'])
  gulp.watch('assets/authjs/*.js', ['authjs'])
  gulp.watch('assets/adminjs/*.js', ['adminjs'])
  gulp.watch('assets/mainjs/*.js', ['mainjs'])
  gulp.watch('assets/mobilejs/*.js', ['mobilejs'])
  gulp.watch('assets/datafeedjs/*.js', ['datafeedjs'])
  gulp.watch('assets/utilsjs/*.js', ['mainjs', 'mobilejs', 'authjs', 'adminjs'])
});

