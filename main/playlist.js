// playlist.js | modifying the playlist

module.exports = app => {

  // bind and manage our playlist features
  app.watchPlaylist = function () {
    this.countPlaylist()
    this.checkPlaylist()
    this._class('played', this.config.played)
    // replace the 'upload' button with an organize one
    $('#upload-button').after(`<div id="tsUpload"></div>`)
    $('#tsUpload').on('click', this.orderPlaylist)
  }

  // replace "upload" with "organize"
  // literally just a clone of the tt function
  app.orderPlaylist = function () {
    if (window.playlist.isFiltering) window.playlist.clearSearchBar()
    $('#queue-header').removeClass('normal').addClass('edit')
    window.playlist.queue.batchEditMode()
  }

  // display song count in playlist header
  app.countPlaylist = function () {
    let head = $('#playlist-header .text')[0]
    let data = window.playlist.fileids.length
    let name = head.innerHTML.split('<em>')[0]
    head.innerHTML = `${name} <em>${data}</em>`
  }

  // highlight any recently played songs
  app.checkPlaylist = function () {
    $('.song.ts_played').removeClass('ts_played')
    if (!this.config.played) return

    let list = this.$Room().metadata.songlog
    $('#queue .songs .song').each(function () {
      let elem = $(this)
      let name = elem.find('.title').text()
      let band = elem.find('.details').text().split(' • ')[0]
      for (let item of list) {
        let { song, artist } = item.metadata
        if (song == name && artist == band) elem.addClass('ts_played')
      }
    })
  }
  app.togglePlayed = function (key, val) {
    if (key == 'played') this._class('played', val)
  }

  // bind our playlist features
  app.on('attach', app.watchPlaylist)
  app.on('update', app.togglePlayed)
  app.on('playlist', app.countPlaylist)
  app.on(['tracked', 'playlist'], app.checkPlaylist)
}