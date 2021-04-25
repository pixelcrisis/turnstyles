// alerts.js | sending data to chat/notifications

module.exports = tS => {

  tS.on('pmmed', function alertPM (e) {
    if (!this.config.ping_pm) return
    let head = `New PM ${e.$from ? `from: ${e.$from}` : ''}`
    this.notifyUser(head, e.text, 'pm_ping')
  })

  tS.on('speak', function alertPing (e) {
    if (!e.$ping || !this.config.ping_chat) return
    let head = `[${this.view().roomData.name}] @${e.name}`
    this.notifyUser(head, e.text, 'chat_ping')
  })

  tS.on('speak', function alertMatched (e) {
    let list = this.config.ping_word.split(",")
    for (let word of list) {
      let text = e.text.toLowerCase()
      let find = word.trim().toLowerCase()
      if (text.indexOf(find) > -1) {
        $('.chat .messages .message:last-child').addClass('mention')
        let head = `[${this.view().roomData.name}] Found: ${word}`
        return this.notifyUser(head, e.text, 'match_ping')
      }
    }
  })

  tS.on('snagged', function alertSnag (e) {
    if (!this.config.chat_snag) return
    this.postToChat(e.$name, `has snagged this track!`, 'snag')
  })

  tS.on('registered', function alertJoin (e) {
    for (let user of e.user) {
      this.Log(`[${user.name}](${user.userid}) joined.`)
      
      if (this.config.chat_join) {
        this.postToChat(user.name, `joined.`, 'join')
      }
    }
  })

  tS.on('deregistered', function alertJoin (e) {
    for (let user of e.user) {
      this.Log(`[${user.name}](${user.userid}) left.`)
      
      if (this.config.chat_join) {
        this.postToChat(user.name, `left.`, 'left')
      }
    }
  })

  tS.on('update_votes', function alertVote (e) {
    let curr = e.room.metadata.votelog
    let vote = curr[curr.length - 1]
    let name = this.userName(vote[0])
    this.Log(`[${name}] voted: ${vote[1]}`)
  })

}