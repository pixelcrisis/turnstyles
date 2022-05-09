// deck.js | handling user DJing

module.exports = App => {

  App.autoQueue = function (e) {
    if (!this.config.auto_q) return
    if (e.text.indexOf(this.config.q_text < 0)) return
    this.Ran("[autoqueue] running...")
    this.attemptDJ(6)
  }

  App.tryNextDJ = function () {
    if (!this.config.nextdj) return
    this.Ran("[nextdj] running...")
    this.attemptDJ(2)
  }

  App.wasNextDJ = function (e) {
    if (!this.config.nextdj) return
    if (!this.Self(e.user[0].userid)) return
    this.setConfig("nextdj", false)
    this.Bully( disableNextDJ )
  }

  App.wasLastDJ = function () {
    if (!this.config.escort) return
    if (!this.Self(this.last_played.djid)) return
    this.setConfig("escort", false)
    this.Bully( escortWarning )
    this.JumpDown()
  }

  App.attemptDJ = function (tries) {
    let spot = $(".become-dj").length
    let curr = this.current_djs[this.User().id]
    if (curr) return this.Ran("[deck] success")

    if (!spot) this.Ran("[deck] no spot")
    else this.Ran("[deck] jumping...")
    if (spot) this.JumpUp()

    let retry = () => this.attemptDJ(tries - 1)
    if (!tries) return this.Ran("[deck] max attempts")
    else return setTimeout(retry.bind(this), 250)
  }

  App.bindDeck = function () {
    this.Bind("add_dj", this.wasNextDJ)
    this.Bind("rem_dj", this.tryNextDJ)
    this.Bind("tracked", this.wasLastDJ)
    this.Bind("update", this.tryNextDJ)
    this.Bind("speak", this.autoQueue)
    this.Bind("pmmed", this.autoQueue)
  }

}

const disableNextDJ = {
  head: "You've hopped on deck!",
  body: "NextDJ has been disabled."
}

const escortWarning = {
  head: "You've started spinning!",
  body: "(turnStyles will escort you after this song)",
  type: "action"
}