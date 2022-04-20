// away.js | respond to dings with an AFK message

module.exports = App => {

  App.isAway = function (e) {
    if (!this.config.is_afk) return false
    let notice = this.config.afkstr
    let active = e ? e.$self : true
    let pinged = e ? e.$ping && !e.$self : false
    if (pinged && !active || !e) return this.Batch(notice)
    // check if we sent an original message
    let checks = notice.split(";;").map(s => s.trim())
    let unique = e ? !checks.includes(e.text) : false
    if (active && unique) {
      this.idleTimer = 0
      this.setConfig("is_afk", false)
      return this.Post( welcomeBack )
    }
  }

  App.goAway = function (key, val, cat) {
    if (cat || key != "is_afk") return false
    if (val) this.isAway()
  }

  App.goIdle = function () {
    if (!this.config.idling) return
    this.idleTimer += 1
    let max = this.config.afkmax
    if (this.config.is_afk) return
    if (this.idleTimer < max) return
    this.setConfig("is_afk", true)
    this.Post( goneIdle )
  }

  App.bindAway = function () {
    this.idleTimer = 0
    this.Bind("loop", this.goIdle)
    this.Bind("speak", this.isAway)
    this.Bind("update", this.goAway)
  }

}

const goneIdle = {
  head: "Still there?",
  body: "I've marked you as AFK until you get back!"
}

const welcomeBack = {
  head: "Welcome Back!",
  body: "You're no longer AFK!"
}