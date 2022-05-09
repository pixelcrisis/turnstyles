// themes.js | handles loading/reloading themes/styles

module.exports = App => {

  // insert a stylesheet 
  App.addSheet = function (file, folder) {
    // only have one sheet per type
    let path = getLink(file, folder)
    let type = `ts_${ folder || "core" }`
    if (path != "#") {
      path = `${ this.base }/${ path }`
      this.Log(`[visual] insert: ${ file }`, path)
    }
    let curr = $(`#${ type }`)
    if (curr.length) curr.attr("href", path)
    else document.head.append( linkHTML(type, path) )
  }

  // inject style tag css
  App.addStyle = function (style) {
    let curr = $("#ts_css")[0]
    if (curr) curr.innerHTML = style
    else document.head.append( styleHTML(style) )
    if (style) this.Log(`[visual] user css injected`, style)
  }

  // record active theme
  App.addTheme = function (theme) {
    App.Body("th-none", !theme)
    // remove the last used theme if any
    let last = $("body").data("theme")
    if (last)  $("body").removeClass(`th-${ last }`)
    // record the current theme if any
    if (theme) $("body").addClass(`th-${ theme }`)
    $("body").data("theme", theme)
  }

  App.loadTheme = function (config) {
    // remove any leftovers
    $("#ts_core, #ts_css").remove()
    $("#ts_styles, #ts_themes").remove()
    // and add current settings
    this.addSheet("turnStyles")
    this.addSheet(config.theme, "themes")
    this.addSheet(config.style, "styles")
    this.addStyle(config.u_css)
    this.addTheme(config.theme)
  }

  App.bindTheme = function () {
    this.Bind("update", function (key, val) {
      if (key == "theme") this.addTheme(val)
      if (key == "theme") this.addSheet(val, "themes")
      if (key == "style") this.addSheet(val, "styles")
      if (key == "u_css") this.addStyle(val)
    })
  }

}

// get the path to a file
const getLink = (file, folder) => {
  if (!file) return `#`
  let root = folder ? `${ folder }/` : ""
  return `${ root }${ file }.css?v=${ Math.random() }`
}

// generate an id link element
const linkHTML = (id, path) => {
  let elem = document.createElement("link")
  elem.id = id
  elem.type = "text/css"
  elem.rel = "stylesheet"
  elem.href = path
  return elem
}

// create our user style element
const styleHTML = style => {
  let elem = document.createElement('style')
  elem.id = "ts_css"
  elem.type = "text/css"
  elem.innerHTML = style
  return elem
}