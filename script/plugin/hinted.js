const tools = {
	hideHints: () => $("#tsHints").remove(),

	findHints (word) {
		let list = []
		let pass = key => key.indexOf(word) == 0
		let test = key => pass(key) && list.push(key)
		this.twitMap.forEach((val, key) => test(key))
		this.bttvMap.forEach((val, key) => test(key))
		this.listHints(list.sort())
	},

	listHints (list) {
		this.hideHints()
		if (!list.length) return
		let icon = name => this.findEmoji(`:${ name }:`)
		let item = name => $ts_icons(name, icon(name))
		let body = list.map(name => item(name)).join("")
		$("body").append($ts_hints(body))
		$("#tsHints .icon").on("click", this.sendHints.bind(this))
	},

	sendHints (e) {
		let chat = $("#chat-input")
		let text = chat.val().split(" ")
		let name = e.target.dataset.icon
		text[text.length - 1] = `:${ name }:`
		chat.val(text.join(" ")).focus()
		this.view.typeahead.clearTypeahead()
		this.hideHints()
	}
}

const events = {
	type: function scanHints (text) {
		if (!this.get("use.emojis")) return
		let list = text.split(" ")
		let word = list[list.length - 1]
		let done = word[word.length - 1] == ":"
		let icon = word[0] == ":" && !done
		let name = word.split(":").join("")
		if (icon)  return this.findHints(name)
		this.hideHints()
	}
}

const $ts_hints = list => `
	<div id="tsHints"><div class="wrap">${ list }</div></div>
`
const $ts_icons = (name, icon) => `
	<div class="icon" data-icon="${ name }">${ icon } :${ name }:</div>
`

export default { tools, events }