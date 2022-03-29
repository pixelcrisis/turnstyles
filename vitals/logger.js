// logger.js | print logs in console and room

module.exports = App => {

	App.Log = function (str) {
		let perm = this.config ? this.config.debug : true
		if (perm) console.info(`[${ this.now() }] turnStyles :: ${ str }`)
		this.addLog(`[tS - ${ this.now() }]<span>${ clean(str) }</span>`)
	}

	App.addLog = function (log) {
		this.logBook.push(log)
		let book = $("#tsLogs")[0]
		let logs = this.logBook.length
		if (logs > 50) this.logBook.shift()
		if (book) {
			book.innerHTML = this.logBook.reverse().join("<br />")
			book.scrollTop = book.scrollHeight
		}
	}

	App.bindLogs = function () {
		$("#tsLogs").remove()
		$(".room-info-nav").after(`<div id="tsLogs"></div>`)
	}

	// log events
	App.on("update", function (key, val) {
		this.Log(`update: [${ key }] to (${ val })`)
	})

	App.on("registered", function (event) {
		for (let user of event.user) {
			this.Log(`[${ user.name }](${ user.userid }) joined.`)
		}
	})

	App.on("deregistered", function (event) {
		for (let user of event.user) {
			this.Log(`[${ user.name }](${ user.userid }) left.`)
		}
	})

	App.on("add_dj", function (event) {
		let id = event.user[0].userid
		this.Log(`add dj: [${ this.findName(id) }](${ id })`)
	})

	App.on("rem_dj", function (event) {
		let id = event.user[0].userid
		this.Log(`rem dj: [${ this.findName(id) }](${ id })`)
	})

	App.on("update_votes", function (event) {
		let list = event.room.metadata.votelog
		let last = list[list.length - 1]
		this.Log(`[${ this.findName(last[0]) }] voted: ${ last[1] }`)
	})

	App.logBook = []

}

const clean = str => {
  // trim inserted URL file paths
  if (str.indexOf('inserted:') == 0) {
    let path = str.split('/')
    return `inserted: ${path[path.length - 1]}`
  }
  return str
}