const tools = {
  scanRecent () {
    // delay buffer for scollring
    let find = this.findRecent.bind(this)
    if (this.holdRecent) clearTimeout(this.holdRecent)
    this.holdRecent = setTimeout(find, 300)
  },

  findRecent () {
    $(".ts-played").removeClass(".ts-played")
    if (!this.get("use.recent")) return
    let mark = song => this.markRecent(song)
    $("#queue .songs .song").each((i, song) => mark(song))
  },

  markRecent (song) {
    let list = this.room.metadata.songlog
    let name = $(song).find(".title").text()
    let band = $(song).find(".details").text().split(" • ")[0]
    let both = s => s.song == name && s.artist == band
    let mark = s => both(s) && $(song).addClass("ts-played")
    list.forEach(item => mark(item.metadata))
  },

  countSongs (e) {
    if (e.curr) return
    let head = $("#playlist-header .text")[0]
    let data = window.playlist.fileids.length
    let name = head.innerHTML.split("<em>")[0]
    head.innerHTML = `${ name }<em>${ data }</em>`
  },

  scrollSongs (e) {
    if (!e.curr) $("#songs").scrollTop = 0
  },

  async shuffleSongs () {
    let list = window.turntable.playlist
    let name = `${ list.activePlaylist }`
    let data = shuffle([ ...list.fileids ])
    let copy = `${ name }-copy`
    list.createPlaylist(copy)
    await this.wait(100)
    list.switchPlaylist(copy)
    await this.wait(100)
    for (let i = 0; i < data.length; i++) {
      list.addSong({ fileId: data[i] }, copy, i)
      await this.wait(100)
    }
    // list.deletePlaylist(name)
    // list.renamePlaylist(copy, name)
    window.location.reload()
  },

  async shuffleNew () {
    this.debug(`Starting Shuffle...`)
    let list = window.turntable.playlist
    let data = shuffle([ ...list.fileids ])
    for (let i = 0; i < data.length; i++) {
      await list.queue.reorderBySongid(data[i], i)
      await this.wait(100)
    }
    this.debug(`Shuffled`)
  }
}

const events = {
  save: function saveRecent (key, val) {
    if (key != "use.recent") return
    this.bodyClass("ts-recent", val)
    this.findRecent()
  },

  song: tools.scanRecent,
  list: [ tools.scanRecent, tools.countSongs, tools.scrollSongs ],
  attach: [  tools.scanRecent, tools.countSongs ]
}

// durstenfeld shuffle
const shuffle = function (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ arr[i], arr[j] ] = [ arr[j], arr[i] ];
  }
  return arr
}

export default { tools, events }