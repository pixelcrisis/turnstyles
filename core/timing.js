// timing.js | internal loop and delays

module.exports = app => {

	app.bindTimer = function () {
		this.holding = {}
		this.heart = setInterval(app.beat.bind(this), 60 * 1000)
	}

	// delay a function from firing if fired recently
	app.delay = function (func, delay, key) {
		// suspend func for delay seconds
		// used to prevent spam from notifications, etc
		if (!this.holding) this.holding = {}
		// if we're already delayed, just ignore
		if (this.holding[key]) return

		// self-clearing timeout
		let timeout = delay * 1000
		let cleared = () => { delete this.holding[key] }
		this.holding[key] = setTimeout(cleared.bind(this), timeout)

		// fire our function
		if (func) func()
	}

	// the heartbeat fired every minute
	app.beat = function () {
		// emit 'heartbeat' every minute
		this.config.beats = parseInt(this.config.beats) + 1
		this.Emit('heartbeat', this.config.beats)
	}

	// start loop and delay storage on attach
	app.on('attach', app.bindTimer)

}