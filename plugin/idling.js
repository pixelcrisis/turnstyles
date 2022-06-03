module.exports = TS => {

  TS.autoIdle = function (event) {
    let auto = parseInt(this.config["afk.auto"])
    if (!auto) return
    if (!event.active) this.idleTimer += 1
    else this.idleTimer = 0
    this.$debug(`Idle: ${ this.idleTimer }/${ auto }`)
    if (this.config["afk.idle"]) return
    if (this.idleTimer < auto) return
    this.$debug("Running Auto AFK...")
    this.setConfig("afk.idle", true)
    return this.$post( IDLE.ON )
  }

  TS.pingIdle = function () {
    let data = this.config["afk.text"]
    let text = this.getWords(data, ";;")
    return this.$batch(text)
  }

  TS.scanIdle = function (text) {
    // check it wasn't an afk message
    let data = this.config["afk.text"]
    let list = this.getWords(data, ";;")
    if (list.includes(text)) return
    // otherwise welcome them back
    this.setConfig("afk.idle", false)
    return this.$post( IDLE.OFF )
  }

  TS.$on("chat", function setIdle (event) {
    let active = event.self
    if (active) this.autoIdle({ active })
    let { self, text, ping } = event
    if (!this.config["afk.idle"]) return
    if (self) return this.scanIdle(text)
    else if (ping) return this.pingIdle()
  })

  TS.$on("loop", TS.autoIdle)
  TS.$on("update", function updateIdle (key, val) {
    if (key != "afk.idle") return
    if (val) this.pingIdle()
    this.idleTimer = 0
  })

  TS.idleTimer = 0
  
}

const IDLE = {
  ON: {
    head: "Still there?",
    text: "I've marked you as AFK until you get back!"
  },
  OFF: {
    head: "Welcome Back!",
    text: "You're no longer AFK!"
  }
}