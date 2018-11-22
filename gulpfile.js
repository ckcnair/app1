var gulp            = require('gulp');
var deploy          = require('gulp-gh-pages');
var browseSync      = require('browser-sync').create();
var sass            = require('gulp-sass');

//diploying application to github directly
gulp.task('deploy', function () {
    return gulp.src("./src/**/*")
      .pipe(deploy({ 
        remoteUrl: "https://github.com/ckcnair/app1",
        branch: "master"
      }))
  });



//Compile sass into css and auto inject it into browsers.
gulp.task('sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])     
      .pipe(sass())
      .pipe(gulp.dest('src/css'))
      .pipe(browseSync.stream());
})

//Move the javascript files into src/js folder
gulp.task('js', function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
      .pipe(gulp.dest('src/js'))
      .pipe(browseSync.stream());
});

//Static server + watching html/scss
gulp.task('serve',['sass'], function(){
    browseSync.init({
        server: './src'
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'],['sass']);
    gulp.watch('src/*.html').on ('change', browseSync.reload);
});

gulp.task('default',['js','serve']);
