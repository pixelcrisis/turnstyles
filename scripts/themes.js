// themes.js | handles loading/reloading themes/styles

module.exports = tS => {

  tS.loadThemes = function (config) {
    create(this.__base, 'turnStyles')
    
    this.updateThemes('theme', config.theme)
    this.updateThemes('style', config.style)
    inject(config.user_css)
  }

  tS.updateThemes = function (key, value) {
    if (key == 'theme') update(this.__base, value, 'themes')
    if (key == 'style') update(this.__base, value, 'styles')
    if (key == 'user_css') inject(value)
  }

  tS.on('loaded', tS.loadThemes)
  tS.on('update', tS.updateThemes)

}

const inject = style => {
  let css = document.createElement('style')
  css.classList.add('tScss')
  css.type = "text/css"
  css.innerHTML = style
  $('style.tScss').remove()
  document.head.append(css)
}

const locate = (base, file, folder) => {
  let path = folder ? `${base}/${folder}` : `${base}`
  return `${path}/${file}.css`
}

const create = (base, file, folder) => {
  let link = document.createElement('link')
  link.classList.add(`tS-${folder || 'core'}`)
  link.type = 'text/css'; link.rel = 'stylesheet'
  link.href = locate(base, file, folder)
  document.head.append(link)
}

const update = (base, file, folder) => {
  let curr = $(`link.tS-${folder}`)
  // delete any current stylsheet if set to none
  if (!file) return curr.length ? curr.remove() : false
  // otherwise create or update the new stylesheet
  if (!curr.length) create(base, file, folder)
  else curr.attr('href', locate(base, file, folder))
}