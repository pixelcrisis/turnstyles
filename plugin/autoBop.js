module.exports = TS => {

	TS.$on([ "attach", "song" ], function () {
		// clear timeout to rest
		if (this.bopping) clearTimeout(this.bopping)
		if (!this.config["autobop"]) return false
		// get a random delay of 1 - 7 seconds
		const delay = Math.floor((Math.random() * 7) * 100)
		this.$debug(`Autobop in ${ delay / 100 } seconds`)
		this.bopping = setTimeout(this.$vote(), delay)
	})

}

