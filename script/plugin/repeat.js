const tools = {
	autobop (e) {
		let conf = this.get("autobop")
		if (this.bopping) clearTimeout(this.bopping)
		if (e.self || this.now_playing.none || !conf) return
		let wait = Math.floor((Math.random() * 7) * 1000)
		this.debug(`Autobop: ${ wait / 1000 } Seconds.`)
		let vote = this.vote.bind(this)
		this.bopping = setTimeout(vote, wait)
	}
}

const events = {	
	loop: function remind (e) {
		let name = this.room.name
		let when = this.get("note.on")
		let text = this.get("note.text")
		let time = (e.beat % when) === 0
		if (!when || !text || !time) return
		this.chat(`[${ name }] ${ text }`)
	},

	song: tools.autobop,
	attach: tools.autobop
}

export default { tools, events }