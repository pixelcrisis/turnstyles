module.exports = TS => {

  TS.$on("loaded", function loadTheme (config) {
    // remove any leftovers
    $("#ts_core, #ts_style").remove()
    $("#ts_themes, #ts_colors").remove()
    // add our current settings
    this.addSheet("turnStyles")
    this.addTheme(config.theme)
    this.addSheet(config.color, "colors")
    this.addStyle(config.style)
  })

  TS.$on("update", function updateTheme (key, val) {
    if (key == "theme") this.addTheme(val)
    if (key == "color") this.addSheet(val, "colors")
    if (key == "style") this.addStyle(val)
  })

  TS.addTheme = function (theme) {
    // toggle the no theme class
    this.$body("th-none", !theme)
    // remove the last used theme
    let last = $("body").data("theme")
    if (last)  $("body").removeClass(`th-${ last }`)
    // record and add the current theme
    $("body").data("theme", theme)
    if (theme) $("body").addClass(`th-${ theme }`)
    this.addSheet(theme, "themes")
  }

  TS.addSheet = function (file, folder) {
    // insert a stylesheet with TBA
    let name = file ? `${ file }.css` : false
    let path = this.getLink(name, folder)
    let type = `ts_${ folder || "core" }`
    this.$sheet(path, type)
  }

  TS.addStyle = function (style) {
    // inject our style tag CSS
    this.$style(style, "ts_style")
  }

}