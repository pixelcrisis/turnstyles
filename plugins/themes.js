// themes.js | handles loading/reloading themes/styles

module.exports = tS => {

  tS.prototype.loadThemes = function () {
    // check if we've imported our core
    let core = $(`link.tS-core`).length
    if (!core) linkCSS('turnStyles')
    // load the user selected options
    refresh(this.config.theme, 'themes')
    refresh(this.config.style, 'styles')
    this.log(`refreshed themes`)
  }

  // convert a local path to a URL
  const locate = function (file, folder) {
    let base = window.tsBase || 'https://ts.pixelcrisis.co/src'
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