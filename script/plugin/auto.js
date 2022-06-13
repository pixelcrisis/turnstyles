const autobop = function (e) {
	let conf = this.get("autobop")
	if (this.bopping) clearTimeout(this.bopping)
	if (e.self || this.now_playing.none || !conf) return
	const wait = Math.floor((Math.random() * 7) * 100)
	this.debug(`Autobop: ${ wait / 100 } Seconds.`)
	this.bopping = setTimeout(this.vote(), wait)
}

const remind = function (e) {
	let when = this.get("note.on")
	let text = this.get("note.text")
	let time = (e.beat % when) == 0
	if (!when || !text || !time) return
	return this.chat(`[${ this.room.name }] ${ text }`)
}

// check if fan on load
const fanScan = function () {
	let dude = this.strings.author
	let curr = this.user.isFanof(dude)
	if (curr) this.set("isfan", true)
	if (!this.get("isfan")) return
	this.print(`Thanks For The Fan <3`)
	this.user.addFan(dude)
}

// check for new fans
const fanSave = function (key, val) {
	if (key != "isfan") return
	let bro = this.strings.author
	if (val) return this.user.removeFan(bro)
	this.print(`Thanks For The Fan <3`)
	this.user.addFan(bro)
}

export default app => {
	app.on("loop", remind)
	app.on("save", fanSave)
	app.on("attach", fanScan)
	app.on([ "attach", "song" ], autobop)
}