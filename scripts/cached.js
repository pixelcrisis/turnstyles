// cache.js | handles storing tt data

module.exports = tS => {

  tS.prototype.cacheTrack = function (song, love = 0) {
    // return if there's no song defined
    if (!song) return
    // save now playing as last played
    if (!this.now_playing) this.last_played = {}
    else this.last_played = { ...this.now_playing }
    // and save the current song now playing
    this.now_playing = { love, hate: 0, snag: 0, ...song }
  }

  tS.prototype.cachedSong = function () {
    if (!this.last_played.song) return false
    return `[🔺${last.love}🔻${last.hate}❤️${last.snag}]`
  }

}