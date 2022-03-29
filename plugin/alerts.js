// alerts.js | sending data to chat/notifications

module.exports = App => {

  App.notifyPMs = function (e) {
    if (this.config.notify.chat) this.Notify({
      head: `New PM ${e.$from ? `from: ${e.$from}` : ""}`,
      body: e.text, type: "pm_ping"
    })
  }

  App.notifyDings = function (e) {
    if (this.config.notify.ding && e.$ping) this.Notify({
      head: `[${this.view().roomData.name}] @${e.name}`,
      body: e.text, type: "chat_ping"
    })
    this.notifyText(e)
  }

  App.notifySong = function () {
    let curr = this.now_playing
    if (this.config.notify.song && curr.song) this.Notify({
      head: `Now Playing: ${curr.song}`, body: `By: ${curr.artist}`
    })
  }

  App.notifyText = function (e) {
    let match = e.text.toLowerCase()
    if (this.config.notify.text.length < 3) return
    let words = this.config.notify.text.toLowerCase().split(",")
    for (let word of words) if (match.indexOf(word.trim()) > -1) {
      $(".chat .messages .message:last-child").addClass("mention")
      return this.Notify({ head: `Hot Word: "${ word }"`, body: e.text })
    }
  }

  App.alertSnags = function (e) {
    if (this.config.alerts.snag) this.Post({
      head: e.$name, body: `has snagged this track!`, type: "snag"
    })
  }

  App.alertJoin = function (e) {
    if (this.config.alerts.join) for (let user of e.user) this.Post({
      head: user.name, body: "joined.", type: "join"
    })
  }

  App.alertLeft = function (e) {
    if (this.config.alerts.left) for (let user of e.user) this.Post({
      head: user.name, body: "left.", type: "left"
    })
  }

  App.on("pmmed", App.notifyPMs)
  App.on("speak", App.notifyDings)
  App.on("tracked", App.notifySong)
  App.on("snagged", App.alertSnags)
  App.on("registered", App.alertJoin)
  App.on("deregistered", App.alertLeft)

}