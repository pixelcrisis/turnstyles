// storage.js | saving our configs

module.exports = App => {

	App.readConfig = function () {
		let store = this.__sync || {}
		let local = window.localStorage.getItem("tsdb")
		local = local ? JSON.parse(local) : {}
		if ("theme" in store) this.Log(`loaded addon db`)
		if ("theme" in local) this.Log(`loaded local db`)
		return { ...store, ...local }
	}

	App.writeConfig = function () {
		let local = JSON.stringify(this.config)
		window.localStorage.setItem("tsdb", local)
		// send a message to app to sync database
		window.postMessage({ tsdb: this.config })
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
		if (update) this.Emit("update", name, data, item.cat)
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

	App.getConfig = function (name, cat) {
		if (!cat) return this.config[name]
		else return this.config[cat][name]
	}

}