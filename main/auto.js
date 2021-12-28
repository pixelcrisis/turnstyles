// auto.js | our automatic functions

module.exports = app => {

  app.autoBop = function () {
    if (this.bop) clearTimeout(this.bop)
    if (!this.config.autobop) return

    const delay = (Math.random() * 7) * 100
    const click = () => this._click('.awesome-button')
    this.bop = setTimeout(click, delay)
  }

  // nextdj features
  app.autoJump = function () {
    if (!this.config.nextdj) return
    const button = $('.become-dj').length
    if (!button) return this.Log('nextdj: no spot')
    this.Log('nextdj: attempting jump')
    this.$View().becomeDj()
  }
  app.spinning = function (e) {
    if (!this.config.nextdj) return
    if (this.$User().id != e.user[0].userid) return

    this.setConfig('nextdj', false)
    const head = "You've hopped on deck!"
    const body = "NextDJ is now disabled."
    this.Notify({ head, body })
    this.$Post({ head, body })
  }

  // autoqueue - jump on queue ping
  app.autoQueue = function (e) {
    if (!this.config.auto_q) return
    if (this.config.q_ping == e.text) this.$View().becomeDj()
  }

  // automatic timed reminders
  app.autoRemind = function (ran) {
    if (!this.config.reminder) return
    let freq = parseInt(this.config.remind)
    let text = `[${this.$Room().name}] ${this.config.reminder}`
    // ran divisible by freq (eg, on 120 ran for every 60 freq)
    if ((ran % freq) === 0 && this.config.reminder) this.$Send(text)
  }

  app.on(['attach', 'newsong'], app.autoBop)
  app.on(['attach', 'update', 'rem_dj'], app.autoJump)
  app.on('add_dj', app.spinning)
  app.on('speak', app.autoQueue)
  app.on('heartbeat', app.autoRemind)

}