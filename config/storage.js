// storage.js | saving our configs

module.exports = App => {

	App.readConfig = function () {
		let store = this.__sync
		let local = window.localStorage.getItem("tsdb")
		// check for local storage db and synced app db
		local = local ? JSON.parse(local) : {}
		store = store ? JSON.parse(store) : {}
		if (store && store.theme) this.Log(`[loaded] addon db`)
		if (local && local.theme) this.Log(`[loaded] local db`)
		return { ...store, ...local }
	}

	App.writeConfig = function () {
		// write config to local storage
		let local = JSON.stringify(this.config)
		window.localStorage.setItem("tsdb", local)
		// send a message to app to sync config
		window.postMessage({ tsdb: this.config })
	}

	App.saveConfig = function (e) {
		// handle UI config changes
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
		if (update) this.Emit("update", name, data, item.cat)
	}

	App.setConfig = function (name, data, cat) {
		// update value in the config
		if (!cat) this.config[name] = data
		else this.config[cat][name] = data
		this.writeConfig()
		// mirror values with window / hotbar
		let toggle = typeof data == "boolean"
		let mirror = $(`*[data-opt="${ name }"][data-cat="${ cat || "" }"]`)
		mirror.prop(toggle ? "checked" : "value", data)
	}

	App.getConfig = function (name, cat) {
		// quickly return a config value
		if (!cat) return this.config[name]
		else return this.config[cat][name]
	}

}