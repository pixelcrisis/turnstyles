// logger.js | print logs in console and room

module.exports = App => {

	// shortcuts to log types
	App.Log = (text, info) => App.Logger("log", text, info)
	App.Ran = (text, info) => App.Logger("ran", text, info)
	App.Err = (text, info) => App.Logger("err", text, info)

	App.Logger = function (type, text, info) {
		let perm = this.config ? this.config.debug : true
		let post = perm || type != "log"

		let full = `tS [${ this.time() }] ${ text } ${ info || "" }`

		if (perm) console.info(full)
		if (post) this.postLog(type, text, info)
	}

	App.postLog = function (type, text, info) {
		this.logBook = this.logBook || []
		if (this.logBook.length > 49) this.logBook.shift()
		
		let opts = { type, text, info, time: this.time() }
		this.logBook.push( loggerHTML(opts) )

		let book = $("#tsLogs")[0] || {}
		let logs = [ ...this.logBook ].reverse()
		book.innerHTML = logs.join("")
		book.scrollTop = book.scrollHeight
	}

	App.bindLogger = function () {
		$("#tsLogBook").remove()
		$(".room-info-nav").after( logBookHTML )
	}

}

const logBookHTML = `
	<div id="tsLogBook">
		<h3>tS Room Logs</h3>
		<div id="tsLogs"></div>
	</div>`

const loggerHTML = opts => `
	<div class="ts-log ${ opts.type }">
		<div class="tl-text">${ clean( opts.text ) }</div>
		<div class="tl-info">
			<span>${ opts.time }</span>
			${ opts.info  || ""}
		</div>
	</div>`

const clean = str => {
	return str
  // trim inserted URL file paths
  if (str.indexOf('inserted:') == 0) {
    let path = str.split('/')
    return `inserted: ${path[path.length - 1]}`
  }
  return str
}