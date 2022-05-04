// control.js | managing the tsdb

module.exports = App => {

	// backup the configs to a JSON file
	App.backupData = function () {
		let config = JSON.stringify(this.config)
		let backup = new Blob([ config ], { type: "text/json" })
		return downloadFile(backup)
	}

	// read configs from a JSON file
	App.uploadData = function () {
		let file = $("#tsBackup input")[0].files[0]
		if (!file) return alert("Select Backup File First!")
		let Reader = new FileReader()
		Reader.onload = App.restoreData
		Reader.readAsText(file)
	}

	// parse JSON as a config file
	App.restoreData = function (file) {
		let data = JSON.parse(file.target.result)
		if (data.hotbar && data.people) App.updateData(data)
		else alert("Error Reading Backup File!")
	}

	// update config with new config data
	App.updateData = function (data = {}) {
		for (let prop in data) this.config[prop] = data[prop]
		let store = JSON.stringify(this.config)
		window.localStorage.setItem("tsBase", this.__base)
		window.localStorage.setItem("tsdb", store)
		return this.Reload()
	}

	// reset config to defaults
	App.resetData = function () {
		if (window.confirm(warnReset)) {
			this.updateData(this.default)
		}
	}

	// destroy database start over
	App.deleteData = function () {
		if (window.confirm(warnDelete)) {
			window.localStorage.setItem("tsWipe", true)
			window.localStorage.removeItem("tsdb")
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