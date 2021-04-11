// alerts.js | sending data to chat/notifications

module.exports = tS => {

  tS.alertSong = function alertSong (stat) {
    let song = this.now_playing.song
    if (song && this.config.ping_song) {
      let head = `Now Playing: ${song}`
      let text = stat || `By: ${this.now_playing.artist}`
      this.sendNotify({ head, text })
    }

    if (stat && this.config.chat_song) {
      let last = this.last_played
      let text = `${last.song} by ${last.artist}`
      this.postToChat(stat, text, 'stat')
    }
  }

  tS.alertDrop = function alertDrop (name, stat) {
    if (this.config.chat_spun) {
      let head = `${name} - ${stat}`
      let text = `- is done spining!`
      this.postToChat(head, text, 'stat')
    }
  }

  tS.alertPm = function alertPm (e) {
    if (this.config.ping_pm) {
      let name = this.buddyName(e.senderid)
      let head = name ? `New PM from: ${name}` : `New PM`
      this.sendNotify({ head, text: e.text }, 'ping_pm')
    }
  }

  tS.alertPing = function alertPing (e) {
    // unset afk if user is active
    if (e.userid == this.user().id && this.config.is_afk) {
      this.config.is_afk = false
      this.writeConfig()
      this.postToChat('Welcome Back!', `I've turned off AFK for you!`, 'stat')
    }

    if (!this.pinged(e.text)) return

    if (this.config.ping_chat) {
      let head = `[${this.view().roomData.name}] @${e.name}`
      this.sendNotify({ head, text: e.text }, 'ping_chat')
    }
    
    if (this.config.is_afk && this.config.afk_ping) {
      this.speak(this.config.afk_ping)
    }
  }

  tS.alertSnag = function alertSnag (e) {
    if (this.config.chat_snag) {
      let name = this.userName(e.userid)
      let text = `has snagged this track!`
      this.postToChat(name, text, 'snag')
    }
  }

  tS.alertJoin = function alertJoin (e) {
    let user = e.user[0]
    this.Log(`[${user.name}](${user.userid}) joined. `)
    
    if (this.config.chat_join) {
      this.postToChat(user.name, `joined.`, 'join')
    }
  }

  tS.alertLeft = function alertLeft (e) {
    let user = e.user[0]
    this.Log(`[${user.name}](${user.userid}) left.`)

    if (this.config.chat_left) {
      this.postToChat(user.name, `left.`, 'left')
    }
  }

  tS.alertVote = function alertVote (e) {
    let curr = e.room.metadata.votelog
    let vote = curr[curr.length - 1]
    let name = this.userName(vote[0])
    this.Log(`[${name}] voted: ${vote[1]}`)
  }

  tS.sendReminder = function sendReminder (e) {
    let freq = parseInt(this.config.remind)
    if ((e % freq) === 0 && this.config.reminder) {
      this.speak(this.config.reminder)
    }
  }

  tS.on('pmmed',        tS.alertPm)
  tS.on('speak',        tS.alertPing)
  tS.on('snagged',      tS.alertSnag)
  tS.on('tracked',      tS.alertSong)
  tS.on('dropped',      tS.alertDrop)
  tS.on('registered',   tS.alertJoin)
  tS.on('deregistered', tS.alertLeft)
  tS.on('update_votes', tS.alertVote)
  tS.on('heartbeat',    tS.sendReminder)

}