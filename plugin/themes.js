// themes.js | handles loading/reloading themes/styles

module.exports = App => {

  App.insert = function (file, folder) {
    let type = `ts_${ folder || "core" }`
    let link = $(`#${ type }`)
    let path = localPath(this.__base, file, folder)
    if (link.length) link.attr("href", path)
    else document.head.append( cssHTML(type, path) )
    if (path != "#") this.Ran(`inserted: ${ file }`)
  }

  App.inject = function (style) {
    let el = $("#ts_css")
    if (el.length) el[0].innerHTML = style
    else document.head.append( styleHTML(style) )
    if (style) this.Ran(`injected user css`)
  }

  // record theme on the body
  App.themed = function (theme) {
    this.bodyClass("th-none", !theme) 
    let last = $("body").data("theme")
    if (last) $("body").removeClass(`th-${ last }`)
    if (theme) $("body").addClass(`th-${ theme }`)
    $("body").data("theme", theme)
  }

  App.loadTheme = function (config) {
    $("#ts_core, #ts_themes, #ts_styles, #ts_css").remove()
    this.insert("turnStyles")
    this.insert(config.theme, "themes")
    this.insert(config.style, "styles")
    this.inject(config.u_css)
    this.themed(config.theme)
  }

  App.bindTheme = function () {
    this.Bind("update", function (key, val) {
      if (key == "theme") this.themed(val)
      if (key == "theme") this.insert(val, "themes")
      if (key == "style") this.insert(val, "styles")
      if (key == "u_css") this.inject(val)
    })
  }

}

const localPath = (base, file, folder) => {
  if (!file) return `#`
  let root = folder ? `/${ folder }` : ""
  let path = `/${ file }.css?v=${ Math.random() }`
  return `${ base }${ root }${ path }`
}

// create a link element
const cssHTML = (id, url) => {
  let el = document.createElement('link'); el.id = id; 
  el.type = "text/css"; el.rel = "stylesheet"; el.href = url;
  return el
}

// create our user style element
const styleHTML = style => {
  let el = document.createElement('style'); el.id = "ts_css";
  el.type = "text/css"; el.innerHTML = style;
  return el
}