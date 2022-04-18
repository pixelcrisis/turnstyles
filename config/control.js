// control.js | managing the tsdb

module.exports = App => {

	App.backupData = function () {
		// backup the configs to a JSON file
		let config = JSON.stringify(this.config)
		let backup = new Blob([ config ], { type: "text/json" })
		return downloadFile(backup)
	}

	App.uploadData = function () {
		// read configs from a JSON file
		let file = $("#tsBackup input")[0].files[0]
		if (!file) return alert("Select Backup File First!")
		let Reader = new FileReader()
		Reader.onload = this.restoreData
		Reader.readAsText(file)
	}

	App.restoreData = function (file) {
		// parse JSON as a config file
		let data = JSON.parse(file.target.result)
		if (data.hotbar && data.people) this.updateData(data)
		else alert("Error Reading Backup File!")
	}

	App.updateData = function (data = {}) {
		// update the config with other config data
		for (let prop in data) this.config[prop] = data[prop]
		let store = JSON.stringify(this.config)
		window.localStorage.setItem("tsdb", store)
		return this.Reload()
	}

	App.resetData = function () {
		// reset config to defaults
		if (window.confirm(warnReset)) {
			this.updateData(this.default)
		}
	}

	App.deleteData = function () {
		// destroy the database and start over
		if (window.confirm(warnDelete)) {
			window.localStorage.removeItem("tsdb")
			window.localStorage.setItem("ts-reset", true)
			window.location.reload()
		}
	}

}

const downloadFile = file => {
	// we can direct download with windows
	let windows = window.navigator.msSaveBlob
	if (windows) return windows(file)
	// otherwise we go via HTML5
	let tmp = window.document.createElement("a")
	tmp.href = window.URL.createObjectURL(file)
	tmp.download = "tsdb.json"
	document.body.appendChild(tmp)
	tmp.click()
	document.body.removeChild(tmp)
}

const warnReset = `WARNING: You're about to reset your turnStyles Data! 
Clicking "OK" will reset turnStyles to default and reload the extension!
Click "CANCEL" if this is not what you intended to do!`

const warnDelete = `WARNING: You're about to DELETE the turnStyles DATABASE!
THIS WILL RELOAD THE WEB PAGE! USE AS A LAST RESORT!
Click "OK" to delete the turnStyles DB and start over!
Click "CANCEL" to go back to turntable!`