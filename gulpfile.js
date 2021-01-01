'use strict';

const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const fileinclude = require('gulp-ex-file-include');
const terser = require('gulp-terser');
const webpack = require('webpack-stream');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const mode = require('gulp-mode')();
const htmlbeautify = require('gulp-html-beautify');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const basePath = require('path');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const uglify = require('gulp-uglify-es').default;
const imagemin = require("gulp-imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminZopfli = require("imagemin-zopfli");
const imageminMozjpeg = require("imagemin-mozjpeg");
const webp = require("gulp-webp");
const imageminWebp = require("imagemin-webp");

let way = {
    build: {
        html: './build/',
        js: './build/js/',
        css: './build/css/',
        img: './build/img/',
        fonts: './build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        styles: 'src/styles/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/*.html',
        html_template: 'src/template/*.html',
        js: 'src/js/*.js',
        styles: 'src/styles/*.scss',
        styles_blocks: 'src/styles/bocks/*.scss',
        styles_common: 'src/styles/common/*.scss',
        styles_lib: 'src/styles/lib/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

// css task
const css = () => {
    return src('src/styles/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename('styles.css'))
        .pipe(csso())
        .pipe(dest('./build/css'))
        .pipe(mode.development(browserSync.stream()));
}

// js task
const js = () => {
    return src('./src/js/scripts.js')
        .pipe(uglify())
        .pipe(dest('./build/js'))
        .pipe(mode.development(browserSync.stream()));
}

const jsVendors = () => {
    return src([
        './src/js/lib/svgxuse.min.js'
    ])
        .pipe(concat('libs.js'))
        .pipe(dest('./build/js'));
}

// copy tasks
const copyImages = () => {
    return src('./src/img/**/*.{jpg,jpeg,png,svg}')
        .pipe(imagemin([
            imageminPngquant({
                speed: 5,
                quality: [0.6, 0.8]
            }),
            imageminZopfli({
                more: true
            }),
            imageminMozjpeg({
                progressive: true,
                quality: 90
            }),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {removeUnusedNS: false},
                    {removeUselessStrokeAndFill: false},
                    {cleanupIDs: false},
                    {removeComments: true},
                    {removeEmptyAttrs: true},
                    {removeEmptyText: true},
                    {collapseGroups: true}
                ]
            })
        ]))
        .pipe(dest('./build/img'));
}


const webpTask = () => {
    return src('./src/img/**/*.{jpg,jpeg,png}')
        .pipe(webp(imageminWebp({
            lossless: true,
            quality: 6,
            alphaQuality: 85
        })))
        .pipe(dest('./build/img'));
}

const copyFonts = () => {
    return src('src/fonts/**/*.{woff,woff2}')
        .pipe(dest('./build/fonts'));
}

const copyFavicon = () => {
    return src('src/favicon/*.*')
        .pipe(dest('./build/favicon'));
}

const html = () => {
    return src('src/view/*.html')
        .pipe(fileinclude())
        .pipe(mode.production(htmlbeautify()))
        .pipe(dest('./build'))
        .pipe(mode.development(browserSync.stream()));
}

const svgStore = () => {
    return src('./src/img/sprite/*.svg')
        .pipe(svgmin(function (file) {
            let prefix = basePath.basename(file.relative, basePath.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(dest('./build/img'));
}

// watch task
const watchForChanges = () => {
    browserSync.init({
        server: {
            baseDir: './build/'
        },
        notify: false,
        port: 7384
    });

    watch('src/styles/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('src/view/*.html', html);
    watch('src/img/**/*.{png,jpg,jpeg,svg}', series(copyImages));
    watch('src/fonts/**/*.{woff,woff2}', series(copyFonts));
    watch('src/favicon/*.*', series(copyFavicon));
}

// public tasks
exports.default = series(parallel(css, js, jsVendors, copyImages, copyFonts, html, copyFavicon), watchForChanges);
exports.build = series(parallel(css, js, jsVendors, copyImages, copyFonts, html, copyFavicon));
exports.sprite = series(svgStore);
exports.webpTask = series(webpTask);

/*

let config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "frontend"
};

gulp.task('svgstore', function () {
    return gulp
        .src('./src/sprite/!*.svg')
        .pipe(svgmin(function (file) {
            let prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('./build/img'));
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(way.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(way.src.html)
        .pipe(includer())
        .pipe(gulp.dest(way.build.html))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('js:build', function () {
    gulp.src(way.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(way.build.js))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('styles:build', function () {
    gulp.src(way.src.styles)
        .pipe(sass({
            includePaths: ['src/styles/'],
            errLogToConsole: true
        }))
        .pipe(prefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(way.build.css))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('image:build', function () {
    gulp.src(way.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(way.build.img))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('fonts:build', function () {
    gulp.src(way.src.fonts)
        .pipe(gulp.dest(way.build.fonts))
});

gulp.task('./build', [
    'html:build',
    'js:build',
    'styles:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function () {
    watch([way.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([way.watch.html_template], function (event, cb) {
        gulp.start('html:build');
    });
    watch([way.watch.styles], function (event, cb) {
        gulp.start('styles:build');
    });
    watch([way.watch.styles_common], function (event, cb) {
        gulp.start('styles:build');
    });
    watch([way.watch.styles_blocks], function (event, cb) {
        gulp.start('styles:build');
    });
    watch([way.watch.styles_lib], function (event, cb) {
        gulp.start('styles:build');
    });
    watch([way.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    watch([way.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
    watch([way.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['./build', 'webserver', 'watch']);
*/
