import gulp from "gulp"
import * as b from "./gulpfile.build.js"
import { paths } from "./gulpfile.confs.js"

export const quick = () => b.script(...paths.script)

const sass1 = () => b.style(...paths.styles)
const sass2 = () => b.style(...paths.themes)
const sass3 = () => b.style(...paths.colors)

export const style = gulp.series(sass1, sass2, sass3)

const clean = () => b.remove("./build")
const copy1 = () => b.copy(...paths.images)
const copy2 = () => b.copy(...paths.inject)
const name1 = () => b.name(...paths.chrome, "manifest.json")
export const addon = gulp.series(clean, copy1, copy2, name1)

export const build = gulp.series(addon, quick, style)

export const serve = async () => {
  await gulp.run("build")
  gulp.watch( paths.script[0], gulp.series("quick") )
  gulp.watch( paths.styles[0], gulp.series("style") )
  gulp.watch( paths.themes[0], gulp.series("style") )
  gulp.watch( paths.colors[0], gulp.series("style") )
  gulp.watch( paths.images[0], gulp.series("addon") )
  gulp.watch( paths.inject[0], gulp.series("addon") )
  gulp.watch( paths.chrome[0], gulp.series("addon") )
}