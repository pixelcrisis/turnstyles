// dings.js | sending data to chat/notifications

module.exports = App => {

  App.notifyPMs = function (e) {
    let send = this.config.notify.chat
    let from = e.$from ? `from: ${ e.$from }` : ""
    let head = `New PM ${ from }`, body = e.text
    if (send) this.Notify({ head, body, type: "pm_ping"})
  }

  App.notifyDing = function (e) {
    let send = this.config.notify.ding
    let room = `[${ this.View().roomData.name }]`
    let head = `${ room } @${ e.name }`, body = e.text
    if (send && e.$ping) this.Notify({ head, body, type: "chat_ping "})
  }

  App.notifyText = function (e) {
    let find = this.config.notify.text
    if (find.length < 3) return false
    let text = e.text.toLowerCase()
    let list = find.toLowerCase().split(",").map(s => s.trim())
    for (let word of list) if (text.indexOf(word) > -1) {
      $( lastMessage ).addClass("mention")
      let head = `Hot Word: "${ word }"`, body = e.text
      return this.Notify({ head, body, type: "text_ping"})
    }
  }

  App.notifySong = function () {
    let curr = this.now_playing
    if (!curr || !curr.song) return
    let send = this.config.notify.song
    let head = `Now Playing: ${ curr.song }`
    let body = `By: ${ curr.artist }`
    if (send) this.Notify({ head, body }, "new_song")
  }

  App.alertSnag = function (e) {
    let send = this.config.alerts.snag
    let head = e.$name, body = `has snagged this track!`
    if (send) this.Post({ head, body, type: "snag" })
  }

  App.alertJoin = function (e) {
    let send = this.config.alerts.join
    if (send) for (let user of e.user) this.Post({
      head: user.name, body: "joined.", type: "join"
    })
  }

  App.alertLeft = function (e) {
    let send = this.config.alerts.left
    if (send) for (let user of e.user) this.Post({
      head: user.name, body: "left.", type: "left"
    })
  }

  App.bindAlerts = function () {
    this.Bind("pmmed", this.notifyPMs)
    this.Bind("speak", this.notifyText)
    this.Bind("speak", this.notifyDing)
    this.Bind("tracked", this.notifySong)
    this.Bind("snagged", this.alertSnag)
    this.Bind("registered", this.alertJoin)
    this.Bind("deregistered", this.alertLeft)
  }

}

const lastMessage = ".chat .messages .message:last-of-type"