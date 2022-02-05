// stats.js | tracking and posting song/dj stats

module.exports = app => {

  app.songStats = function (stat) {
    let last = this.last_played
    if (this.config.alerts.song && stat) this.$Post({
      head: stat,
      body: `${last.song} by ${last.artist}`,
      type: 'stat'
    })
  }

  app.djStats = function (name, stat) {
    if (this.config.alerts.spun) this.$Post({
      head: `${name} - ${stat}`,
      body: ` - is done spinning!`,
      type: 'stat'
    })
  }

  app.on('tracked', app.songStats)
  app.on('dropped', app.djStats)

}