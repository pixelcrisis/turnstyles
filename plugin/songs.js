// playlist.js | modifying the playlist

module.exports = App => {

  App.countSongs = function () {
    let head = $("#playlist-header .text")[0]
    let data = window.playlist.fileids.length
    let name = head.innerHTML.split("<em>")[0]
    head.innerHTML = `${ name } <em>${ data }</em>`
  }

  App.checkSongs = function () {
    if (this.delayed) {
      clearTimeout(this.delayCheck)
      delete this.delayCheck
    }
    let checkSongs = this.findPlayed.bind(this)
    // only run the search if playlist isn't loading
    this.delayCheck = setTimeout(checkSongs, 250)
  }

  App.findPlayed = function () {
    $(".song.ts-recent").removeClass("ts-recent")
    if (!this.config.played) return

    let list = this.Room().metadata.songlog
    $("#queue .songs .song").each(function () {
      let el = $(this)
      let name = el.find(".title").text()
      let band = el.find(".details").text().split(" • ")[0]
      for (let item of list) {
        let { song, artist } = item.metadata
        if (song == name && artist == band) el.addClass("ts-recent")
      }
    })
  }

  App.updateSongs = function (key, val) {
    this.checkSongs()
    if (key == "played") this.Body("ts-played", val)
  }

  App.bindSongs = function () {
    this.countSongs()
    this.checkSongs()
    this.Body("ts-played", this.config.played)

    this.Bind("update", this.updateSongs)
    this.Bind("tracked", this.checkSongs)
    this.Bind("playlist", this.checkSongs)
    this.Bind("playlist", this.countSongs)
  }

}