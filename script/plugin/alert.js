const notifyMail = function (e) {
  if (!this.get("on.pm")) return false
  let head = `New PM from: ${ e.user.name }`
  return this.notify({ head, text: e.text, type: "mail" })
}

const notifyChat = function (e) {
  if (!this.get("on.mention") || !e.ping) return false
  let head = `New Mention from: ${ e.user.name }`
  return this.notify({ head, text: e.text, type: "ping" })
}

const notifyText = function (e) {
  let conf = this.get("on.text")
  let list = this.strArr(conf, ",")
  list.forEach(word => this.notifyWord(e, word))
}

const notifyWord = function (e, word) {
  let text = e.text.toLowerCase()
  if (text.indexOf(word.toLowerCase()) > -1) {
    e.target.addClass("mention")
    let head = `Hot Word: ${ word }`
    return this.notify({ head, text: e.text, type: "ping" })
  }
}

const notifySong = function (e) {
  if (!this.get("on.song")) return
  let head = `Now Playing: ${ e.name }`
  let text = `By: ${ e.artist }`
  return this.notify({ head, text, type: "song" })
}

const alertSnag = function (e) {
  if (!this.get("post.snag")) return
  let head = e.user.name
  let text = `has snagged this track!`
  return this.post({ head, text, type: "snag" })
}

const alertJoin = function (e) {
  if (!this.get("post.join")) return
  let head = e.user.name, text = "joined."
  return this.post({ head, text, type: "join" })
}

const alertLeft = function (e) {
  if (!this.get("post.left")) return
  let head = e.user.name, text = "left."
  return this.post({ head, text, type: "left" })
}

export default app => {
  app.on("join", alertJoin)
  app.on("left", alertLeft)
  app.on("snag", alertSnag)
  app.on("mail", notifyMail)
  app.on("song", notifySong)
  app.on("chat", [ notifyChat, notifyText ])
  Object.assign(app, { notifyWord })
}