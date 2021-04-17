// nextdj.js | take the deck, automatically

module.exports = tS => {

  // check for an open DJ spot 
  tS.checkDecks = function checkDecks () {
    if (!this.config.nextdj) return
    // check for a spot by checking for button
    let button = $('.become-dj').length
    if (!button) return this.Log(`nextdj: no spot`)
    // attempt to take the open spot
    this.Log(`nextdj: taking spot`)
    this.view().becomeDj()
  }

  // disable next DJ if the user jumps up
  tS.on('add_dj', function isSpinning (e) {
    if (!this.config.nextdj) return
    if (window.turntable.user.id != e.user[0].userid) return

    // disable next DJ, send notifications
    let head = `You've Hopped On Deck!`
    let text = `NextDJ is now disabled.`
    this.notifyUser(head, text)
    this.postToChat(head, text)

    this.writeConfig('nextdj', false)
  })

  tS.on('attach', tS.checkDecks)
  tS.on('update', tS.checkDecks)
  tS.on('rem_dj', tS.checkDecks)

}