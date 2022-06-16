const tools = {
  addTheme (theme) { // add a theme
    this.bodyClass("th-none", !theme)
    // remove last used theme
    let last = $("body").data("theme")
    if (last)  $("body").removeClass(`th-${ last }`)
    // record the current theme
    if (theme) $("body").addClass(`th-${ theme }`)
    $("body").data("theme", theme)
    this.addSheet(theme, "themes")
  },

  addSheet (file, folder) { // add stylesheets
    let name = file ? `${ file }.css` : false
    let path = this.getLink(name, folder)
    let type = `ts_${ folder || "core" }`
    this.insertSheet(path, type)
  },

  addStyle (style) {
    this.injectStyle(style, "ts_style")
  }
}

const events = {
  data: function loadTheme (config) {
    $(themed).remove() // remove any leftovers
    // and load our current settings
    this.addSheet("turnStyles")
    this.addTheme(config.theme)
    this.addSheet(config.color, "colors")
    this.addStyle(config.style)
  },

  save: function saveTheme (key, val) {
    if (key == "style") this.addStyle(val)
    if (key == "theme") this.addTheme(val)
    if (key == "color") this.addSheet(val, "colors")
  }
}

const themed = "#ts_core, #ts_themes, #ts_colors, #ts_style"

export default { tools, events }