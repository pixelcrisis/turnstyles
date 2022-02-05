// attach.js | connect app to the turntable room

module.exports = app => {

	// attach (init) into the turntable room
	app.attach = function () {
		this.getConfig()
		const core = window.turntable
		if (!core) return this.Log('no room')
		const user = window.turntable.user

		// we can't attach if we're in the lobby
		this.lobby = $('#turntable #topBG').length
		if (this.lobby) return this.bindPanels()

		// we loop until the window has loaded the room fully
		const again = () => setTimeout(app.attach.bind(this), 150)

		if (!user) return again()
		let room = this._findKey(core, 'roomId')
		if (!room) return again()
		let full = this._findKey(room, 'roomData')
		if (!full) return again()

		// room loaded!
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
		script.src = `${ this.__base }/turnStyles.js?v=${ Math.random() }`
		script.type = 'text/javascript'

		this.Log('reloading')
		document.body.append(script)
	}

}