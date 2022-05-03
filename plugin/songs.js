// playlist.js | modifying the playlist

module.exports = App => {

  App.countPlaylist = function () {
    let head = $("#playlist-header .text")[0]
    let data = window.playlist.fileids.length
    let name = head.innerHTML.split("<em>")[0]
    head.innerHTML = `${ name } <em>${ data }</em>`
  }

  App.checkPlaylist = function () {
    if (this.waitForPlaylist) {
      clearTimeout(this.waitForPlaylist)
      delete this.waitForPlaylist
    }
    let search = this.searchPlaylist
    // only run the search if playlist isn't loading
    this.waitForPlaylist = setTimeout(search.bind(this), 250)
  }

  App.searchPlaylist = function () {
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

  App.updatePlaylist = function (key, val) {
    this.checkPlaylist()
    if (key == "played") this.bodyClass("ts-played", val)
  }

  App.bindPlaylist = function () {
    this.countPlaylist()
    this.checkPlaylist()
    this.bodyClass("ts-played", this.config.played)

    this.Bind("update", this.updatePlaylist)
    this.Bind("tracked", this.checkPlaylist)
    this.Bind("playlist", this.checkPlaylist)
    this.Bind("playlist", this.countPlaylist)
  }

}