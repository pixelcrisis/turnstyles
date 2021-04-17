// modify.js | changing the code/structure of TT

module.exports = tS => {

  // apply our static, non-toggleable mods
  tS.on('attach', function modifyTurntable () {
    countSongs()
    // add our song counter, ttstats links 
    watch('#songs-wrapper', '#songs', countSongs)
    watch('#maindiv', '.overlay .profile', attachLink)

    // replace upload button with organize
    $('#upload-button').after(`<div id="ts_upload"></div>`)
    $('#ts_upload').on('click', orderSongs)

    // hide elements
    this.toggleClass('ts_hide_videos', this.config.no_vid)
    this.toggleClass('ts_hide_audience', this.config.no_aud)
    this.toggleClass('ts_hide_bubbles', this.config.no_bub)
    this.toggleClass('ts_has_logging', this.config.logging)
  })

  // all of our dynamic mods are mostly hidden elements
  tS.on('update', function updateModifications (key, val) {
    if (key == "no_vid")  this.toggleClass('ts_hide_videos', val)
    if (key == "no_aud")  this.toggleClass('ts_hide_audience', val)
    if (key == "no_bub")  this.toggleClass('ts_hide_bubbles', val)
    if (key == "logging") this.toggleClass('ts_has_logging', val)
  })

}

// add watchers for DOM updates
const event = 'DOMSubtreeModified'
const watch = (el, target, cb) => $(el).on(event, target, cb)

// create a fake "organize" function to 
// call instead of the "upload" function
const orderSongs = function orderSongs () {
  let playlist = window.turntable.playlist
  if (playlist.isFiltering) playlist.clearSearchBar()
  $("#queue-header").removeClass("normal").addClass("edit")
  playlist.queue.batchEditMode()
}

// add a badge on selected playlist showing 
// the number of songs in that playlist
const countSongs = function countSongs () {
  let head = $('#playlist-header .text')[0]
  let data = window.turntable.playlist.fileids.length
  let name = head.innerHTML.split('<em>')[0]
  head.innerHTML = `${name} <em>${data}</em>`
}

// attach a link to ttstats on user profiles
const attachLink = function attachStatsLink () {
  if ($('.profile.modal .statslink').length) return
  // find the userid of the user
  let data = $('.profile.modal .userid')
  let find = data.length ? data[0].innerHTML : ''
  if (find.length != 24) return // not a valid id yet
  $('.profile.modal .section.web-links').show()
  $('.profile.modal .website').append(`
    <a class="statslink" href="https://ttstats.info/user/${find}" 
      target="_blank" onclick="$('.modal .close-x')[0].click()">
      ttStats Profile
    </a>
  `)
}