// remind.js | text at an interval

module.exports = App => {

	App.sendReminder = function (ran) {
		if (!this.config.timing.text) return
		let freq = parseInt(this.config.timing.post || 0)
		let text = `[${ this.Room().name }] ${ this.config.timing.text }`
		if ((ran % freq) === 0 && this.config.timing.text) this.Chat(text)
	}

	App.bindReminder = function () {
		this.Bind("loop", this.sendReminder)
	}
	
}