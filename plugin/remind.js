module.exports = TS => {

	TS.$on("loop", function (event) {
		let perm = this.config["note.on"]
		let text = this.config["note.text"]
		// make sure beat is divisble by note.on
		// e.g - every 15 minutes, on 30th beat is:
		// 30 % 15 === 0 (31 is not divisible by 15)
		let time = (event.beat % perm) === 0
		if (!perm || !text || !time) return
		this.$chat(`[${ this.$room.name }] ${ text }`)
	})

}