// playlist.js | counts the songs in a playlist

module.exports = tS => {

  tS.prototype.countSongs = () => {
    let head = $('#playlist-header .text')[0]
    let data = window.turntable.playlist.fileids.length
    let name = head.innerHTML.split('<em>')[0]
    head.innerHTML = `${name} <em>${data}</em>`
  }

}