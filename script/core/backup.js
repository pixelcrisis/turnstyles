// backup config to JSON file
const dataBackup = function () {
	let config = JSON.stringify(this.config)
	let backup = new Blob([ config ], { type: "text/json" })
	return download_file(backup)
}

// upload and parse a JSON file
const dataUpload = function () {
	let file = $("#tsBackup input")[0].files[0]
	if (!file) return alert("Select Backup First!")
	this.debug(`Restoring Backup...`)
	let Read = new FileReader()
	Read.onload = this.dataRestore.bind(this)
	return Read.readAsText(file)
}

// apply restored JSON configs
const dataRestore = function (file) {
	let conf = this.confScan(file.target.result)
	if (!conf) return alert("Invalid Backup File")
	this.migrate(conf)
	return this.dataUpdate(conf)
}

// update config values
const dataUpdate = function (data = {}) {
	Object.assign(this.config, data)
	let tsData = JSON.stringify(this.config)
	window.localStorage.setItem("tsData", store)
	window.postMessage({ tsData })
	return this.reload()
}

// reset config to defaults
const dataReset = function () {
	if (!window.confirm(warn_reset)) return
	return this.dataUpdate(this.default)
}

// destroy the entire config
const dataDelete = function () {
	if (!window.confirm(warn_delete)) return
	window.localStorage.setItem("tsWipe", true)
	window.localStorage.removeItem("tsData")
	return window.location.reload()
}


export default app => {
	Object.assign(app, {
		dataBackup, dataUpload, dataRestore,
		dataUpdate, dataReset, dataDelete
	})
}

const download_file = file => {
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

const warn_reset = `WARNING: You're about to reset your turnStyles Data! 
Clicking "OK" will reset turnStyles to default and reload the extension!
Click "CANCEL" if this is not what you intended to do!`

const warn_delete = `WARNING: You're about to DELETE the turnStyles DATABASE!
THIS WILL RELOAD THE WEB PAGE! USE AS A LAST RESORT!
Click "OK" to delete the turnStyles DB and start over!
Click "CANCEL" to go back to turntable!`