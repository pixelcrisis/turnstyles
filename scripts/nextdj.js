// nextdj.js | take the deck, automatically

module.exports = tS => {

  tS.checkDecks = function checkDecks () {
    if (!this.config.nextdj) return
    if (!this.config.pingdj) this.tryJumping()
    else this.suspend(null, 2, 'nextdj')
  }

  tS.tryJumping = function tryJumping () {
    let button = $('.become-dj').length
    if (!button) return this.Log(`nextdj: no spot`)
    this.Log(`nextdj: taking spot`)
    this.view().becomeDj()
  }

  tS.isSpinning = function isSpinning (e) {
    if (!this.config.nextdj) return
    if (this.user().id != e.user[0].userid) return

    this.config.nextdj = false
    this.writeConfig()

    let head = `You've Hopped On Deck!`
    let text = `NextDJ is now disabled.`

    this.sendNotify({ head, text })
    this.postToChat(head, text)
  }

  tS.nextOnPing = function nextOnPing (e) {
    if (!this.pinged(e.text)) return
    if (this.holding['nextdj']) this.tryJumping()
  }

  tS.on('attach', tS.checkDecks)
  tS.on('update', tS.checkDecks)
  tS.on('rem_dj', tS.checkDecks)
  tS.on('add_dj', tS.isSpinning)
  tS.on('speak',  tS.nextOnPing)

}