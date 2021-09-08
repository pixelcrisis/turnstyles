// logger.js | print logs in console and room

module.exports = app => {

	// our main logger function
	app.Log = function (str) {
		// print the log in the console with timestamp
		let time = new Date().toLocaleTimeString('en-us')
		console.info(`[${time}] turnStyles :: ${str}`)
		// push the log record to the logbook
		if (!this.logbook) this.logbook = []
		str = cleanPaths(str) // clean "inserted" string
		this.logbook.push(`[tS - ${time}] <span>${str}</span>`)
		// only keep the last 50 logs in the logbook
		if (this.logbook.length > 50) this.logbook.shift()

		let logTab = $('#tsLogs')[0]
		if (logTab) {
			// print the logbook contents in the room tab
			logTab.innerHTML = this.logbook.reverse().join('<br>')
			logTab.scrollTop = logTab.scrollHeight
		}
	}

	app.on('attach', function addLogPane () {
    $('#tsLogs').remove()
    $('.room-info-nav').after(`<div id="tsLogs"></div>`)
	})

	// automatic event logs
	app.on('registered', function joinLog (e) {
		for (let user of e.user) {
			this.Log(`[${user.name}](${user.userid}) joined.`)
		}
	})

	app.on('deregistered', function leftLog (e) {
		for (let user of e.user) {
			this.Log(`[${user.name}](${user.userid}) left.`)
		}
	})

	app.on('update_votes', function voteLog (e) {
		let curr = e.room.metadata.votelog
		let vote = curr[curr.length - 1]
		this.Log(`[${this.$Name(vote[0])}] voted: ${vote[1]}`)
	})

	app.on('add_dj', function jumpLog (e) {
		let user = e.user[0].userid
		this.Log(`add dj: [${this.$Name(user)}](${user})`)
	})

	app.on('rem_dj', function dropLog (e) {
		let user = e.user[0].userid
		this.Log(`rem dj: [${this.$Name(user)}](${user})`)
	})

	// trim URLs from inserted logs
	const cleanPaths = str => {
		if (str.indexOf('inserted:') < 0) return str
		let path = str.split('/')
		let file = path[path.length - 1]
		return `inserted: ${file}`
	}

}