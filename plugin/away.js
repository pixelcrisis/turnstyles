// away.js | respond to dings with an AFK message

module.exports = App => {

  App.isAway = function (e) {
    let conf = this.config.afkstr
    if (!this.config.is_afk) return false
    if (e.$ping && !e.$self) return this.Batch(conf)
    // check if we're no longer away
    let list = conf.split(";;").map(s => s.trim())
    if (e.$self && !list.includes(e.text)) {
      this.setConfig("is_afk", false)
      return this.Post(welcomeBack)
    }
  }

  App.goAway = function (key, val, grp) {
    if (grp || key != "is_afk") return false
    if (val) return this.isAway()
  }

  App.bindAway = function () {
    this.Bind("speak", App.isAway)
    this.Bind("update", App.goAway)
  }

}

const welcomeBack = {
  head: "Welcome Back!",
  body: "You're no longer AFK!"
}