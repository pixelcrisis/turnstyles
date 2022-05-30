module.exports = TS => {

	TS.$on("log", function () {
		let book = $("#tsLogs")[0] || {}
		let logs = this.logs.map( LOG.ITEM )
		book.innerHTML = logs.reverse().join("")
		book.scrollTop = book.scrollHeight
	})

	TS.$on("attach", function () {
		$("#tsLogBook").remove()
		$(".room-info-nav").after( LOG.BOOK )
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