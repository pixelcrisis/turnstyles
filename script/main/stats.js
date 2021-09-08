// stats.js | tracking and posting song/dj stats

module.exports = app => {

  // retrieve and post song stats from session
  app.on('tracked', function (stat) {
    // stats on new song
    let curr = this.now_playing
    let last = this.last_played
    if (curr.song && this.config.ping_song) {
      // send new song notifications
      let head = `Now Playing: ${curr.song}`
      let body = stat || `By: ${curr.artist}`
      this.Notify({ head, body })
    }

    if (stat && this.config.chat_song) {
      // send last played stats to chat
      let body = `${last.song} by ${last.artist}`
      this.Post({ head: stat, body, type: 'stat' })
    }
  })

  // retrieve and post dj stats from session
  app.on('dropped', function (name, stat) {
    // stats for DJ dropping
    if (!this.config.chat_spun) return
    let head = `${name} - ${stat}`
    let body = " - is done spinning!"
    this.Post({ head, body, type: 'stat' })
  })

}