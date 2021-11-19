// stats.js | tracking and posting song/dj stats

module.exports = app => {

  // retrieve and post song stats from session
  app.on('tracked', function (stat) {
    // stats on new song
    let curr = this.now_playing
    let last = this.last_played

    // notify on new songs
    if (this.config.ping_song && curr.song) this.Notify({
      head: `Now Playing: ${curr.song}`,
      body: stat || `By: ${curr.artist}`
    })

    // alert on last song stats
    if (this.config.chat_song && stat) this.Post({
      head: stat,
      body: `${last.song} by ${last.artist}`,
      type: 'stat'
    })
  })

  // retrieve and post dj stats from session
  app.on('dropped', function (name, stat) {
    // stats for DJ dropping
    if (this.config.chat_spun) this.Post({
      head: `${name} - ${stat}`,
      body: ` - is done spinning!`,
      type: 'stat'
    })
  })

}