// storage.js | saving our configs

module.exports = app => {

	// build config from defaults and local storage
	app.getConfig = function () {
		// only load the base config once
		if (this.__base) return
		this.__base = window.tsBase || 'https://ts.pixelcrsis.co/build'
		this.__logo = `${this.__base}/images/icon128.png`
		// load any saved user configs
		let storage = window.localStorage.getItem('tsdb')
		let configs = storage ? JSON.parse(storage) : {}
		let version = require('../package.json').version
		// load and apply our defaults
		let is_afk  = false // can't be afk if we're loading
		this.config = { ...this.default, ...configs, version, is_afk }
		this.update()

		this.Emit('loaded', this.config)
	}

	// save config to local storage
	app.saveConfig = function (e) {
		let self = e.target
		let data = self.dataset
		if (!data.opt && !data.for) return

		let which = data.for || data.opt
		let check = self.type == 'checkbox'
		let value = check ? self.checked : self.value
		if (data.for) value = $(`*[data-opt="${ which }"]`).val()

		// save the updated config 
		this.setConfig(which, value, data.cat)
		// emit that the change was updated
		let visual = [ 'style', 'theme', 'user_css' ].includes(which)
		if (visual || !this.lobby) this.Emit('update', which, value, data.cat)
		// only emit visual changes in the lobby
	}

	// update a config item
	app.setConfig = function (opt, val, group) {
		// update config object
		if (!group) this.config[opt] = val
		else this.config[group][opt] = val
		// save the updated config locally
		let stored = JSON.stringify(this.config)
		window.localStorage.setItem('tsdb', stored)
		// mirror the option between window/hotbar
		let toggle = typeof val === 'boolean'
		let mirror = $(`*[data-opt="${opt}"][data-cat="${ group || ""}"]`)
		mirror.prop(toggle ? 'checked' : 'value', val)
	}

}