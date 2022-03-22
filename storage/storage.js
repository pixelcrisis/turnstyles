// storage.js | saving our configs

module.exports = App => {

	require("./configs.js")(App)
	require("./migrate.js")(App)
	require("./restore.js")(App)
	require("./session.js")(App)

	App.db = window.localStorage

	App.readConfig = function () {
		let store = window.localStorage.getItem("tsdb")
		return store ? JSON.parse(store) : {}
	}

	App.writeConfig = function () {
		let store = JSON.stringify(this.config)
		this.db.setItem("tsdb", store)
	}

	App.initConfig = function () {
		// load and build config
		// but only do it once
		if (this.__base) return
		this.__base = window.tsBase
		this.__logo = `${ this.__base }/images/icon128.png`

		let storage = this.readConfig()
		let configs = { ...this.default, ...storage }
		let version = require("../package.json").version

		this.config = this.migrate(configs)
		this.config.version = version
		this.config.is_afk = false

		this.Emit("loaded", this.config)
	}

	App.saveConfig = function (e) {
		let item = e.target.dataset
		if (!item.opt && !item.for) return
		// figure out which item to save
		let name = item.for || item.opt
		let bool = e.target.type == "checkbox"
		let data = bool ? e.target.checked : e.target.value
		if (item.for) data = $(`*[data-opt="${ name }"]`).val()
		// and save the updated item
		this.setConfig(name, data, item.cat)
		// only emit visual changes in the lobby
		let visual = [ "style", "theme", "u_css", "hotbar", "macros" ]
		let update = !this.lobby || visual.includes(name)
		if (update) this.Emit("update", name, data, data.cat)
	}

	App.setConfig = function (name, data, cat) {
		if (!cat) this.config[name] = data
		else this.config[cat][name] = data
		this.writeConfig()
		// mirror values with window / hotbar
		let toggle = typeof data == "boolean"
		let mirror = $(`*[data-opt="${ name }"][data-cat="${ cat || "" }"]`)
		mirror.prop(toggle ? "checked" : "value", data)
	}

}