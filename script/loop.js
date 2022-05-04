// loop.js | internal loop

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
		this.ran = setInterval(loop, time)
	}

}