// afk.js | respond to dings with an AFK message

module.exports = app => {

  // handle user being afk/active
  app.on('speak', function getAfk (e) {
    // run our afk check for self and mentions
    let { is_afk, afk_ping } = this.config
    // ignore if we aren't AFK or don't have a ping
    if (!is_afk || !afk_ping) return
    // send out afk message on mention
    // don't send messages to ourselves
    if (!e.$self && e.$ping) this.Speak(afk_ping)
    // and if it was us, we aren't afk
    // as long as we don't count our afk message
    else if (e.$self && e.text != afk_ping) {
      this.setConfig('is_afk', false)
      this.Post({
        head: `Welcome Back!`,
        body: `You're no longer AFK!`
      })
    }
  })

  // set afk status on update
  app.on('update', function setAfk (key, val) {
    if (key != 'is_afk') return
    // send our afk ping if enabled
    let msg = this.config.afk_ping
    if (val && msg) this.Speak(msg)
  })

}