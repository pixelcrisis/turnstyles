// removal.js | reset / remove

module.exports = App => {

	App.deleteData = function () {
		window.localStorage.removeItem("tsdb")
		window.localStorage.setItem("ts-reset", true)
		window.location.reload()
	}

	App.resetData = function (data) {
		// use data if given, otherwise
		// reset all values to default
		data = data || this.default
		for (let prop in data) {
			this.config[prop] = data[prop]
		}
		// save the new settings and reload
		let store = JSON.stringify(this.config)
		window.localStorage.setItem("tsdb", store)
		this.reload()
	}

}