// afk.js | respond to dings with an AFK message

module.exports = tS => {

  // check for when is_afk is set to true
  // and then send the afk_ping message
  tS.on('update', function setAfk (key, val) {
    if (key != 'is_afk') return
    let msg = this.config.afk_ping
    if (val && msg) this.speak(msg)
  })

  tS.on('speak', function checkAfk (e) {
    let afk = this.config.is_afk
    let msg = this.config.afk_ping

    // if pinged and afk, send the afk reminder
    if (!e.$self && e.$ping && afk && msg) this.speak(msg)

    // if we sent the message and it's not the afk reminder
    // then we're obviously not AFK anymore.
    else if (e.$self && afk && e.text != msg) {
      this.writeConfig('is_afk', false)
      this.postToChat(`Welcome Back!`, `I've turned off AFK for you!`, 'stat')
    }
  })

}