const events = {
	log: function saveLog () {
		let book = $("#tsLog .book")[0] || {}
		let logs = this.logs.map($log_item)
		book.innerHTML = logs.join("")
		book.scrollTop = book.scrollHeight
	},

	attach: function makeLog () {
		$("#tsLog").remove()
		$(".room-info-nav").after($log_book)
	}
}

const $log_book = `
	<div id="tsLog">
		<h3>tS Room Logs</h3>
		<div class="book"></div>
	</div>
`
const $log_item = log => `
	<div class="ts-log ${ log.type }">
		<div class="tl-time">${ log.time }</div>
		<div class="tl-text">${ log.text }</div>
		${ log.data ? `<div class="tl-data">${ log.data }</div>` : `` }
	</div>
`

export default { events }