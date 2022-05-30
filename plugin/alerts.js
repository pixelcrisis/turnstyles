module.exports = TS => {

  TS.$on("mail", function (event) {
    if (!this.config["on.pm"]) return false
    let head = `New PM from: ${ event.user.name }`
    return this.$notify({ head, text: event.text, type: "mail" })
  })

  TS.$on("chat", function (event) {
    if (!this.config["on.mention"] || !event.ping) return false
    let head = `New Mention from: ${ event.user.name }`
    return this.$notify({ head, text: event.text, type: "ping" })
  })

  TS.$on("chat", function (event) {
    let find = this.config["on.text"]
    if (!find || find.length < 3) return false
    let text = event.text.toLowerCase()
    let list = this.getWords(find.toLowerCase(), ",")
    // check the text for each word in the query
    list.forEach(word => {
      if (text.indexOf(word) > -1) {
        event.elem.addClass("mention")
        let head = `Hot Word: ${ word }`
        return this.$notify({ head, text: event.text, type: "word" })
      }
    })
  })

  TS.$on("song", function (event) {
    if (!this.config["on.song"]) return
    let head = `Now Playing: ${ event.name }`
    let text = `By: ${ event.artist }`
    return this.$notify({ head, text, type: "song" })
  })

  TS.$on("snag", function (event) {
    if (!this.config["post.snag"]) return
    let head = event.user.name, text = `has snagged this track!`
    return this.$post({ head, text, type: "snag" })
  })

  TS.$on("join", function (event) {
    if (!this.config["post.join"]) return
    let head = event.user.name, text = "joined."
    return this.$post({ head, text, type: "join" })
  })

  TS.$on("left", function (event) {
    if (!this.config["post.left"]) return
    let head = event.user.name, text = "left."
    return this.$post({ head, text, type: "left" })
  })

}