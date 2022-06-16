const tools = {
  timeIdle: 0,
  mailIdle: {},

  pingIdling (id) { // send afk response
    let text = this.get("afk.text")
    let list = this.strArr(text, ";;")
    this.batch(list, id)
  },

  scanIdling (id) { // ignore afk messages
    let text = this.get("afk.text")
    let list = this.strArr(text, ";;")
    if (list.includes(text)) return // afk message
    this.set("afk.idle", false)
    this.post(idle_off)
    this.timeIdle = 0
  }
}

const events = {
  loop: function loopIdling () {
    let max = this.get("afk.auto")
    if (!max || this.get("afk.idle")) return
    else this.timeIdle += 1
    if (this.timeIdle < max) return
    this.debug(`Running Auto AFK...`)
    this.set("afk.idle", true)
    this.post(idle_on)
  },

  chat: function chatIdling (e) {
    if (e.self) this.timeIdle = 0
    if (!this.get("afk.idle")) return
    if (e.self) return this.scanIdling(e.text)
    if (e.ping) return this.pingIdling()
  },

  mail: function mailIdling (e) {
    if (!this.get("afk.idle")) return
    if (this.mailIdle[e.user.id]) return
    this.pingIdling(e.user.id)
    // don't ping again for 30 seconds
    let clear = () => delete this.mailIdle[e.user.id]
    this.mailIdle[e.user.id] = setTimeout(clear, 30 * 1000)
  },

  save: function saveIdling (key, val) {
    if (key != "afk.idle") return
    if (val) this.pingIdling()
    this.timeIdle = 0
  }
}

const idle_on = {
  head: "Still there?", 
  text: "I've marked you as AFK until you get back!",
  type: "action"
}
const idle_off = {
  head: "Welcome back!",
  text: "You're no longer AFK!",
  type: "action"
}

export default { tools, events }