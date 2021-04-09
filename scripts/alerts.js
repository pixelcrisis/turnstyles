// alerts.js | sending data to chat/notifications

module.exports = tS => {

  tS.alertSong = function (stat) {
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

  tS.alertDrop = function (name, stat) {
    if (this.config.chat_spun) {
      let head = `${name} - ${stat}`
      let text = `- is done spining!`
      this.postToChat(head, text, 'stat')
    }
  }

  tS.alertPm = function (e) {
    if (this.config.ping_pm) {
      let name = this.buddyName(e.senderid)
      let head = name ? `New PM from: ${name}` : `New PM`
      this.sendNotify({ head, text: e.text }, 'ping_pm')
    }
  }

  tS.alertPing = function (e) {
    if (!this.pinged(e.text)) return
    if (this.config.ping_chat) {
      let head = `[${this.view().roomData.name}] @${e.name}`
      this.sendNotify({ head, text: e.text }, 'ping_chat')
    }
  }

  tS.alertSnag = function (e) {
    if (this.config.chat_snag) {
      let name = this.userName(e.userid)
      let text = `has snagged this track!`
      this.postToChat(name, text, 'snag')
    }
  }

  tS.alertJoin = function (e) {
    this.Log(`user joined: ${name} (${e.user[0].userid})`)
    
    if (this.config.chat_join) {
      let name = e.user[0].name
      this.postToChat(name, `joined.`, 'join')
    }
  }

  tS.alertLeft = function (e) {
    this.Log(`user left: ${name} (${e.user[0].userid})`)

    if (this.config.chat_left) {
      let name = e.user[0].name
      this.postToChat(name, `left.`, 'left')
    }
  }

  tS.on('pmmed',        tS.alertPm)
  tS.on('speak',        tS.alertPing)
  tS.on('snagged',      tS.alertSnag)
  tS.on('tracked',      tS.alertSong)
  tS.on('dropped',      tS.alertDrop)
  tS.on('registered',   tS.alertJoin)
  tS.on('deregistered', tS.alertLeft)

}