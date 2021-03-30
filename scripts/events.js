// events.js | self-explanatory

module.exports = tS => {

  tS.prototype.handle = function (e) {
    switch (e.command) {
      case "pmmed":        this.handlePmmed(e); break;
      case "speak":        this.handleSpeak(e); break;
      case "add_dj":       this.handleAddDJ(e); break;
      case "rem_dj":       this.handleRemDJ(e); break;
      case "newsong":      this.handleTrack(e); break;
      case "snagged":      this.handleSteal(e); break;
      case "registered":   this.handleJoins(e); break;
      case "deregistered": this.handleLeave(e); break;
      case "update_votes": this.handleVotes(e); break;
    }
  }

  // fired when we attach to a room
  tS.prototype.handleLoad = function () {  
    this.buildPanel()
    this.runAutobop()
    this.handleSave()
  }

  // fired when we update our config
  tS.prototype.handleSave = function () {
    this.loadThemes()
    this.loadVolume()
    this.checkDecks()
    this.notifyAuth()
  }

  tS.prototype.handlePmmed = function (e) {
    if (this.config.ping_pm) {
      let user = this.buddy(e.senderid)
      let head = user ? `New PM from: ${user}` : `New PM`
      this.notifyUser({ head, text: e.text }, 'ping_pm')
    }
  }

  tS.prototype.handleSpeak = function (e) {
    let search = `@${this.core.user.attributes.name.toLowerCase()}`
    let pinged = e.text.toLowerCase().indexOf(search) > -1
    if (!pinged) return 

    if (this.config.ping_chat) {
      let head = `[${this.room.roomData.name}] @${e.name}`
      this.notifyUser({ head, text: e.text }, 'ping_chat')
    }

    // take the spot if pinged with nextdj
    if (this.holding['nextdj']) {
      this.log(`nextdj: received ping`)
      this.tryJumping()
    }
  }

  tS.prototype.handleTrack = function (e) {
    this.runAutobop()
    // turn off mute after one song
    if (this.mute) this.toggleMute()
    // save the song to the object for stats
    this.cacheTrack(e.room.metadata.current_song.metadata)

    // get the stats of last played
    let stat = this.cachedSong()

    if (this.config.ping_song) {
      let head = `Now Playing: ${this.now_playing.song}`
      let text = stat || `By: ${this.now_playing.artist}`
      this.notifyUser({ head, text })
    }

    if (stat && this.config.chat_stat) this.sendToChat(stat, last.song)
  }

  tS.prototype.handleAddDJ = function (e) {
    // remove from next DJ if added to decks
    let me = this.user == e.user[0].userid
    if (me && this.config.nextdj) this.isSpinning()
  }

  tS.prototype.handleRemDJ = function () {
    // check and see if we can take the spot
    this.checkDecks()
  }

  tS.prototype.handleSteal = function (e) {
    this.now_playing.snag += 1
    if (this.config.chat_snag) {
      let name = this.named(e.user)
      let text = `has snagged this track!`
      this.sendToChat(name, text, 'snag')
    }
  }

  tS.prototype.handleVotes = function (e) {
    this.now_playing.love = e.room.metadata.upvotes
    this.now_playing.hate = e.room.metadata.downvotes
  }

  tS.prototype.handleJoins = function (e) {
    if (this.config.chat_join) {
      let name = e.user[0].name
      this.sendToChat(name, `joined.`, 'join')
    }
  }

  tS.prototype.handleLeave = function (e) {
    if (this.config.chat_left) {
      let name = e.user[0].name
      this.sendToChat(name, `left.`, 'left')
    }
  }

}