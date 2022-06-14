// updating idle on chat
const idleChat = function (e) {
  if (e.self) this.idleTimer = 0
  if (!this.get("afk.idle")) return false
  if (e.self) return this.idleScan(e.text)
  if (e.ping) return this.idlePing()
}

// send idle ping on PM
const idlePM = function (e) {
  if (!this.pinged) this.pinged = {}
  if (!this.get("afk.idle")) return 
  if (this.pinged[e.user.id]) return
  this.idlePing(e.user.id)
  // don't ping again for 30 seconds
  let clear = () => delete this.pinged[e.user.id]
  this.pinged[e.user.id] = setTimeout(clear, 30 * 1000)
}

// increment idle on loop
const idleLoop = function () {
  if (!this.get("afk.auto") || this.get("afk.idle")) return
  this.idleTimer += 1
  if (this.idleTimer < this.get("afk.auto")) return
  this.debug(`Running Auto AFK...`)
  this.set("afk.idle", true)
  return this.post(idle_on)
}

// send afk response when pinged
const idlePing = function (id) {
  let conf = this.get("afk.text")
  let list = this.strArr(conf, ";;")
  return this.batch(list, id)
}

// check for user activity when afk
const idleScan = function (text) {
  // ignore afk messages
  let conf = this.get("afk.text")
  let list = this.strArr(conf, ";;")
  if (list.includes(text)) return
  this.idleTimer = 0
  this.set("afk.idle", false)
  return this.post(idle_off)
}

// update when manually setting afk
const idleSave = function (key, val) {
  if (key != "afk.idle") return
  if (val) this.idlePing()
  this.idleTimer = 0
}

export default app => {
  app.idleTimer = 0
  app.on("chat", idleChat)
  app.on("loop", idleLoop)
  app.on("save", idleSave)
  Object.assign(app, { idlePing, idleScan })
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