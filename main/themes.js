// themes.js | handles loading/reloading themes/styles

module.exports = app => {

  app.loadThemes = function (config) {
    // remove them in case we're reloading
    $('#ts_core, #ts_themes, #ts_styles, #ts_css').remove()

    this.insert('turnStyles')
    this.insert(config.theme, 'themes')
    this.insert(config.style, 'styles')
    this.inject(config.user_css)
    this.themed(config.theme)

    this._class('no_bub', config.no_bub)
    this._class('no_vid', config.no_vid)
    this._class('no_aud', config.no_aud)
    this._class('logging', config.logging)
  }

  app.updateThemes = function (key, val) {
    if (key == 'theme') this.themed(val)
    if (key == 'theme') this.insert(val, 'themes')
    if (key == 'style') this.insert(val, 'styles')
    if (key == 'user_css') this.inject(val)
      
    if (key == 'no_bub') this._class('no_bub', val)
    if (key == 'no_vid') this._class('no_vid', val)
    if (key == 'no_aud') this._class('no_aud', val)
    if (key == 'logging') this._class('logging', val)
  }

  // inject css styles into the DOM
  app.inject = function (style) {
    let el = $('#ts_css')
    if (el.length) el[0].innerHTML = style
    else document.head.append(this._css(style))
    if (style) this.Log(`injected: ${style}`)
  }

  // insert or update link to our CSS files
  app.insert = function (file, folder) {
    let id = `ts_${ folder || 'core' }`
    let el = $(`#${ id }`)

    // piece together our base URL using folder
    let base = `${this.__base}${ folder ? `/${folder}` : ''}`
    let path = file ? `${base}/${file}.css?v=${Math.random()}` : '#'
    // create the link if it doesn't exist
    if (!el.length) document.head.append(this._link(id, path))
    else el.attr('href', path)

    if (path != "#") this.Log(`inserted: ${path.split('?v')[0]}`)
  }

  // record active theme on the body element
  app.themed = function (theme) {
    this._class('th-none', !theme)
    let last = $('body').data('theme')
    if (last) $('body').removeClass(`th-${last}`)
    if (theme) $('body').addClass(`th-${theme}`)
    $('body').data('theme', theme)
  }

  app.on('loaded', app.loadThemes)
  app.on('update', app.updateThemes)

}