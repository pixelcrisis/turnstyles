// timing.js | internal loop and delays

module.exports = App => {

	App.Loop = function () {
		let curr = this.config.timing.beat
		let beat = parseInt(curr) + 1
		this.config.timing.beat = beat
		this.Emit("loop", beat)
	}

	// the loop fires every minute
	// and emits the minute number
	// for "every x minutes" funcs

	App.bindLoop = function () {
		let loop = this.Loop.bind(this)
		let time = 60 * 1000 // 1 minute
		this.looping = setInterval(loop, time)
	}

	App.Delay = function (func, type) {
		// define holding list if undefined
		if (!this.holding) this.holding = {}
		// ignore the function if we're holding
		if (this.holding[type]) return false
		// otherwise set the delay
		let timeout = 5 * 1000 // 5 seconds
		// it works by self destructing the held type
		let cleared = () => { delete this.holding[type] }
		this.holding[type] = setTimeout(cleared.bind(this), timeout)
		// fire any function since we weren't holding
		if (func) func()
	}

}