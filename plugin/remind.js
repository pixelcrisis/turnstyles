// remind.js | text at an interval

module.exports = App => {

	App.Remind = function (ran) {
		if (!this.config.timing.text) return
		let freq = parseInt(this.config.timing.post || 0)
		let text = `[${ this.Room().name }] ${ this.config.timing.text }`
		if ((ran % freq) === 0 && this.config.timing.text) this.Chat(text)
	}

	App.bindRemind = function () {
		this.Bind("loop", this.Remind)
	}
	
}