// auto.js | our automatic functions

module.exports = app => {

  // the autobop/awesome function
  app.on(['attach', 'newsong'], function autoBop () {
    // reset our timeout every call
    if (this.bop) clearTimeout(this.bop)
    if (!this.config.autobop) return

    // use random intervals to Bop
    const delay = (Math.random() * 7) * 100
    // "click" the awesome button
    const Bop = () => {
      $(window).focus()
      const opts = { bubbles: true, cancelable: true, view: window }
      const elem = document.querySelectorAll('.awesome-button')[0]
      const fire = new MouseEvent('click', opts)
      return !elem.dispatchEvent(fire)
    }

    this.bop = setTimeout(Bop, delay)
  })

  // nextdj: checking for open DJ spot
  app.on(['attach', 'update', 'rem_dj'], function checkDecks () {
    if (!this.config.nextdj) return
    // look for the "become DJ" button
    const button = $('.become-dj').length
    if (!button) return this.Log('nextdj: no spot')
    // attempt to take the spot if available
    this.Log('nextdj: jumping on decks')
    this.$View().becomeDj()
  })

  // nextdj: check if user jumped on decks
  app.on('add_dj', function isSpinning (e) {
    if (!this.config.nextdj) return
    if (this.$User().id != e.user[0].userid) return
    // disable nextdj if user jumps up
    this.setConfig('nextdj', false)
    // send success alert/notificaion
    const head = "You've hopped on deck!"
    const body = "NextDJ is now disabled."
    this.Notify({ head, body })
    this.Post({ head, body })
  })

  // autoqueue: jump up if pinged by queue
  app.on('speak', function autoQueue (e) {
    if (!this.config.auto_q) return
    // only queue if the string matches
    const match = this.config.q_ping == e.text
    if (match) this.$View().becomeDj()
  })

  // automatic reminders
  app.on('heartbeat', function sendReminder (ran) {
    if (!this.config.reminder) return
    let freq = parseInt(this.config.remind)
    let text = `[${this.$Room().name}] ${this.config.reminder}`
    // ran divisible by freq (eg, on 120 ran for every 60 freq)
    if ((ran % freq) === 0 && this.config.reminder) this.Speak(text)

  })

}