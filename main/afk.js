// afk.js | respond to dings with an AFK message

module.exports = app => {

  // set afk status on update
  app.setAfk = function (key, val, grp) {
    if (key != 'is_afk' || grp) return
    if (val && this.config.afkstr) this.isAfk()
  }

  // handle user being afk/active
  app.getAfk = function (e) {
    if (!this.config.is_afk) return
    if (!e.$self && e.$ping) this.isAfk()
      
    else if (e.$self && e.text != afkstr) {
      this.setConfig('is_afk', false)
      this.$Post({
        head: `Welcome Back!`,
        body: `You're no longer AFK!`
      })
    }
  }

  // end out afk ping
  app.isAfk = function () {
    if (!this.config.afkstr) return
    let text = this.config.afkstr.split(';;')
    if (text.length > 3) return this.$Post({
      head: "AFK Error!",
      body: `Contains ${text.length}/3 messages`
    })
    else for (let msg of text) this.$Send(msg.trim())
  }

  app.on('speak', app.getAfk)
  app.on('update', app.setAfk)

}