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
import { confs } from "./gulpfile.confs.js"

const sass = gulpSass(nodeSass)
const prod = process.env.NODE_ENV == "production"

export { script, style, copy, name, rem }

// script processor
const script = (src, dest) => gulp.src(src)
  .pipe( webpack(confs.webpack) )
  .pipe( gulpif(prod, uglify()) )
  .pipe( gulp.dest(dest) )

// sass processor
const style = (src, dest) => gulp.src(src)
  .pipe( gulpif(!prod, sourcemaps.init()) )
  .pipe( sass() )
  .pipe( autoprefixer() )
  .pipe( gulpif(!prod, sourcemaps.write('.')) )
  .pipe( gulp.dest(dest) )

// copy task
const copy = (src, dest) => gulp.src(src)
  .pipe( gulp.dest(dest) )

// rename task
const name = (src, dest, name) => gulp.src(src)
  .pipe( rename(name) )
  .pipe( gulp.dest(dest) )

// remove task
const rem = path => del(path)