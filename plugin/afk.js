// away.js | respond to dings with an AFK message

module.exports = App => {

  App.getAfk = function (e) {
    let active = e ? e.$self : true
    if (active) this.idleTimer = 0

    if (!this.config.is_afk) return false
    let notice = this.config.afkstr
    let pinged = e ? e.$ping && !e.$self : false
    if (pinged && !active || !e) return this.Batch(notice)
    // check if we sent an original message
    let checks = notice.split(";;").map(s => s.trim())
    let unique = e ? !checks.includes(e.text) : false
    if (active && unique) {
      this.setConfig("is_afk", false)
      return this.Post( welcomeBack )
    }
  }

  App.setAfk = function (key, val, cat) {
    if (cat || key != "is_afk") return false
    if (val) this.getAfk()
  }

  App.idling = function () {
    if (!this.config.idling) return
    this.idleTimer += 1
    let max = this.config.afkmax
    if (this.config.is_afk) return
    if (this.idleTimer < max) return
    this.setConfig("is_afk", true)
    this.Post( goneIdle )
  }

  App.bindAfk = function () {
    this.idleTimer = 0
    this.Bind("loop", this.idling)
    this.Bind("speak", this.getAfk)
    this.Bind("update", this.setAfk)
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