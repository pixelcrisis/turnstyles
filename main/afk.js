// afk.js | respond to dings with an AFK message

module.exports = app => {

  // set afk status on update
  app.setAfk = function (key, val) {
    if (key != 'is_afk') return
    // send our afk ping if enabled
    let msg = this.config.afk_ping
    if (val && msg) this.$Send(msg)
  }

  // handle user being afk/active
  app.getAfk = function (e) {
    let { is_afk, afk_ping } = this.config
    if (!is_afk || !afk_ping) return

    if (!e.$self && e.$ping) this.$Send(afk_ping)
    else if (e.$self && e.text != afk_ping) {
      this.setConfig('is_afk', false)
      this.$Post({
        head: `Welcome Back!`,
        body: `You're no longer AFK!`
      })
    }
  }

  app.on('speak', app.getAfk)
  app.on('update', app.setAfk)

}