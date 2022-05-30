module.exports = TS => {

	TS.backupData = function () {
		// backup the configs to a JSON file
		let config = JSON.stringify(this.config)
		let backup = new Blob([ config ], { type: "text/json" })
		return DOWNLOAD_FILE(backup)
	}

	TS.uploadData = function () {
		// read configs from a JSON file
		let file = $("#tsBackup input")[0].files[0]
		if (!file) return alert("Select Backup File First!")
		this.$debug("Restoring Backup...")
		let Reader = new FileReader()
		Reader.onload = this.restoreData.bind(this)
		Reader.readAsText(file)
	}

	TS.restoreData = function (file) {
		let data = {}
		try { data = JSON.parse(file.target.result) }
		catch (e) { return alert("Backup File Corrupted") }
		if (!data.theme) return alert("Invalid Backup File")
		this.Migrate(file.target.result)
		this.updateData()
	}

	TS.updateData = function (data = {}) {
		// update config with new config data
		for (let prop in data) this.config[prop] = data[prop]
		let store = JSON.stringify(this.config)
		window.localStorage.setItem("tsData", store)
		return this.Reload()
	}

	TS.resetData = function () {
		// reset config to defaults
		if (window.confirm( WARN_RESET )) {
			this.updateData(this.default)
		}
	}

	TS.deleteData = function () {
		// destroy database start over
		if (window.confirm( WARN_DELETE )) {
			window.localStorage.setItem("tsWipe", true)
			window.localStorage.removeItem("tsData")
			window.location.reload()
		}
	}

}

const DOWNLOAD_FILE = file => {
	// we can direct download with windows
	let windows = window.navigator.msSaveBlob
	if (windows) return windows(file)
	// otherwise we go via HTML5
	let tmp = window.document.createElement("a")
	tmp.href = window.URL.createObjectURL(file)
	tmp.download = "tsData.json"
	document.body.appendChild(tmp)
	tmp.click()
	document.body.removeChild(tmp)
}

const WARN_RESET = `WARNING: You're about to reset your turnStyles Data! 
Clicking "OK" will reset turnStyles to default and reload the extension!
Click "CANCEL" if this is not what you intended to do!`

const WARN_DELETE = `WARNING: You're about to DELETE the turnStyles DATABASE!
THIS WILL RELOAD THE WEB PAGE! USE AS A LAST RESORT!
Click "OK" to delete the turnStyles DB and start over!
Click "CANCEL" to go back to turntable!`