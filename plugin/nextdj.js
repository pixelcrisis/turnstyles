// nextdj.js | handing auto DJing

module.exports = App => {

  App.nextDJ = function () {
    if (!this.config.nextdj) return
    let button = $(".become-dj").length
    if (!button) return this.Log("nextdj: no spot")
    this.Log("nextdj: attempting jump")
    this.View().becomeDj()
  }

  App.spinning = function (event) {
    if (!this.config.nextdj) return
    if (this.User().id != event.user[0].userid) return

    this.setConfig("nextdj", false)
    let head = "You've hopped on deck!"
    let body = "NextDJ has been disabled."
    this.Notify({ head, body })
    this.Post({ head, body })
  }

  App.autoQueue = function (event) {
    if (!this.config.auto_q) return
    let matches = this.config.q_text
    if (event.text.indexOf(matches) > -1) this.View().becomeDj()
  }

  App.on("add_dj", App.spinning)
  App.on([ "update", "rem_dj" ], App.nextDJ)
  App.on([ "speak", "pmmed"], App.autoQueue)

}