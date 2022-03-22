// reminder.js | text at an interval

module.exports = App => {

	App.sendReminder = function (ran) {
		if (!this.config.timing.text) return
		let freq = parseInt(this.config.timing.post)
		let text = `[${ this.Room().name }] ${ this.config.timing.text }`
		if ((ran % freq) === 0 && this.config.timing.text) this.Chat(text)
	}

	App.on("heartbeat", App.sendReminder)

}