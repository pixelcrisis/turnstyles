// themes.js | handles loading/reloading themes/styles

module.exports = App => {

  App.loadThemes = function (config) {
    $("#ts_core, #ts_themes, #ts_styles, #ts_css").remove()
    
    this.insert("turnStyles")
    this.insert(config.theme, "themes")
    this.insert(config.style, "styles")
    this.inject(config.u_css)
    this.themed(config.theme)
  }

  App.updateThemes = function (key, val) {
    if (key == "theme") this.themed(val)
    if (key == "theme") this.insert(val, "themes")
    if (key == "style") this.insert(val, "styles")
    if (key == "u_css") this.inject(val)
  }

  App.insert = function (file, folder) {
    let base = `${ this.__base }${ folder ? `/${ folder }` : "" }`
    let path = file ? `${ base }/${ file }.css?v=${ Math.random() }` : "#"

    let id = `ts_${ folder || "core" }`
    let el = $(`#${ id }`)
    if (!el.length) document.head.append(link(id, path))
    else el.attr("href", path)

    if (path != "#") this.Log(`inserted: ${ path.split("?v")[0] }`)
  }

  App.inject = function (style) {
    let el = $("#ts_css")
    if (el.length) el[0].innerHTML = style
    else document.head.append(css(style))
    if (style) this.Log(`injected: ${ style }`)
  }

  App.themed = function (theme) {
    this.classes("th-none", !theme) 
    let last = $("body").data("theme")
    if (last) $("body").removeClass(`th-${ last }`)
    if (theme) $("body").addClass(`th-${ theme }`)
    $("body").data("theme", theme)
  }

  App.on("update", App.updateThemes)

}

// create a link element
const link = (id, url) => {
  let el = document.createElement('link'); el.id = id; 
  el.type = "text/css"; el.rel = "stylesheet"; el.href = url;
  return el
}

// create our user style element
const css = style => {
  let el = document.createElement('style'); el.id = "ts_css";
  el.type = "text/css"; el.innerHTML = style;
  return el
}