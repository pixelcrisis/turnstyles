// n tries to get on deck
const jumpTry = function (n) {
  let user = this.user.id
  let room = this.room.metadata
  // check if we made it on deck
  let curr = room.djs[user] || this.current_djs[user]
  if (curr) return this.print(`Jump: Landed On Deck`)
  // check if there's a spot available
  let full = !$(".become-dj").length || room.dj_full
  if (full) return this.print(`Jump: No Spot Open`)
  // attempt to get on deck
  this.print(`Jump: Attempting...`); this.jump()
  // keep going to be sure
  if (n) return this.jumpAnew(n - 1)
  return this.print(`Jump: Max Attempts`)
}

const jumpAnew = function (n) {
  let retry = () => this.jumpTry(n)
  return setTimeout(retry.bind(this), 300)
}

// check for queue ping auto jump
const jumpAuto = function (e) {
  if (!this.get("dj.auto")) return
  if (!this.jumpFind(e.text)) return
  this.print(`Jump: Running Autoqueue...`)
  return this.jumpTry(6)
}

// check if text has queue ping
const jumpFind = function (text) {
  let conf = this.get("dj.text")
  let list = this.strArr(conf, ";;")
  let test = word => text.indexOf(word) > -1
  for (let word of list) if (test(word)) return true
  return false
}

// check for new DJ spots 
const jumpScan = function () {
  if (!this.get("dj.next")) return
  this.print(`Jump: running next dj...`)
  return this.jumpTry(3)
}

// jump down after song
const jumpDown = function (e) {
  if (!this.get("dj.done")) return
  let after = this.after || this.get("dj.after")
  if (e.self) return this.bully(warning(after))
  if (e.last.djid != this.user.id) return
  this.after = after - 1
  if (this.after) return
  this.set("dj.done", false)
  this.bully(off_deck)
  return this.drop()
}

// disable nextdj on success jump
const jumpEnd = function (e) {
  if (!this.get("dj.next") || !e.self) return
  this.set("dj.next", false)
  this.bully(on_deck)
}

export default app => {
  app.on("jump", jumpEnd)
  app.on("song", jumpDown)
  app.on([ "drop", "save" ], jumpScan)
  app.on([ "chat", "mail" ], jumpAuto)
  Object.assign(app, { jumpTry, jumpAnew, jumpFind })
}

const on_deck = {
  head: "You've hopped on deck!",
  text: "NextDJ has been disabled.",
  type: "action"
}
const off_deck = {
  head: "You've finished spinning!",
  text: "(turnStyles has escorted you from the deck!)",
  type: "action"
}

const warning = after => ({
  head: "You've started spinning!",
  text: `(turnStyles will escort you after ${ after } song(s)!)`,
  type: "action"
})