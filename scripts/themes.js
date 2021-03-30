// themes.js | handles loading/reloading themes/styles

module.exports = tS => {

  tS.prototype.loadThemes = function () {
    // check if we've imported our core
    let core = $(`link.tS-core`).length
    if (!core) this.createLink('turnStyles')
    // load the user selected options
    this.refreshURL(this.config.theme, 'themes')
    this.refreshURL(this.config.style, 'styles')
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
  tS.prototype.locatePath = function (file, folder) {
    let path = folder ? `${this.__base}/${folder}` : `${this.__base}`
    return `${path}/${file}.css`
  }

  tS.prototype.refreshURL = function (file, folder) {
    let name = folder || 'core'
    let curr = $(`link.tS-${name}`)
    // remove if we're loading nothing
    if (!file) return curr.length ? curr.remove() : false
    // either build or update our link      
    if (!curr.length) this.createLink(file, folder)
    else curr.attr("href", this.locatePath(file, folder))
  }

  tS.prototype.createLink = function (file, folder) {
    let name = folder || 'core'
    let link = document.createElement('link')
    link.classList.add(`tS-${name}`)
    link.rel  = "stylesheet"
    link.type = "text/css"
    link.href = this.locatePath(file, folder)
    document.head.append(link)
  }

}