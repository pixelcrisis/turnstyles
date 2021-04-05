// nextdj.js | take the deck, automatically

module.exports = tS => {

  tS.checkDecks = function () {
    if (!this.config.nextdj) return
    if (!this.config.pingdj) this.tryJumping()
    else this.suspend(null, 2, 'nextdj')
  }

  tS.tryJumping = function () {
    let button = $('.become-dj').length
    if (!button) return this.Log(`nextdj: no spot`)
    this.Log(`nextdj: taking spot`)
    this.view().becomeDj()
  }

  tS.isSpinning = function (e) {
    if (!this.config.nextdj) return
    if (this.user().id != e.user[0].userid) return

    this.config.nextdj = false
    $('#ts_hotbar #ts_nextdj').prop('checked', false)
    $('#ts_hotbar #ts_nextdj').trigger('change')

    let head = `You've Hopped On Deck!`
    let text = `NextDJ is now disabled.`

    this.sendNotify({ head, text })
    this.postToChat(head, text)
  }

  tS.nextOnPing = function (e) {
    if (!this.pinged(e.text)) return
    if (this.holding['nextdj']) this.tryJumping()
  }

  tS.on('attach', tS.checkDecks)
  tS.on('update', tS.checkDecks)
  tS.on('rem_dj', tS.checkDecks)
  tS.on('add_dj', tS.isSpinning)
  tS.on('speak',  tS.nextOnPing)

}

const inputs = `#ts_hotbar #ts_nextdj, #ts_window #ts_nextdj`