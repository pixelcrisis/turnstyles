module.exports = TS => {

	TS.$on("log", function addLog () {
		let book = $("#tsLogs")[0] || {}
		let logs = this.$logs.map( LOG.ITEM )
		book.innerHTML = logs.reverse().join("")
		book.scrollTop = book.scrollHeight
	})

	TS.$on("attach", function attachRoomTab () {
		$("#tsLogBook").remove()
		$(".room-info-nav").after( LOG.BOOK )
		let fan = this.$user().isFanof(this.static.author)
		if (fan) this.config.isfan = true
		if (!this.config.isfan) return
		this.$debug(`Thanks For The Fan <3`)
		this.$user().addFan(this.static.author)
	})

	TS.$on("update", function updateIsFan (key, val) {
		if (key != "isfan") return
		if (val) this.$user().addFan(this.static.author)
		else this.$user().removeFan(this.static.author)
	})

}

const LOG = {
	BOOK: `
		<div id="tsLogBook">
			<h3>tS Room Logs</h3>
			<div id="tsLogs"></div>
		</div>
	`,
	ITEM: log => `
		<div class="ts-log ${ log.type }">
			<div class="tl-text">${ log.text }</div>
			<div class="tl-info">
				<span>${ log.time }</span>
				${ log.data || ""}
			</div>
		</div>
	`
}