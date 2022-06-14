import path from "path"
import { fileURLToPath } from "url"

export { files, paths, confs }

const files = { // our build paths
  script: "./script/turnStyles.js",
  styles: "./sass/turnStyles.sass",
  inject: "./static/inject.js",
  chrome: "./static/manifest2.json"
}

const paths = { // our watch paths
  script: "./script/**/*.js*",
  styles: "./sass/**/*.sass",
  themes: "./sass/themes/*.sass",
  colors: "./sass/colors/*.sass",
  images: "./static/images/*",
  parent: "../tt-browser-api/**/*.js"
}

// webpack conf
const __url = fileURLToPath(import.meta.url)
const __dir = path.resolve(path.dirname(__url), "build")
const confs = {
  webpack: {
    mode: process.env.NODE_ENV,
    entry: { main: files.script },
    output: { filename: "turnStyles.js", path: __dir },
    module: { rules: [ {
      test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",
      options: { presets: [ "@babel/preset-env" ] } } ] 
    }
  }
}