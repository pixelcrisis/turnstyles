// removal.js | reset / remove

module.exports = App => {

	App.resetData = function () {
		if (window.confirm(warnReset)) {
			this.updateData(this.default)
		}
	}

	App.deleteData = function () {
		if (window.confirm(warnDelete)) {
			window.localStorage.removeItem("tsdb")
			window.localStorage.setItem("ts-reset", true)
			window.location.reload()
		}
	}

}

const warnReset = `WARNING: You're about to reset your turnStyles Data! 
Clicking "OK" will reset turnStyles to default and reload the extension!
Click "CANCEL" if this is not what you intended to do!`

const warnDelete = `WARNING: You're about to DELETE the turnStyles DATABASE!
THIS WILL RELOAD THE WEB PAGE! USE AS A LAST RESORT!
Click "OK" to delete the turnStyles DB and start over!
Click "CANCEL" to go back to turntable!`