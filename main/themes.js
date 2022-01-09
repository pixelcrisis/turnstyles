// themes.js | handles loading/reloading themes/styles

module.exports = app => {

  app.loadThemes = function (config) {
    // remove them in case we're reloading
    $('#ts_core, #ts_themes, #ts_styles, #ts_css').remove()

    this.insert('turnStyles')
    this.insert(config.theme, 'themes')
    this.insert(config.style, 'styles')
    this.inject(config.u_css)
    this.themed(config.theme)

    this._class('logger', config.logger)
    this._class('no_bub', !config.bubble)
    this._class('no_vid', !config.player)
    this._class('no_aud', !config.people)

    this._class('hb-is_afk', !config.hotbar.is_afk)
    this._class('hb-auto_b', !config.hotbar.auto_b)
    this._class('hb-auto_q', !config.hotbar.auto_q)
    this._class('hb-nextdj', !config.hotbar.nextdj)
    this._class('hb-bubble', !config.hotbar.bubble)
    this._class('hb-people', !config.hotbar.people)
    this._class('hb-player', !config.hotbar.player)
    this._class('hb-qtbtn1', !config.hotbar.qtbtn1)
    this._class('hb-qtbtn2', !config.hotbar.qtbtn2)
    this._class('hb-qtbtn3', !config.hotbar.qtbtn3)
  }

  app.updateThemes = function (key, val, grp) {
    if (key == 'theme') this.themed(val)
    if (key == 'theme') this.insert(val, 'themes')
    if (key == 'style') this.insert(val, 'styles')
    if (key == 'u_css') this.inject(val)
      
    if (key == 'bubble') this._class('no_bub', !val)
    if (key == 'player') this._class('no_vid', !val)
    if (key == 'people') this._class('no_aud', !val)
    if (key == 'logger') this._class('logger', val)

    if (grp == "hotbar") {
      if (key == "is_afk") this._class('hb-is_afk', !val)
      if (key == "auto_b") this._class('hb-auto_b', !val)
      if (key == "auto_q") this._class('hb-auto_q', !val)
      if (key == "nextdj") this._class('hb-nextdj', !val)
      if (key == "bubble") this._class('hb-bubble', !val)
      if (key == "people") this._class('hb-people', !val)
      if (key == "player") this._class('hb-player', !val)
      if (key == "qtbtn1") this._class('hb-qtbtn1', !val)
      if (key == "qtbtn2") this._class('hb-qtbtn2', !val)
      if (key == "qtbtn3") this._class('hb-qtbtn3', !val)
    }

    if (grp == "hotbar" || grp == "qtbtns") {
      this.drawHotBar()
    }
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