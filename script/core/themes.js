// themes.js | handles loading/reloading themes/styles

module.exports = app => {

  // apply all core and selected styles on load
  app.on('loaded', function loadThemes (config) {
    // remove them first just in case we're reloading
    $('#ts_core').remove()
    $('#ts_themes').remove()
    $('#ts_styles').remove()
    $('#ts_css').remove()

    this.insert('turnStyles')
    this.insert(config.theme, 'themes')
    this.insert(config.style, 'styles')
    this.inject(config.user_css)

    // update our hidden elements
    this.classes('no_bub', config.no_bub)
    this.classes('no_vid', config.no_vid)
    this.classes('no_aud', config.no_aud)
  })

  // update link/css elements
  app.on('update', function updateThemes (key, val) {
    if (key == 'theme') this.insert(val, 'themes')
    if (key == 'style') this.insert(val, 'styles')
    if (key == 'user_css') this.inject(val)
      
    if (key == 'no_bub') this.classes('no_bub', val)
    if (key == 'no_vid') this.classes('no_vid', val)
    if (key == 'no_aud') this.classes('no_aud', val)
  })

  // insert or update link to our CSS files
  app.insert = function (file, folder) {
    let id = `ts_${ folder || 'core' }`
    let el = $(`#${ id }`)

    // piece together our base URL using folder
    let base = `${this.__base}${ folder ? `/${folder}` : ''}`
    // null the URL if the option is nothing
    let path = file ? `${base}/${file}.css` : '#'
    // create the link if it doesn't exist
    if (!el.length) document.head.append(Link(id, path))
    // otherwise we update the href
    else el.attr('href', path)
    if (path != "#") this.Log(`inserted: ${path}`)

    // update the body class
    if (folder == 'themes') {
      this.classes('th-none', !file)
      // remove the last theme class
      let last = $('body').data('theme')
      if (last) $('body').removeClass(`th-${last}`)
      // record the new theme and add the class
      if (file) {
        $('body').data('theme', file)
        $('body').addClass(`th-${file}`)
      } 
    }
  }

  // inject css styles into the DOM
  app.inject = function (style) {
    let el = $('#ts_css')
    if (el.length) el[0].innerHTML = style
    else document.head.append(CSS(style))
    if (style) this.Log(`injected: ${style}`)
  }

}

// create a link element
const Link = (id, url) => {
  let el = document.createElement('link')
  el.id = id
  el.type = "text/css"
  el.rel = "stylesheet"
  el.href = url
  return el
}

// create our user style element
const CSS = style => {
  let el = document.createElement('style')
  el.id = "ts_css"
  el.type = "text/css"
  el.innerHTML = style
  return el
}