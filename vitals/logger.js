// logger.js | print logs in console and room

module.exports = App => {

	// shortcuts to log types
	App.Log = log => App.Logger(log)
	App.Ran = log => App.Logger(log, "ran")
	App.Err = log => App.Logger(log, "error")

	App.Logger = function (log, type) {
		let time = this.time()
		// make sure that we have permissions to debug
		let perm = this.config ? this.config.debug : true
		if (perm) console.info(`[${ time }] tS - ${ log }`)
		if (perm || type) this.printLog(time, log, type)
	}

	App.printLog = function (time, log, type) {
		// add log to the logbook
		let book = $("#tsLogBook")[0]
		if (!this.logBook) this.logBook = []
		this.logBook.push( loggerHTML(time, log, type) )
		if (this.logBook.length > 50) this.logBook.shift()
		if (book) {
			book.innerHTML = this.logBook.reverse().join("<br>")
			book.scrollTop = book.scrollHeight
		}
	}

	App.bindLogger = function () {
		// build logbook
		this.logBook = []
		$("#tsLogBook").remove()
		$(".room-info-nav").after(`<div id="tsLogBook"></div>`)

		// bind all of our debug log events
		this.Bind("update", function (key, val) {
			this.Log(`update: [${key}] to (${ val })`)
		})

		this.Bind("add_dj", function (event) {
			let id = event.user[0].userid
			this.Log(`add dj: [${ this.findName(id) }](${ id })`)
		})

		this.Bind("rem_dj", function (event) {
			let id = event.user[0].userid
			this.Log(`rem dj: [${ this.findName(id) }](${ id })`)
		})

		this.Bind("update_votes", function (event) {
			let list = event.room.metadata.votelog
			let last = list[list.length - 1]
			this.Log(`[${ this.findName(last[0]) }] voted: ${ last[1] }`)
		})

		this.Bind("registered", function (event) {
			for (let user of event.user) {
				this.Log(`[${ user.name }](${ user.userid }) joined.`)
			}
		})

		this.Bind("deregistered", function (event) {
			for (let user of event.user) {
				this.Log(`[${ user.name }](${ user.userid }) left.`)
			}
		})
	}

}

const loggerHTML = (time, log, type) => `
	<div class="ts-log ${ type }">
		<div>${ time }</div>
		<span>${ clean(log) }</span>
	</div>`

const clean = str => {
  // trim inserted URL file paths
  if (str.indexOf('inserted:') == 0) {
    let path = str.split('/')
    return `inserted: ${path[path.length - 1]}`
  }
  return str
}