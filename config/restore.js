// restore.js | backup / restore / reset

module.exports = App => {

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

	App.backupData = function () {
		let config = JSON.stringify(this.config)
		let backup = new Blob([ config ], { type: "text/json" })
		// special use case for windows
		if (window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveBlob(backup, "tsdb.json")
		}
		// otherwise go the HTML5 route
		else {
			let el = window.document.createElement("a")
			el.href = window.URL.createObjectURL(backup)
			el.download = "tsdb.json"
			document.body.appendChild(el)
			el.click()
			document.body.removeChild(el)
		}
	}

	App.uploadData = function () {
		let file = $("#tsBackup input")[0].files[0]
		if (!file) return alert("Select Backup File First")
		
		let Read = new FileReader()
		Read.onload = App.restoreData
		Read.readAsText(file)
	}

	App.restoreData = function (event) {
		let data = JSON.parse(event.target.result)
		if (data.hotbar && data.people) App.resetData(data)
		else alert("Error Reading Backup File")
	}

}