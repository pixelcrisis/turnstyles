// cache.js | handles storing tt data

module.exports = tS => {

  // cache all DJs + song on room load
  tS.on('attach', function buildCache (room) {
    for (let id of room.djids) this.cacheNewDJ(id)
    this.cacheTrack(room.currentSong)
  })

  // keep a record of the vote score
  tS.on('update_votes', function cacheVotes (e) {
    this.now_playing.love = e.room.metadata.upvotes
    this.now_playing.hate = e.room.metadata.downvotes
  })

  // keep track of snags as well
  tS.on('snagged', function cacheSnags () {
    this.now_playing.snag += 1
  })

  // cache new DJs as they appear
  tS.cacheNewDJ = function cacheNewDJ (e, data) {
    // handle both direct IDs and events
    let user = e.user ? e.user[0].userid : e
    let curr = this.current_djs[user]
    let name = this.userName(user)
    // only cache if DJ doesn't exist
    if (!curr) this.current_djs[user] = {
      // add data if provided otherwise default 0
      spun: data && data.spun ? data.spun : 0,
      love: data && data.love ? data.love : 0,
      hate: data && data.hate ? data.hate : 0,
      snag: data && data.snag ? data.snag : 0,
    }

    this.Log(`new dj: [${name}](${user})`)
  }

  // when a DJ stops, print out the stats and clear them
  tS.clearOldDJ = function clearOldDJ (e) {
    let name = e.user[0].name
    let user = e.user[0].userid
    // if we haven't tracked them??
    if (!this.current_djs[user]) return
    // generate the stats,
    let stat = { ...this.current_djs[user] }
    let data = `${stat.love}❤️${stat.hate}💔${stat.snag}💖${stat.spun}▶️`
    // delete the user from cache and emit the dropped event
    delete this.current_djs[user]

    this.Log(`old dj: [${name}] (${user})`)
    this.emit('dropped', name, data)
  }

  // cache new/no songs and pass data around
  tS.cacheTrack = function cacheTrack (e) {
    // extract tt song info if any provided
    // handle calling directly on a song and through events
    let song = e && e.room ? e.room.metadata.current_song : e
    let love = e && e.upvoters ? e.upvoters.length : 0
    let djid = song? song.djid : false

    // update last_played and now_playing
    let last = { ...this.now_playing }
    let base = { love, hate: 0, snag: 0, dj: djid }

    this.last_played = last
    this.now_playing = song ? { ...song.metadata, ...base } : {}

    // if last_played has stats, add stats to DJ
    if (last.song && this.current_djs[last.dj]) {
      this.current_djs[last.dj].spun += 1
      this.current_djs[last.dj].love += last.love
      this.current_djs[last.dj].hate += last.hate
      this.current_djs[last.dj].snag += last.snag
    }
    // if stats but no DJ, cache the rogue DJ
    else if (last.song) this.cacheNewDJ(last.dj, last)

    // generate stats and emit the tracked event
    let stat = false
    if (last.song) stat = `${last.love}❤️${last.hate}💔${last.snag}💖`
    
    this.Log(`new song: ${ this.now_playing.song || 'none' }`)
    this.emit('tracked', stat)
  }

  tS.on('add_dj',  tS.cacheNewDJ)
  tS.on('rem_dj',  tS.clearOldDJ)
  tS.on('nosong',  tS.cacheTrack)
  tS.on('newsong', tS.cacheTrack)

  tS.last_played = {}
  tS.now_playing = {}
  tS.current_djs = {}

}