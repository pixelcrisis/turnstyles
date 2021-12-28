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

		this.Emit('loaded', this.config)
	}

	// save config to local storage
	app.saveConfig = function (e) {
		// when an option is changed, save it
		let which = e.target.dataset.for
		let check = e.target.type == 'checkbox'
		let value = check ? e.target.checked : e.target.value

		// check for a button function
		if (which.indexOf('ts_') === 0) {
			value = $(`#${which}`).val()
			which = which.split('ts_').join('')
		}

		// save the updated config 
		this.setConfig(which, value)
		// emit that the change was updated
		let visual = [ 'style', 'theme', 'user_css' ].includes(which)
		if (visual || !this.lobby) this.Emit('update', which, value)
		// only emit visual changes in the lobby
	}

	// update a config item
	app.setConfig = function (opt, val) {
		// update config object
		this.config[opt] = val
		// save the updated config locally
		let stored = JSON.stringify(this.config)
		window.localStorage.setItem('tsdb', stored)
		// mirror the option between window/hotbar
		let toggle = typeof val === 'boolean'
		let mirror = $(`*[data-for="${opt}"]`)
		mirror.prop(toggle ? 'checked' : 'value', val)
	}

}