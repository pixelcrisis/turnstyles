const tools = {
  takeJump (n) {
    $(window).focus()
    // check if we made it on deck
    let user = this.user.id, room = this.room.metadata
    let curr = room.djs[user] || this.current_djs[user]
    if (curr) return this.print(`Jump: Landed On Deck.`)
    // check if there's a spot open
    let open = room.djcount < room.max_djs
    let full = !$(".become-dj").length || !open
    if (full) return this.print(`Jump: No Spot Open.`)
    this.print(`Jump: Attempting...`)
    this.jump()
    if (n) return this.redoJump(n - 1)
    this.print(`Jump: Max Attempts`)
  },

  redoJump (n) {
    let jump = () => this.takeJump(n)
    setTimeout(jump.bind(this), 400)
  },

  findJump (str) {
    let text = this.get("dj.text")
    let list = this.strArr(text, ";;")
    let test = word => str.indexOf(word) > -1
    for (let word of list) if (test(word)) return true
    return false
  },

  autoJump (e) {
    if (!this.get("dj.auto")) return
    if (!this.findJump(e.text)) return
    this.print(`Jump: Autoqueue...`)
    this.takeJump(6)
  },

  scanJump () {
    if (!this.get("dj.next")) return
    this.print(`Jump: Next DJ...`)
    this.takeJump(3)
  }
}

const events = {  
  song: function autoDrop (e) {
    if (!this.get("dj.done")) return
    let after = this.after || this.get("dj.after")
    if (e.self) return this.bully(warning(after))
    if (e.last.djid != this.user.id) return
    this.after = after - 1
    if (this.after) return
    this.set("dj.done", false)
    this.bully(off_deck)
    this.drop()
  },


  jump: function landJump (e) {
    if (!e.self || !this.get("dj.next")) return
    this.set("dj.next", false)
    this.bully(on_deck)
  },

  chat: tools.autoJump,
  mail: tools.autoJump,
  drop: tools.scanJump,
  save: tools.scanJump
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

export default { tools, events }