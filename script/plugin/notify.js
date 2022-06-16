const tools = {
  notifyWord (e, word) {
    let same = word.toLowerCase() == e.text.toLowerCase()
    let part = e.text.toLowerCase().indexOf(word.toLowerCase()) > -1
    let pass = this.get("on.exact") ? same : part
    if (!pass) return
    e.target.addClass("mention")
    let head = `Hot Word: ${ word }`
    this.notify({ head, text: e.text, type: "word" })
    this.ding()
  }  
}

const events = {
  join: function alertJoin (e) {
    if (!this.get("post.join")) return
    let head = e.user.name, text = "joined."
    this.post({ head, text, type: "join" })
  },

  left: function alertLeft (e) {
    if (!this.get("post.left")) return
    let head = e.user.name, text = "left."
    this.post({ head, text, type: "left" })
  },

  snag: function alertSnag (e) {
    if (!this.get("post.snag")) return
    let head = e.user.name
    let text = "has snagged this track!"
    this.post({ head, text, type: "snag" })
  },

  mail: function notifyMail (e) {
    if (!this.get("on.pm")) return
    let head = `New PM from: ${ e.user.name }`
    this.notify({ head, text: e.text, type: "mail" })
  },

  song: function notifySong (e) {
    if (!this.get("on.song")) return
    let head = `Now Playing: ${ e.name }`
    let text = `By: ${ e.artist }`
    this.notify({ head, text, type: "song" })
  },

  chat: [
    function notifyChat (e) {
      if (!this.get("on.mention") || !e.ping) return
      let head = `New Mention by: ${ e.user.name }`
      this.notify({ head, text: e.text, type: "ping" })
    },
    
    function notifyText (e) {
      let text = this.get("on.text")
      if (!text || !text.length) return
      let list = this.strArr(text, ",")
      list.forEach(word => this.notifyWord(e, word))
    }
  ]
}

export default { tools, events }