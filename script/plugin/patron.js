const events = {
	chat: function scanPatron () {
		let sent = e.target
		let pass = this.patrons[e.user.id]
		if (sent && pass) sent.addClass("patron")
	},

	save: function saveFan (key, val) {
		if (key != "isfan") return
		let bro = this.strings.author
		if (val)  return this.user.removeFan(bro)
		this.print(`Thanks For The Fan <3`)
		this.user.addFan(bro)
	},

	attach: function scanFan () {
		let bro = this.strings.author
		let fan = this.user.isFanof(bro)
		if (fan)  this.set("isfan", true)
		if (!this.get("isfan")) return
		this.print(`Thanks For The Fan <3`)
		this.user.addFan(bro)
	}
}

export default { events }