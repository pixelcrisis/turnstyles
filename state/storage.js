// storage.js | saving our configs

module.exports = App => {

	// read our local/addon dbs
	App.loadConfig = function () {
		let local = JSON.parse(this.data)
		let addon = JSON.parse(this.sync)
		if (addon && addon.theme) this.Log(`[loaded] addon db`)
		if (local && local.theme) this.Log(`[loaded] local db`)
		
		this.config = { ...this.conf, ...addon, ...local }
		this.config.version = this.version
		this.config.is_afk = false

		this.Emit("loaded", this.config)
	}

	// save config updates from panel
	App.saveConfig = function (event) {
		let conf = this.findConfig(event)
		if (!conf) return false
		
		let { name, data, cat } = conf
		this.setConfig(name, data, cat)
		// only emit visual changes in the lobby
		let visual = [ "style", "theme", "u_css", "hotbar" ]
		let update = visual.includes(name) || !this.lobby
		if (update) this.Emit("update", name, data, cat)
	}

	// find the panel item that changed
	App.findConfig = function (event) {
		let elem = event.target
		let item = elem.dataset
		if (!item.opt && !item.for) return false
		// figure out which item to save
		let name = item.for || item.opt
		let bool = elem.type == "checkbox"
		let data = bool ? elem.checked : elem.value
		// if we have a for, get that value
		if (item.for) data = $(`*[data-opt="${ name }"]`).val()
		// return the found config option
		return { name, data, cat: item.cat }
	}

	// handle changing a config value
	App.setConfig = function (name, data, cat = "") {
		// update the value in the config
		if (!cat) this.config[name] = data
		else this.config[cat][name] = data
		// save the updated config values
		let save = JSON.stringify(this.config)
		window.localStorage.setItem("tsdb", save)
		window.postMessage({ tsdb: save }) // sync
		// mirror values with panels
		let prop = typeof data == "boolean" ? "checked" : "value"
		let elem = $(`*[data-opt="${ name }"][data-cat="${ cat }"]`)
		elem.prop(prop, data)
	}

	App.getConfig = function (name, cat) {
		// quickly return a config value
		if (!cat) return this.config[name]
		else return this.config[cat][name]
	}

}