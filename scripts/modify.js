// modify.js | changing the code/style of TT

module.exports = tS => {

  tS.modify = function () {
    // bind song count updates
    $('#songs-wrapper').on('DOMSubtreeModified', '#songs', countSongs)
    countSongs()

    // hide the audience/video
    this.toggleClass('ts_hide_videos', this.config.no_vid)
    this.toggleClass('ts_hide_audience', this.config.no_aud)
    
    // replace upload with organize
    $('#upload-button').after(`<div id="ts_upload"></div>`)
    $('#ts_upload').on('click', () => {
      let playlist = window.turntable.playlist
      if (playlist.isFiltering) playlist.clearSearchBar()
      $("#queue-header").removeClass("normal").addClass("edit")
      playlist.queue.batchEditMode()
    })
  }

  tS.hidden = function (key, value) {
    if (key == "no_vid") this.toggleClass('ts_hide_videos', value)
    if (key == "no_aud") this.toggleClass('ts_hide_audience', value)
  }

  tS.on('attach', tS.modify)
  tS.on('update', tS.hidden)

}

const countSongs = () => {
  let head = $('#playlist-header .text')[0]
  let data = window.turntable.playlist.fileids.length
  let name = head.innerHTML.split('<em>')[0]
  head.innerHTML = `${name} <em>${data}</em>`
}