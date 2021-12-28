// alerts.js | sending data to chat/notifications

module.exports = app => {

  app.notifyPMs = function (e) {
    if (this.config.ping_pm) this.Notify({
      head: `New PM ${e.$from ? `from: ${e.$from}` : ''}`,
      body: e.text, type: 'pm_ping'
    })
  }

  app.notifyDings = function (e) {
    if (this.config.ping_chat && e.$ping) this.Notify({
      head: `[${this.view().roomData.name}] @${e.name}`,
      body: e.text, type: 'chat_ping'
    })
  }

  app.notifySong = function () {
    let curr = this.now_playing
    if (this.config.ping_song && curr.song) this.Notify({
      head: `Now Playing: ${curr.song}`, body: `By: ${curr.artist}`
    })
  }

  app.alertSnags = function (e) {
    if (this.config.chat_snag) this.Post({
      head: e.$name, body: `has snagged this track!`, type: 'snag'
    })
  }

  app.alertJoin = function (e) {
    if (this.config.chat_join) for (let user of e.user) this.Post({
      head: user.name, body: 'joined.', type: 'join'
    })
  }

  app.alertLeft = function (e) {
    if (this.config.chat_left) for (let user of e.user) this.Post({
      head: user.name, body: 'left.', type: 'left'
    })
  }

  app.on('pmmed', app.notifyPMs)
  app.on('speak', app.notifyDings)
  app.on('tracked', app.notifySong)
  app.on('snagged', app.alertSnags)
  app.on('registered', app.alertJoin)
  app.on('deregistered', app.alertLeft)

}