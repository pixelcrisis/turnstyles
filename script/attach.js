// attach.js | connect app to the turntable room

module.exports = App => {

	App.Attach = function () {
		if (!this.config) this.loadConfig()
		let core = window.turntable || false
		if (!core) return this.Err("no room")
		// only emit a half attach if in lobby
		this.lobby = $("#turntable #topBG").length
		if (this.lobby) return this.Emit("lobby")

		// loading the room takes time, might have to try again
		let wait = () => setTimeout(App.Attach.bind(this), 150)

		let user = window.turntable.user
		if (!user) return wait()
		let room = findKey(core, "roomId")
		if (!room) return wait()
		let data = findKey(room, "roomData")
		if (!data) return wait()
		// room is loaded!
		// now bind the event listener
		this.listener = this.listen.bind(this)
		window.turntable.addEventListener("message", this.listener)
		this.Ran("[turnStyles] attached!")
		this.Emit("attach", room)
	}

}

// find property by key in an object
const findKey = (obj, key) => {
  const exists = o => o !== null && typeof o != "undefined" && o[key]
  for (let prop in obj) if (exists(obj[prop])) return obj[prop]
}