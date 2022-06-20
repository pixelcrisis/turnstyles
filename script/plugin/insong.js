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
    this.debug(`Starting Shuffle...`)
    let list = window.turntable.playlist
    let data = shuffle([ ...list.fileids ])
    for (let id in data) {
      const song = data[id]
      list.reorder(song.old, song.new)
      list.queue.reorderBySongid(id, song.new)
    }
    list.loadList()
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
  let data = {}
  for (let i = arr.length - 1; i > 0; i--) {
    let n = Math.floor(Math.random() * (i + 1))
    let curr = arr[i], find = arr[n]
    data[curr] = { old: i, new: n }
    data[find] = { old: n, new: i }
  }
  return data
}

export default { tools, events }