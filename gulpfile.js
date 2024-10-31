var gulp=require("gulp");
var sass=require("gulp-sass");
var autoprefixer=require("gulp-autoprefixer");

const stylesFunc=async function(){
    gulp.src("./scss/messages.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(gulp.dest("./src"));
}

gulp.task("styles", stylesFunc);

gulp.task("stylesWatch", function(){
    gulp.watch("./scss/", (stylesFunc));
});