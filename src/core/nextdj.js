// nextdj.js | take the deck, automatically

module.exports = tS => {

  // called in events onLoad, onDrop 
  tS.prototype.checkDecks = function () {
    if (!this.config.nextdj) return
    if (!this.config.pingdj) this.tryJumping()
    else this.suspend(null, 1, 'nextdj')
  }

  tS.prototype.tryJumping = function () {
    let button = $('.become-dj').length
    if (!button) return this.log(`nextdj: no spot`)
    this.log(`nextdj: taking spot`)
    this.room.becomeDj()
  }

  tS.prototype.isSpinning = function () {
    // in case we fired after set
    $('#ts_pane').removeClass('active')
    // reset nextDJ after fire, delay saving for load
    this.config.nextdj = false
    $('#ts_nextdj').prop('checked', false)
    setTimeout(this.saveConfig.bind(this), 5 * 1000)

    this.notifyUser({ 
      head: `You've Hopped On Deck!`,
      text: `NextDJ is now disabled.`
    })
  }

}