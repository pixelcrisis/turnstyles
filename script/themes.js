// themes.js | handles loading/reloading themes/styles

module.exports = tS => {

  // apply all core and selected at startup
  tS.on('loaded', function loadThemes (config) {
    $('link.tS-core').remove()
    create(this.__base, 'turnStyles')
    

    $('link.tS-themes').remove()
    create(this.__base, config.theme, 'themes')


    $('link.tS-styles').remove()
    create(this.__base, config.style, 'styles')

    inject(config.user_css)
  })

  // refresh theme/style/css on save
  tS.on('update', function updateThemes (key, val) {
    if (key == 'theme') update(this.__base, val, 'themes')
    if (key == 'style') update(this.__base, val, 'styles')
    if (key == 'user_css') inject(val)
  })

}

// inject custom css into the DOM
const inject = function injstCoreStyles (style) {
  let css = document.createElement('style')
  css.classList.add('tScss')
  css.type = "text/css"
  css.innerHTML = style
  $('style.tScss').remove()
  document.head.append(css)
}

// locate a path, this is necessary for extension/bookmarklet
const locate = function locateCSSPath (base, file, folder) {
  let path = folder ? `${base}/${folder}` : `${base}`
  return `${path}/${file}.css`
}

// create a link to a theme or a style
const create = function createLinkElem (base, file, folder) {
  let link = document.createElement('link')
  link.classList.add(`tS-${folder || 'core'}`)
  link.type = 'text/css'; link.rel = 'stylesheet'
  link.href = locate(base, file, folder)
  document.head.append(link)
}

// update a link to a theme or a style, create if none
const update = function updateLinkElem (base, file, folder) {
  let curr = $(`link.tS-${folder}`)
  // delete any current stylsheet if set to none
  if (!file) return curr.length ? curr.remove() : false
  // otherwise create or update the new stylesheet
  if (!curr.length) create(base, file, folder)
  else curr.attr('href', locate(base, file, folder))
}