// cache.js | handles storing tt data

module.exports = tS => {

  tS.prototype.buildCache = function () {
    if (!this.last_played) this.last_played = {}
    if (!this.now_playing) this.now_playing = {}
    if (!this.current_djs) this.current_djs = {}
  }

  tS.prototype.cacheTrack = function (song, love = 0) {
    let last = { ...this.now_playing }

    this.last_played = last
    this.now_playing = song ? { 
      ...song.metadata, love, hate: 0, snag: 0, dj: song.djid
    } : {}

    // return false if no stats
    if (!last.song) return false

    // add stats to current DJ
    let dj = this.current_djs[last.dj]
    if (!dj) this.cacheNewDJ(last.dj, 1)
    dj.spun += 1
    dj.love += last.love
    dj.hate += last.hate
    dj.snag += last.snag

    return `${last.love}❤️${last.hate}💔${last.snag}💖`
  }

  tS.prototype.cacheNewDJ = function (user, spun = 0) {
    let curr = this.current_djs[user]
    if (!curr) this.current_djs[user] = {
      spun, love: 0, hate: 0, snag: 0
    }
  }

  tS.prototype.clearOldDJ = function (user) {
    if (!this.current_djs[user]) return false
    let stat = { ...this.current_djs[user], user }
    delete this.current_djs[user.userid]
    return `${stat.love}❤️${stat.hate}💔${stat.snag}💖${stat.spun}▶️` 
  }

}