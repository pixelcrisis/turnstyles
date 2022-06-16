const tools = {
	get (key) { // parse a config
		let data = this.config[key]
		if (typeof data == "boolean") return data
		if (isNaN(data) || data == "") return data
		return parseInt(data)
	},

	set (key, val) { // set config
		this.config[key] = val
		this.debug(`Set [${ key }] to (${ val })`)
		let db = JSON.stringify(this.config)
		window.localStorage.setItem("tsData", db)
		window.postMessage({ tsData: db })
		this.syncPanel(key, val)
	},

	conf (conf) { // verify configs
		try { conf = JSON.parse(conf) }
		catch (e) { return this.debug(`Invalid Config`, conf) }
		let real = conf && "theme" in conf
		if (real) this.debug(`Loaded Config`, conf)
		return real ? conf : false
	}
}

const events = {
	load: function confLoad () {
		let local = this.conf(this.data) || {}
		let addon = this.conf(this.data) || {}
		this.migrate({ ...addon, ...local })
		this.set("afk.idle", false)
		this.set("dj.next", false)
		this.emit("data", this.config)
	}
}

export default { tools, events }