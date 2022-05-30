module.exports = TS => {

  TS.autoIdle = function (active) {
    if (!this.config["afk.auto"]) return
    if (!active) this.idleTimer += 1
    else this.idleTimer = 0
    if (this.config["afk.idle"]) return
    if (this.idleTimer < this.config["afk.auto"]) return
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

  TS.$on("chat", function (event) {
    this.autoIdle(event.self)
    let { self, text, ping } = event
    if (!this.config["afk.idle"]) return
    if (self) return this.scanIdle(text)
    else if (ping) return this.pingIdle()
  })

  TS.$on("loop", TS.autoIdle)
  TS.$on("update", function (key, val) {
    if (key != "afk.idle") return
    if (val) this.pingIdle()
  })

  TS.idleTimer = 0
  
}

const IDLE = {
  ON: {
    head: "Still there?",
    body: "I've marked you as AFK until you get back!"
  },
  OFF: {
    head: "Welcome Back!",
    body: "You're no longer AFK!"
  }
}