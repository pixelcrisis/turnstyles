const tools = {
	backupData () {
		let config = JSON.stringify(this.config)
		let backup = backup_ts(config)
		return this.download(backup, "tsData.json")
	},

	uploadData () {
		let file = $("#tsBackup input")[0].files[0]
		if (!file) return alert(`Select Backup File!`)
		else this.debug(`Restoring Backup...`)
		let Reader = new FileReader()
		Reader.onload = this.restoreData.bind(this)
		Reader.readAsText(file)
	},

	restoreData (file) {
		let backup = this.conf(file.target.result)
		if (!backup) return alert(`Invalid Backup File`)
		this.migrate(backup)
	},

	refreshData () {
		if (!window.confirm(refresh_ts)) return
		this.config = { ...this.default }
	},

	destroyData () {
		if (!window.confirm(destroy_ts)) return
		window.localStorage.removeItem("tsData")
		window.localStorage.setItem("tsWipe", true)
		window.location.reload()
	}
}

const backup_ts = str => new Blob([ str ], { type: "text/json" })
const refresh_ts = `WARNING: This will reset your turnStyles Data! 
Clicking "OK" will reset turnStyles to default and reload the extension!
Click "CANCEL" if this is not what you intended to do!`
const destroy_ts = `WARNING: This will DELETE the turnStyles DATABASE!
THIS WILL RELOAD THE WEB PAGE! USE AS A LAST RESORT!
Click "OK" to delete the turnStyles DB and start over!
Click "CANCEL" to go back to turntable!`

export default { tools }