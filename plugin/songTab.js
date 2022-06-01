module.exports = TS => {

  TS.findRecent = function () {
    $(".ts-played").removeClass("ts-played")
    if (!this.config["use.recent"]) return false
    let mark = (i, elem) => this.markRecent(elem)
    $("#queue .songs .song").each( mark )
  }

  TS.markRecent = function (elem) {
    let name = $(elem).find(".title").text()
    let band = $(elem).find(".details").text().split(" • ")[0]
    let both = data => data.song == name && data.artist == band
    let mark = data => both(data) && $(elem).addClass("ts-played")
    this.$room().metadata.songlog.forEach( item => mark(item.metadata) )
  }

  TS.$on([ "attach", "list" ], function loadList () {
    // count songs in current playlist
    let head = $("#playlist-header .text")[0]
    let data = window.playlist.fileids.length
    let name = head.innerHTML.split("<em>")[0]
    head.innerHTML = `${ name }<em> ${ data }</em>`
  })

  TS.$on([ "attach", "list", "song" ], function bindList () {
    // check playlist for recently played songs
    // but make sure we wait until done loading
    let holdRecent = this.findRecent.bind(this)
    if (this.waitRecent) clearTimeout(this.waitRecent)
    this.waitRecent = setTimeout(holdRecent, 250)
  })

  TS.$on("update", function (key, val) {
    if (key != "use.recent") return
    this.$body("ts-recent", val)
    this.findRecent()
  })
  
}