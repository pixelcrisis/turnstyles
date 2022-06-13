import gulp from "gulp"
import * as b from "./gulpfile.build.js"
import { paths, files } from "./gulpfile.confs.js"

export { style, quick, build, basic, serve }

const sass1 = () => b.style(files.styles, "./build")
const sass2 = () => b.style(paths.themes, "./build/themes")
const sass3 = () => b.style(paths.colors, "./build/colors")
const style = gulp.series(sass1, sass2, sass3)

const reset = () => b.rem("./build")
const copy1 = () => b.copy(files.inject, "./build")
const copy2 = () => b.copy(paths.images, "./build/images")
const name1 = () => b.name(files.chrome, "./build", "manifest.json")
const clean = gulp.series(reset, copy1, copy2, name1)

const quick = () => b.script(files.script, "./build")
const build = gulp.series(clean, quick, style)

const watch = () => {
  gulp.watch( paths.script, gulp.series(quick) )
  gulp.watch( paths.parent, gulp.series(quick) )
  gulp.watch( paths.styles, gulp.series(style) )
  gulp.watch( files.chrome, gulp.series(name1) )
  gulp.watch( files.inject, gulp.series(copy1) )
  gulp.watch( paths.images, gulp.series(copy2) )
}

const merge = () => {
  gulp.watch( paths.script, gulp.series(quick) )
  gulp.watch( paths.parent, gulp.series(quick) )
  gulp.watch( files.chrome, gulp.series(name1) )
  gulp.watch( files.inject, gulp.series(copy1) )
  gulp.watch( paths.images, gulp.series(copy2) )
}

const basic = gulp.series(quick, merge)
const serve = gulp.series(build, watch)