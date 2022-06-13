// initial load of themed ui
const themeLoad = function (config) {
  // remove any leftovers
  $("#ts_core, #ts_style").remove()
  $("#ts_themes, #ts_colors").remove()
  // load current settings
  this.addSheet("turnStyles")
  this.addTheme(config.theme)
  this.addSheet(config.color, "colors")
  this.addStyle(config.style)
}

// updating the themed ui
const themeSave = function (key, val) {
  if (key == "style") this.addStyle(val)
  if (key == "theme") this.addTheme(val)
  if (key == "color") this.addSheet(val, "colors")
}

// handle adding a theme
const addTheme = function (theme) {
  this.bodyClass("th-none", !theme)
  // remove the last used theme
  let last = $("body").data("theme")
  if (last)  $("body").removeClass(`th-${ last }`)
  // add and record current theme
  if (theme) $("body").addClass(`th-${ theme }`)
  $("body").data("theme", theme)
  return this.addSheet(theme, "themes")
}

// injecting a stylesheet
const addSheet = function (file, folder) {
  let name = file ? `${ file }.css` : false
  let path = this.getLink(name, folder)
  let type = `ts_${ folder || "core "}`
  return this.insertSheet(path, type)
}

// injecting user css styles
const addStyle = function (style) {
  return this.injectStyle(style, "ts_style")
}

export default app => {
  app.on("data", themeLoad)
  app.on("save", themeSave)
  Object.assign(app, { addTheme, addSheet, addStyle })
}