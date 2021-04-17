// autoqueue.js | take the deck when it's your turn

module.exports = tS => {

  tS.on('speak', function checkAutoQueue (e) {
    if (!this.config.auto_q) return
    let match = this.config.q_ping == e.text
    if (match) this.view().becomeDj()
  })

}