// session.js | handles storing tt data

module.exports = App => {

	App.cacheDJ = function (e) {
		// find user by id (e) or event (e.user)
		let user = e.user ? e.user[0].userid : e
		// add them to cache if not there
		let curr = this.current_djs[user]
		if (!curr) this.current_djs[user] = getStats()
	}

	App.updateDJ = function (last) {
		// add last song to DJ stats 
		if (!last.song || !last.djid) return
		let curr = this.current_djs[last.djid]
		let data = getStats(curr, { ...last, spun: 1 })
		this.current_djs[last.djid] = data
		// check if it's us, and if we're escorting
		if (last.djid == this.User().id) this.escortMe()
	}

	App.resetDJ = function (e) {
		// handle DJ drop/removal
		let user = e.user[0].userid
		let stat = statLine(this.current_djs[user])
		delete this.current_djs[user]
		this.Emit("dropped", e.user[0].name, stat)
	}

	App.cacheSong = function (e) {
		// check if attaching song (e) or new song (metadata)
		let song = e && e.room ? e.room.metadata.current_song : e
		let love = e && e.upvoters ? e.upvoters.length : 0
		let djid = song ? song.djid : false

		let last = { ...this.now_playing }
		let base = { djid, love, hate: 0, snag: 0 }
		let curr = song ? { ...song.metadata, ...base } : {}

		this.now_playing = curr
		this.last_played = last

		this.updateDJ(last)
		// check if it's us, warn if we're escorting
		if (djid == this.User().id) this.escorting()

		let name = curr.song || "none"
		this.Log(`[new song] ${ name }`)
		this.Emit("tracked", statLine(last))
	}

	App.cacheVote = function (e) {
		// have to pull from the room
		this.now_playing.love = e.room.metadata.upvotes
		this.now_playing.hate = e.room.metadata.downvotes
	}

	App.cacheSnag = function () {
		// just increment snags
		this.now_playing.snag += 1
	}

	App.bindSession = function (room) {
		// define our cache
		this.current_djs = {}
		this.now_playing = {}
		this.last_played = {}
		// bind our caching events
		this.Bind("add_dj", this.cacheDJ)
		this.Bind("rem_dj", this.resetDJ)
		this.Bind("nosong", this.cacheSong)
		this.Bind("newsong", this.cacheSong)
		this.Bind("snagged", this.cacheSnag)
		this.Bind("update_votes", this.cacheVote)
		// and cache our initial data
		for (let id of room.djids) this.cacheDJ(id)
		this.cacheSong(room.currentSong)
	}

}

const getStats = (curr, data) => {
	let base = { spun: 0, love: 0, hate: 0, snag: 0 }
	// add value from current stats and updated stats
	for (let p in curr || {}) if (p in base) base[p] += curr[p]
	for (let p in data || {}) if (p in base) base[p] += data[p]
	return base
}

const statLine = (obj = {}, str = "") => {
	if ("love" in obj) str += `${obj.love}❤️`
	if ("hate" in obj) str += `${obj.hate}💔`
	if ("snag" in obj) str += `${obj.snag}💖`
	if ("spun" in obj) str += `${obj.spun}▶️`
	return str
}