// playlist.js | modifying the playlist

module.exports = App => {

  App.bindPlaylist = function () {
    this.countPlaylist()
    this.checkPlaylist()
    this.classes("played", this.config.played)
  }

  App.countPlaylist = function () {
    let head = $("#playlist-header .text")[0]
    let data = window.playlist.fileids.length
    let name = head.innerHTML.split("<em>")[0]
    head.innerHTML = `${ name } <em>${ data }</em>`
  }

  App.checkPlaylist = function () {
    $(".song.ts_played").removeClass("ts_played")
    if (!this.config.played) return

    let list = this.Room().metadata.songlog
    $("#queue .songs .song").each(function () {
      let el = $(this)
      let name = el.find(".title").text()
      let band = el.find(".details").text().split(" • ")[0]
      for (let item of list) {
        let { song, artist } = item.metadata
        if (song == name && artist == band) el.addClass("ts_played")
      }
    })
  }

  App.updatePlaylist = function (key, val) {
    if (key == "played") this.classes("played", val)
  }

  App.on("update", App.updatePlaylist)
  App.on("playlist", App.countPlaylist)
  App.on([ "tracked", "playlist" ], App.checkPlaylist)

}