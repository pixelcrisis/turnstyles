// define our paths
export const paths = {
  script: [ "./script/index.js", "./build" ],
  styles:  [ "./sass/index.sass", "./build" ],
  themes: [ "./sass/themes", "./build/themes" ],
  colors: [ "./sass/colors", "./build/colors" ],
  images: [ "./static/images/*", "./build/images" ],
  inject: [ "./static/inject.js", "./build" ],
  chrome: [ "./static/manifest2.json", "./build" ]
}

// define webpack conf
import path from "path"
import { env } from "process"
import { fileURLToPath } from "url"
const __url = fileURLToPath(import.meta.url)
const __dir = path.dirname(__url)
const build = path.resolve(__dir, "build")
const rules = {
  test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",
  options: { presets: [ "@babel/preset-env" ] }
}

// define our confs
export const confs = {
  webpack: {
    mode: process.env.NODE_ENV,
    entry: { main: paths.script[0] },
    output: { filename: "index.js", path: build },
    module: { rules: [ rules ] }
  }
}