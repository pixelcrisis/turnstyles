// logger.js | print logs in console and room

module.exports = app => {

	// our main logger function
	app.Log = function (str) {
		// print the log in the console with timestamp
		console.info(`[${this._now()}] turnStyles :: ${str}`)
		
		// record to the logbook
		str = this._clean(str)
		this.logbook = this.logbook || []
		this.logbook.push(`[tS - ${this._now()}] <span>${str}</span>`)
		if (this.logbook.length > 50) this.logbook.shift()

		// update the logbook
		if (app.Logs()) {
			app.Logs().innerHTML = this.logbook.reverse().join('<br>')
			app.Logs().scrollTop = app.Logs().scrollHeight
		}
	}

	// logbook access
	app.Logs = () => $('#tsLogs')[0]

	// attach logbook to room tab
	app.on('attach', function attachLogBook () {
    $('#tsLogs').remove()
    $('.room-info-nav').after(`<div id="tsLogs"></div>`)
	})

	// automatic event logs
	app.on('registered', function joinLog (e) {
		for (let u of e.user) this.Log(`[${u.name}](${u.userid}) joined.`)
	})

	app.on('deregistered', function leftLog (e) {
		for (let u of e.user) this.Log(`[${u.name}](${u.userid}) left.`)
	})

	app.on('add_dj', function jumpLog (e) {
		let id = e.user[0].userid
		this.Log(`add dj: [${this.$Name(id)}](${id})`)
	})

	app.on('rem_dj', function dropLog (e) {
		let id = e.user[0].userid
		this.Log(`rem dj: [${this.$Name(id)}](${id})`)
	})

	app.on('update_votes', function voteLog (e) {
		let curr = e.room.metadata.votelog
		let vote = curr[curr.length - 1]
		this.Log(`[${this.$Name(vote[0])}] voted: ${vote[1]}`)
	})

}