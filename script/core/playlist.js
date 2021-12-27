// playlist.js | modifying the playlist

module.exports = app => {

  // get song count for current playlist
  app.countPlaylist = function () {
    // display song count in playlist header
    let head = $('#playlist-header .text')[0]
    let data = window.playlist.fileids.length
    let name = head.innerHTML.split('<em>')[0]
    head.innerHTML = `${name} <em>${data}</em>`
  }

  // replace "upload" with "organize"
  app.orderPlaylist = function () {
    // literally just a clone of the tt function
    if (window.playlist.isFiltering) window.playlist.clearSearchBar()
    $('#queue-header').removeClass('normal').addClass('edit')
    window.playlist.queue.batchEditMode()
  }

  // highlight any recently played songs
  app.checkPlaylist = function (log) {
    if (log) this.songlog = log
    let list = this.songlog
    // clear any highlighted songs
    $('.song.ts_played').removeClass('ts_played')
    // loop through all the songs in the playlist
    $('#queue .songs .song').each(function () {
      let block = $(this)
      let p_title = block.find('.title').text()
      let p_artist = block.find('.details').text().split(' • ')[0]
      for (let item of list) {
        let { song, artist } = item.metadata
        if (song == p_title && artist == p_artist) {
          block.addClass('ts_played')
        }
      }
    })
  }

  // bind our playlist features on attach
  app.on('attach', function watchPlaylist (room) {
    // add our initial modifications
    this.countPlaylist()
    this.checkPlaylist(room.roomData.metadata.songlog)
    this.classes('played', this.config.played)
    // replace the 'upload' button with an organize one
    $('#upload-button').after(`<div id="tsUpload"></div>`)
    $('#tsUpload').on('click', this.orderPlaylist)
  })

  // update the song log after every new song
  app.on(['newsong', 'nosong'], function checkSongLog (e) {
    this.checkPlaylist(e.room.metadata.songlog)
  })

  // bind playlist counter to playlist updates
  app.on('playlist', app.countPlaylist, app.checkPlaylist)

  // update our played songs toggle
  app.on('update', function togglePlayed (key, val) {
    if (key == 'played') this.classes('played', val)
  })
}