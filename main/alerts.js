// alerts.js | sending data to chat/notifications

module.exports = app => {

  app.notifyPMs = function (e) {
    if (this.config.notify.chat) this.Notify({
      head: `New PM ${e.$from ? `from: ${e.$from}` : ''}`,
      body: e.text, type: 'pm_ping'
    })
  }

  app.notifyDings = function (e) {
    if (this.config.notify.ding && e.$ping) this.Notify({
      head: `[${this.view().roomData.name}] @${e.name}`,
      body: e.text, type: 'chat_ping'
    })
    this.notifyText(e)
  }

  app.notifySong = function () {
    let curr = this.now_playing
    if (this.config.notify.song && curr.song) this.Notify({
      head: `Now Playing: ${curr.song}`, body: `By: ${curr.artist}`
    })
  }

  app.notifyText = function (e) {
    let match = e.text.toLowerCase()
    if (this.config.notify.text.length < 3) return
    let words = this.config.notify.text.toLowerCase().split(",")
    for (let word of words) if (match.indexOf(word.trim()) > -1) {
      $('.chat .messages .message:last-child').addClass('mention')
      return this.Notify({ head: `Hot Word: "${ word }"`, body: e.text })
    }
  }

  app.alertSnags = function (e) {
    if (this.config.alerts.snag) this.$Post({
      head: e.$name, body: `has snagged this track!`, type: 'snag'
    })
  }

  app.alertJoin = function (e) {
    if (this.config.alerts.join) for (let user of e.user) this.$Post({
      head: user.name, body: 'joined.', type: 'join'
    })
  }

  app.alertLeft = function (e) {
    if (this.config.alerts.left) for (let user of e.user) this.$Post({
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