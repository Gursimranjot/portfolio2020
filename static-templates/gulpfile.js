// Requires
var gulp = require('gulp'),
    fs = require('fs'),
    glob = require('glob'),
    path = require('path'),
    data = require('gulp-data'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    rm = require('gulp-rm'),
    twig = require('gulp-twig'),
    notify = require('gulp-notify'),
    foreach = require('gulp-foreach'),
    browserSync = require('browser-sync');

var onError = function (err) {
    notify.onError({
        title: "Gulp error in " + err.plugin,
        message: err.toString()
    })(err);
    this.emit('end');
};


var paths = {
    sass: './src/sass/',
    css: './app/css/',
};

// gulp.task('fontsGen', function() {
//   return  gulp.src('src/assets/fonts/*.{ttf,otf}')
//     .pipe(fontgen({
//       dest: 'app/assets/fonts/'
//     }));
// });
// gulp.task('default', ['fontgen']);



gulp.task('copyPaste', function () {
    gulp.src('src/assets/video/**/*')
        .pipe(gulp.dest('app/assets/images'));
});

//Todo: use symlink   for copy static files as symlink   will no need to watch them
gulp.task('images', function () {
    gulp.src('src/assets/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ], {
            // verbose: true
        }))
        .pipe(gulp.dest('app/assets/images'))
});
gulp.task('images-watch', ['images'], browserSync.reload);

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: 'app/',
            browser: ["chrome.exe"], // ["google chrome"]
        }
    })
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* SASS */
gulp.task('sass', function () {
    gulp.src([
        // 'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/swiper/dist/css/swiper.css',
        'src/sass/libs/*',
        'src/sass/all.scss'
    ])
        .pipe(sourcemaps.init())
        .pipe(sass({
            //  refer to:   http://inchoo.net/dev-talk/tools/sass-output-styles/

            // outputStyle: 'compressed'
            // outputStyle: 'nested'
            // outputStyle: 'expanded'
            includePaths: [paths.sass + ''],
            outputStyle: 'compact'

        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('all.min.css'))
        //   .pipe(sourcemaps.init())
        // .pipe(cleancss())
        //   .pipe(sourcemaps.write(''))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
});


/* Twig Templates */
function getJsonData(file, cb) {
    glob("src/data/*.json", {}, function (err, files) {
        var data = {};
        if (files.length) {
            files.forEach(function (fPath) {
                var baseName = path.basename(fPath, '.json');
                data[baseName] = JSON.parse(fs.readFileSync(fPath));
            });
        }
        cb(undefined, data);
    });
}


gulp.task('twig', function () {

    gulp.src('app/*.html', { read: false })
        .pipe(rm());

    return gulp.src('src/templates/urls/**/*')
        .pipe(plumber({
            errorHandler: onError
        }))
        // .pipe(data(getJsonData))
        .pipe(foreach(function (stream, file) {
            return stream
                .pipe(twig({
                    data: {
                        img: 'assets/images'
                    }
                }))
        }))
        .pipe(gulp.dest('app/'));

});
gulp.task('twig-watch', ['twig'], browserSync.reload);

/* Scripts */
gulp.task('scripts', function () {
    return gulp.src([
        // 'node_modules/jquery/dist/jquery.min.js',
        'node_modules/swiper/dist/js/swiper.min.js',
        'node_modules/gsap/src/minified/TweenMax.min.js',
        'src/assets/scripts/libs/*.js',
        'src/assets/scripts/component/*.js',
        'src/assets/scripts/js/custom.js',
        'src/assets/scripts/js/swipercustom.js',
        'src/assets/scripts/js/*.js'
    ])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('all.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});
gulp.task('scripts-watch', ['scripts'], browserSync.reload);


/* Mulch */
gulp.task('mulch-compile', ['images', 'copyPaste', 'sass', 'scripts', 'twig']);


gulp.task('mulch', ['mulch-compile', 'browser-sync'], function () {
    // gulp.watch('src/assets/fonts/*.{ttf,woff,eof,svg,otf}', ['copyfonts']);
    gulp.watch('src/images/**/*', ['images-watch']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch("src/assets/scripts/**/*.js", ['scripts-watch']);
    gulp.watch(['src/templates/**/*'], ['twig-watch']);
});