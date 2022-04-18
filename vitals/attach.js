// attach.js | connect app to the turntable room

module.exports = App => {

	App.initConfig = function () {
		this.__base = window.tsBase
		this.__sync = window.tsSync
		this.__logo = window.tsBase + "/images/icon128.png"

		let configs = this.readConfig()
		this.config = { ...this.default, ...configs }
		this.config.version = require("../package.json").version
		this.config.is_afk = false

		this.Emit("loaded", this.config)
	}

	App.Attach = function () {
		if (!this.config) this.initConfig()
		const core = window.turntable
		if (!core) return this.Err("no room")

		this.lobby = $("#turntable #topBG").length
		if (this.lobby) return this.Emit("lobby")

		// timeout to wait until the room fully loads 
		const wait = () => setTimeout(App.Attach.bind(this), 150)

		let user = window.turntable.user
		if (!user) return wait()
		let room = findKey(core, "roomId")
		if (!room) return wait()
		let data = findKey(room, "roomData")
		if (!data) return wait()

		// bind our event listener
		this.listener = this.listen.bind(this)
		window.turntable.addEventListener("message", this.listener)
		this.Emit("attach", room)
		this.Ran("attached turnStyles")
	}

}

// find property by key in an object
const findKey = (obj, key) => {
  const exists = o => o !== null && typeof o != "undefined" && o[key]
  for (let prop in obj) if (exists(obj[prop])) return obj[prop]
}