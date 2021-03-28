// themes.js | handles loading/reloading themes/styles

module.exports = tS => {

  tS.prototype.loadThemes = function () {
    // check if we've imported our core
    let core = $(`link.tS-core`).length
    if (!core) linkCSS('turnStyles')
    // load the user selected options
    refresh(this.config.theme, 'themes')
    refresh(this.config.style, 'styles')
    // hide the upload if theme applied
    this.hideUpload()
    this.log(`refreshed themes`)
  }

  tS.prototype.hideUpload = function () {
    let curr = $('#ts_upload')
    if (this.config.theme && !curr.length) {
      $('#upload-button').after(`<div id="ts_upload"></div>`)
      $('#ts_upload').on('click', this.fakeUpload.bind(this))
    }
    else if (!this.config.theme && curr.length) curr.remove()
  }

  tS.prototype.fakeUpload = function () {
    $("#queue-header").removeClass("normal").addClass("edit")
    let playlist = this.core.playlist
    playlist.isFiltering && playlist.clearSearchBar()
    playlist.queue.batchEditMode()
  }

  // convert a local path to a URL
  const locate = function (file, folder) {
    let base = window.tsBase || 'https://ts.pixelcrisis.co/dist'
    let path = folder ? `${base}/${folder}` : `${base}`
    return `${path}/${file}.css`
  }

  const refresh = function (file, folder) {
    let name = folder || 'core'
    let curr = $(`link.tS-${name}`)
    // remove if we're loading nothing
    if (!file) return curr.length ? curr.remove() : false
    // either build or update our link      
    if (!curr.length) linkCSS(file, folder)
    else curr.attr("href", locate(file, folder))
  }

  const linkCSS = function (file, folder) {
    let name = folder || 'core'
    let link = document.createElement('link')
    link.classList.add(`tS-${name}`)
    link.rel  = "stylesheet"
    link.type = "text/css"
    link.href = locate(file, folder)
    document.head.append(link)
  }

}