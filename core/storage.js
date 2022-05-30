module.exports = TS => {

	TS.$on("load", function () {
		// read our local / addon dbs
		let local = JSON.parse(this.data)
		let addon = JSON.parse(this.sync)
		if (addon && addon.theme) this.$debug('Loaded Addon DB', addon)
		if (local && local.theme) this.$debug('Loaded Local DB', local)

		this.config = { ...this.default, ...addon, ...local }
		this.Migrate()

		this.$emit("loaded", this.config)
	})

	TS.setConfig = function (name, data) {
		// handle changing a config value
		this.config[name] = data
		// store the updated config values
		let tsData = JSON.stringify(this.config)
		window.localStorage.setItem("tsData", tsData)
		window.postMessage({ tsData }) // addon sync
		this.syncPanel(name, data)
		this.$debug(`Set [${ name }] to [${ data }]`)
	}

}