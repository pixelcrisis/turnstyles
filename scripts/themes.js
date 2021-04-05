// themes.js | handles loading/reloading themes/styles

module.exports = tS => {

  tS.loadThemes = function (config) {
    create(this.__base, 'turnStyles')
    
    this.updateThemes('theme', config.theme)
    this.updateThemes('style', config.style)
    
    // replace upload with organize
    $('#upload-button').after(`<div id="ts_upload"></div>`)
    $('#ts_upload').on('click', () => {
      let playlist = window.turntable.playlist
      if (playlist.isFiltering) playlist.clearSearchBar()
      $("#queue-header").removeClass("normal").addClass("edit")
      playlist.queue.batchEditMode()
    })
  }

  tS.updateThemes = function (key, value) {
    if (key == 'theme') update(this.__base, value, 'themes')
    if (key == 'style') update(this.__base, value, 'styles')
  }

  tS.on('loaded', tS.loadThemes)
  tS.on('update', tS.updateThemes)

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