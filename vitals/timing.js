// timing.js | internal loop and delays

module.exports = App => {

	App.beat = function () {
		let beat = parseInt(this.config.timing.beat) + 1
		this.config.timing.beat = beat
		this.Emit("heartbeat", beat)
	}

	App.bindTimer = function () {
		this.holding = {}
		this.heart = setInterval(App.beat.bind(this), 60 * 1000)
	}

	App.delay = function (func, delay, key) {
		if (!this.holding) this.holding = {}
		if (this.holding[key]) return

		let timeout = delay * 1000
		let cleared = () => { delete this.holding[key] }
		this.holding[key] = setTimeout(cleared.bind(this), timeout)

		if (func) func()
	}

}