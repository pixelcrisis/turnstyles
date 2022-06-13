const get = function (key) {
	let val = this.config[key]
	if (typeof val == "boolean") return val
	return isNaN(val) ? val : parseInt(val)
}

const set = function (key, val) {
	this.config[key] = val
	// store the updated values
	this.debug(`Set [${ key }] to (${ val })`)
	let tsData = JSON.stringify(this.config)
	window.localStorage.setItem("tsData", tsData)
	window.postMessage({ tsData })
	return this.panelSync(key, val)
}

// simple validate a config 
const confTry = function (conf) {
	try { conf = JSON.parse(conf) }
	catch (e) {
		this.debug(`Invalid Conf`, conf)
		return false
	}
	let pass = conf && "theme" in conf
	if (pass) this.debug(`Loaded Conf`, conf)
	return pass ? conf : false
}

// initial read local / addon dbs
const confLoad = function () {
	let local = this.confTry(this.data) || {}
	let addon = this.confTry(this.sync) || {}
	this.config = { ...this.default, ...addon, ...local }
	this.migrate()
	this.set("afk.idle", false)
	this.set("dj.next", false)
	return this.emit("data", this.config)
}

import apply_backups from "./backup.js"
import apply_migrate from "./migrate.js"

export default app => {
	app.on("load", confLoad)
	Object.assign(app, { confTry, set, get })
	apply_backups(app)
	apply_migrate(app)
}