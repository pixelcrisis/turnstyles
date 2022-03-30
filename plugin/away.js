// away.js | respond to dings with an AFK message

module.exports = App => {

  App.setAfk = function (key, val, grp) {
    if (grp || key != "is_afk") return
    if (val && this.config.afkstr) this.isAfk()
  }

  App.isAfk = function () {
    if (!this.config.afkstr) return
    this.Batch(this.config.afkstr)
  }

  App.getAfk = function (event) {
    if (!this.config.is_afk) return
    let check = this.config.afkstr.split(";;").map(s => s.trim())
    if (!event.$self && event.$ping) this.isAfk()

    else if (event.$self && !check.includes(event.text)) {
      this.setConfig("is_afk", false)
      this.Post({
        head: "Welcome Back!",
        body: "You're no longer AFK!"
      })
    }
  }

  App.on("speak", App.getAfk)
  App.on("update", App.setAfk)

}