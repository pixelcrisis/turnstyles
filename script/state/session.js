// cache.js | handles storing tt data

module.exports = app => {

	// add a DJ to session storage
	app.cacheDJ = function (e, data) {
		// cache new DJs on attach, and by event
		let user = e.user ? e.user[0].userid : e
		let curr = this.current_djs[user]

		// ignore already cached DJs
		if (!curr) this.current_djs[user] = {
			// 0 out values unless data provided 
			spun: data && data.spun ? data.spun : 0,
			love: data && data.love ? data.love : 0,
			hate: data && data.hate ? data.hate : 0,
			snag: data && data.snag ? data.snag : 0
		}
	}

	// remove a DJ from session storage
	app.clearDJ = function (e) {
		// clear and report stats of dropped DJ
		let name = e.user[0].name
		let user = e.user[0].userid
		let curr = this.current_djs[user]

		let stat = statLine(curr)
		delete this.current_djs[user]
		this.Emit('dropped', name, stat)
	}

	// update song stats on new song
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

		// add any stats to the associated DJ
		if (last.song && this.current_djs[last.dj]) {
			this.current_djs[last.dj].spun += 1
			this.current_djs[last.dj].love += last.love
			this.current_djs[last.dj].hate += last.hate
			this.current_djs[last.dj].snag += last.snag
		}

		this.Log(`new song: ${ this.now_playing.song || 'none' }`)
		this.Emit('tracked', statLine(last))
	}

	// bind our cache events
	app.on('add_dj',  app.cacheDJ)
	app.on('rem_dj',  app.clearDJ)
	app.on('nosong',  app.cacheSong)
	app.on('newsong', app.cacheSong)

	// update stats on snag
	app.on('snagged', function cacheSnag () {
		// update now playing
		this.now_playing.snag += 1
	})

	// update stats on vote
	app.on('update_votes', function cacheVote (e) {
		// update now playing
		this.now_playing.love = e.room.metadata.upvotes
		this.now_playing.hate = e.room.metadata.downvotes
	})

	// build fresh cache on attach
	app.on('attach', function buildCache (room) {
		// define our cache storage
		this.current_djs = {}
		this.now_playing = {}
		this.last_played = {}
		// and cache anything we find
		for (let id of room.djids) this.cacheDJ(id)
		this.cacheSong(room.currentSong)
	})

	// template for our statlines
	const statLine = obj => {
		let str = ''
		if (obj && "love" in obj) str += `${obj.love}❤️`
		if (obj && "hate" in obj) str += `${obj.hate}💔`
		if (obj && "snag" in obj) str += `${obj.snag}💖`
		if (obj && "spun" in obj) str += `${obj.spun}▶️`
		return str || false
	}

}