// stats.js | tracking and posting song/dj stats

module.exports = tS => {

  tS.on('tracked', function alertSong (stat) {
    let curr = this.now_playing
    let last = this.last_played

    if (curr.song && this.config.ping_song) {
      let head = `Now Playing: ${curr.song}`
      let text = stat || `By: ${curr.artist}`
      this.notifyUser(head, text)
    }

    if (stat && this.config.chat_song) {
      let text = `${last.song} by ${last.artist}`
      this.postToChat(stat, text, 'stat')
    }
  })

  tS.on('dropped', function alertDrop (name, stat) {
    if (!this.config.chat_spun) return
    let head = `${name} - ${stat}`
    this.postToChat(head, ` - is done spinning!`, 'stat')
  })

}