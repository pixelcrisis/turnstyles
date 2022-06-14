// count songs in playlist
const songCount = function () {
  let head = $("#playlist-header .text")[0]
  let data = window.playlist.fileids.length
  let name = head.innerHTML.split("<em>")[0]
  head.innerHTML = `${ name }<em>${ data }</em>`
  return this.debug(`Counted Songs`, data)
}

// scroll to top on playlist change
const songScroll = function (e) {
  if (!e.curr) $("#songs").animate({ scrollTop: 0 })
}

// scan for recent songs on updates
const recentScan = function () {
  // send a buffer delay to handle scroll
  let find = this.recentFind.bind(this)
  if (this.recentWait) clearTimeout(this.recentWait)
  this.recentWait = setTimeout(find, 500)
}

// look for recent songs in playlist
const recentFind = function () {
  $(".ts-played").removeClass(".ts-played")
  if (!this.get("use.recent")) return
  let mark = song => this.recentMark(song)
  $("#queue .songs .song").each((i, song) => mark(song))
}

// match songs against room list
const recentMark = function (song) {
  let list = this.room.metadata.songlog
  let name = $(song).find(".title").text()
  let band = $(song).find(".details").text().split(" • ")[0]
  let both = s => s.song == name && s.artist == band
  let mark = s => both(s) && $(song).addClass("ts-played")
  return list.forEach(item => mark(item.metadata))
  
}

// update the recent check
const recentSave = function (key, val) {
  if (key != "use.recent") return
  this.bodyClass("ts-recent", val)
  this.recentFind()
}

export default app => {
  app.on("save", recentSave)
  app.on("list", songScroll)
  app.on([ "attach", "list" ], songCount)
  app.on([ "attach", "list", "song" ], recentScan)
  Object.assign(app, { recentFind, recentMark })
}