module.exports = TS => {

  TS.tryJump = function (tries) {
    // try to get on deck
    let user = this.$user().id
    let list = this.$room().metadata.djs
    let curr = this.$current_djs[user] || list[user]
    let spot = $(".become-dj").length || list.length < 5
    if (curr) return this.$print(`jump: landed on deck.`)
    // only try to grab the spot if there is one
    if (!spot) this.$print(`jump: no spot.`)
    else this.$print(`jump: attempting...`)
    if (spot) this.$jump()
    // try again if we have tries left
    if (tries) return this.retryJump(tries - 1)
    else return this.$print(`jump: max attempts.`)
  }

  TS.retryJump = function (tries) {
    let retry = () => this.tryJump(tries)
    return setTimeout(retry.bind(this), 300)
  }

  TS.$on([ "chat", "mail"], function checkAutoDJ (event) {
    // check all messages for autoqueue
    if (!this.config["dj.auto"]) return
    let data = this.config["dj.text"]
    let text = this.getWords(data, ";;")
    // check each possible queue text against event text
    for (let word of text) if (event.text.indexOf(word) > -1) {
      this.$print(`running autoqueue...`)
      return this.tryJump(6)
    }
  })

  TS.$on([ "drop", "update" ], function checkDropDJ () {
    // run our next DJ on change or drop
    if (!this.config["dj.next"]) return false
    this.$print(`running next dj...`)
    this.tryJump(3)
  })

  TS.$on("jump", function checkJumpDJ (event) {
    // disable next DJ if we jumped
    if (!event.self) return
    if (!this.config["dj.next"]) return
    this.setConfig("dj.next", false)
    this.$bully( DECK.JUMP )
  })

  TS.$on("song", function checkDoneDJ (event) {
    if (!this.config["dj.done"]) return
    // escort if user was the last DJ
    if (event.last.djid == this.$user().id) {
      this.setConfig("dj.done", false)
      this.$bully( DECK.DROP )
      return this.$drop()
    }
    // warn when user starts playing
    if (event.self) return this.$bully( DECK.WARN )
  })

}

const DECK = {
  JUMP: {
    head: "You've hopped on deck!",
    body: "NextDJ has been disabled.",
    type: "action"
  },
  WARN: {
    head: "You've started spinning!",
    body: "(turnStyles will escort you after this song)",
    type: "action"
  },
  DROP: {
    head: "You've finished spinning!",
    body: "(turnStyles has escorted you from the deck!)",
    type: "action"
  }
}