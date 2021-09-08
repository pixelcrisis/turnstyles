// attach.js | connect app to the turntable room

module.exports = app => {

	// attach (init) into the turntable room
	app.attach = function () {
		this.getConfig()
		// load config and fetch tt
		const core = window.turntable
		
		// first make sure we have a room
		if (!core) return this.Log('no room')
		const user = window.turntable.user

		// we can't attach if we're in the lobby
		this.lobby = $('#turntable #topBG').length
		if (this.lobby) return this.addPanel()

		// attempt to attach to the room

		// we loop until the window has loaded the room fully
		const again = () => setTimeout(app.attach.bind(this), 150)

		// look for a nested prop in an object
		// this makes sure turntable has loaded the data
		const findKey = (obj, key) => {
			for (let prop in obj) {
				let data = obj[prop]
				if (data !== null && typeof data != "undefined" && data[key]) {
					return data
				}
			}
		}

		if (!user) return again()
		let room = findKey(core, 'roomId')
		if (!room) return again()
		let full = findKey(room, 'roomData')
		if (!full) return again()

		// room loaded!
		// bind our event listener
		this.listener = this.listen.bind(this)
		window.turntable.addEventListener('message', this.listener)

		this.Emit('attach', room)
		this.Log('loaded room')
	}

	// unload and reload turnStyles assets
	app.reload = function () {
		// unload turnStyles
		clearInterval(this.heart)
		window.turntable.removeEventListener('message', this.listener)
		$('script[src*="turnStyles.js"]').remove()

		// reload turnStyles
		const script = document.createElement('script')
		script.src = `${this.__base}/turnStyles.js?${Math.random()}`
		script.type = 'text/javascript'

		this.Log('reloading')
		document.body.append(script)
	}

}