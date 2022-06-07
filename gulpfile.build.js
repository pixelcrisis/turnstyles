// grab our imports
import del from "del"
import gulp from "gulp"
import gulpif from "gulp-if"
import rename from "gulp-rename"
import gulpSass from "gulp-sass"
import nodeSass from "node-sass"
import uglify from "gulp-uglify"
import webpack from "webpack-stream"
import sourcemaps from "gulp-sourcemaps"
import autoprefixer from "gulp-autoprefixer"

const sass = gulpSass(nodeSass)
const prod = process.env.NODE_ENV == "production"
import { confs } from "./gulpfile.confs.js"

// define our script processor
export const script = (src, dest) => gulp.src(src)
  .pipe( webpack(confs.webpack) )
  .pipe( gulpif(prod, uglify()) )
  .pipe( gulp.dest(dest) )

// define our sass processor
export const style = (src, dest) => gulp.src(src)
  .pipe( gulpif(!prod, sourcemaps.init()) )
  .pipe( sass() )
  .pipe( autoprefixer() )
  .pipe( gulpif(!prod, sourcemaps.write('.')) )
  .pipe( gulp.dest(dest) )

// simple copy task
export const copy = (src, dest) => gulp.src(src)
  .pipe( gulp.dest(dest) )

// simple rename task
export const name = (src, dest, name) => gulp.src(src)
  .pipe( rename(name) )
  .pipe( gulp.dest(dest) )

// simple remove task
export const remove = path => del(path)