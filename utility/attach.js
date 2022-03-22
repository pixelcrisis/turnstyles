// attach.js | connect app to the turntable room

module.exports = App => {

	App.attach = function () {
		this.initConfig()
		const core = window.turntable
		if (!core) return this.Log("No room")
		const user = window.turntable.user

		this.lobby = $("#turntable #topBG").length
		if (this.lobby) {
			this.bindHotBar()
			this.bindWindow()
			return false
		}
		// loop and check until the room is fully loaded
		const again = () => setTimeout(App.attach.bind(this), 150)

		if (!user) return again()
		let room = findKey(core, "roomId")
		if (!room) return again()
		let full = findKey(room, "roomData")
		if (!full) return again()

		// fully loaded!
		this.listener = this.listen.bind(this)
		window.turntable.addEventListener("message", this.listener)
		this.Emit("attach", room)
		this.Log("loaded room")
	}

	App.reload = function () {
		clearInterval(this.heart)
		window.turntable.removeEventListener("message", this.listener)
		$(`script[src*="turnStyles.js"]`).remove()

		const script = document.createElement("script")
		script.src = `${ this.__base }/turnStyles.js?v=${ Math.random() }`
		script.type = "text/javascript"

		this.Log("reloading")
		document.body.append(script)
	}

}

// find property by key in an object
const findKey = (obj, key) => {
  const exists = o => o !== null && typeof o != "undefined" && o[key]
  for (let prop in obj) if (exists(obj[prop])) return obj[prop]
}