// session.js | handles storing tt data

module.exports = app => {

	app.buildCache = function (room) {
		// define our cache storage
		this.current_djs = {}
		this.now_playing = {}
		this.last_played = {}
		// and cache anything we find
		for (let id of room.djids) this.cacheDJ(id)
		this.cacheSong(room.currentSong)
	}

	// manage stats cache
	const cache = (curr = {}, data = {}) => {
		let base = { spun: 0, love: 0, hate: 0, snag: 0 }
		for (let p in curr) if (p in base) base[p] += curr[p]
		for (let p in data) if (p in base) base[p] += data[p]
		return base
	}
	// cache string template
	const stats = (obj, str = '') => {
		if (obj && "love" in obj) str += `${obj.love}❤️`
		if (obj && "hate" in obj) str += `${obj.hate}💔`
		if (obj && "snag" in obj) str += `${obj.snag}💖`
		if (obj && "spun" in obj) str += `${obj.spun}▶️`
		return str
	}

	// DJ Sessions
	app.cacheDJ = function (e) {
		let user = e.user ? e.user[0].userid : e
		let curr = this.current_djs[user]
		if (!curr) this.current_djs[user] = cache()
	}
	app.resetDJ = function (e) {
		let user = e.user[0].userid
		let stat = stats(this.current_djs[user])
		delete this.current_djs[user]
		this.Emit('dropped', e.user[0].name, stat)
	}

	// Song Sessions
	app.cacheSong = function (e) {
		// cache songs on attach and by event
		let song = e && e.room ? e.room.metadata.current_song : e
		let love = e && e.upvoters ? e.upvoters.length : 0
		let djid = song ? song.djid : false

		// update now playing and last played
		let last = { ...this.now_playing }
		let base = { love, hate: 0, snag: 0, dj: djid }
		this.now_playing = song ? { ...song.metadata, ...base } : {}
		this.last_played = last

		// update the associated DJ
		let data = { ...last, spun: 1 }, curr = this.current_djs[last.dj]
		if (data.song && curr) this.current_djs[last.dj] = cache(curr, data)

		this.Log(`new song: ${ this.now_playing.song || 'none' }`)
		this.Emit('tracked', stats(last))
	}

	app.cacheSnag = function () { this.now_playing.snag += 1 }
	app.cacheVote = function (e) {
		this.now_playing.love = e.room.metadata.upvotes
		this.now_playing.hate = e.room.metadata.downvotes
	}

	// bind our cache events
	app.on('attach', app.buildCache)
	app.on('add_dj', app.cacheDJ)
	app.on('rem_dj', app.resetDJ)
	app.on('nosong', app.cacheSong)
	app.on('newsong', app.cacheSong)
	app.on('snagged', app.cacheSnag)
	app.on('update_votes', app.cacheVote)

}