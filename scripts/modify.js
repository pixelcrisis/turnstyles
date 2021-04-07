// modify.js | changing the code/style of TT

module.exports = tS => {

  tS.modify = function () {
    // bind song count updates
    $('#songs-wrapper').on(event, '#songs', countSongs)
    countSongs()

    // bind profile stat link updates
    $('#maindiv').on(event, '.overlay', attachStats)

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

const event = 'DOMSubtreeModified'

const countSongs = () => {
  let head = $('#playlist-header .text')[0]
  let data = window.turntable.playlist.fileids.length
  let name = head.innerHTML.split('<em>')[0]
  head.innerHTML = `${name} <em>${data}</em>`
}

const attachStats = () => {
  // return if we've already attached
  if ($('.profile.modal .statslink').length) return

  // find the userid of the user
  let data = $('.profile.modal .userid')
  let find = data.length ? data[0].innerHTML : ''
  if (find.length != 24) return // not a valid id yet

  $('.profile.modal .section.web-links').before(layout(find))
}

const layout = id => `
  <div class="section statslink">
    <a href="https://ttstats.info/user/${id}" 
      target="_blank" onclick="$('.modal .close-x')[0].click()">
      View This Profile On ttStats >>
    </a>
  <div>
`