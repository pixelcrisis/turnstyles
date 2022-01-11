// afk.js | respond to dings with an AFK message

module.exports = app => {

  // set afk status on update
  app.setAfk = function (key, val, grp) {
    if (key != 'is_afk' || grp) return
    // send our afk ping if enabled
    let msg = this.config.afkstr
    if (val && msg) this.$Send(msg)
  }

  // handle user being afk/active
  app.getAfk = function (e) {
    let { is_afk, afkstr } = this.config
    if (!is_afk || !afkstr) return

    if (!e.$self && e.$ping) this.$Send(afkstr)
    else if (e.$self && e.text != afkstr) {
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