// ondeck.js | handing user DJing

module.exports = App => {

  App.attemptDJ = function (tries) {
    let { nextdj, auto_q } = this.config
    if (!nextdj && !auto_q) return false

    let spot = $(".become-dj").length
    let curr = this.current_djs[this.User().id]
    
    if (spot) {
      this.Log("dj attempt: jumping...")
      this.View().becomeDj()
    }
    else this.Log("dj attempt: no spot")

    if (!curr && tries) {
      let tried = tries - 1
      let again = () => App.attemptDJ(tried)
      return setTimeout(again.bind(this), 250)
    }
  }

  App.tryNextDJ = function () {
    if (!this.config.nextdj) return
    this.Log("running nextdj...")
    this.attemptDJ()
  }

  App.autoQueue = function (event) {
    if (!this.config.auto_q) return
    if (event.text.indexOf(this.config.q_text) > -1) {
      this.Log("running autoqueue...")
      this.attemptDJ(3)
    }
  }

  App.wasNextDJ = function (event) {
    if (this.User().id != event.user[0].userid) return 
    if (this.config.nextdj) {
      this.setConfig("nextdj", false)
      this.Bully({
        head: "You've hopped on deck!",
        body: "NextDJ has been disabled."
      })
    }
  }

  App.on("add_dj", App.wasNextDJ)
  App.on([ "update", "rem_dj" ], App.tryNextDJ)
  App.on([ "speak", "pmmed" ], App.autoQueue)

}