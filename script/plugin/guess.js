// check for emoji guesses while typing
const guessScan = function (text) {
	if (!this.get("use.emojis")) return
	let list = text.split(" ")
	let word = list[list.length - 1]
	let icon = word[0] == ":" && word.length > 1
	let name = word.split(":").join("")
	if (icon) return this.guessFind(name)
	else return this.guessHide()
}

// checks for a partial emoji name
const guessFind = function (word) { let list = []
	let match = key => key.indexOf(word) == 0
	let found = key => match(key) && list.push(key)
	this.twitMap.forEach((val, key) => found(key))
	this.bttvMap.forEach((val, key) => found(key))
	return this.guessMake(list.sort())
}

// build the guessing window
const guessMake = function (list) {
	this.guessHide()
	if (!list.length) return
	let find = name => this.emojiFind(`:${ name }:`)
	let item = name => $guess_icon( find(name), name )
	let html = $guess_wrap(list.map(item).join(""))
	let send = this.guessSend.bind(this)
	$("body").append(html)
	$("#tsGuess .icon").on("click", send)
}

// send an emoji guess to chat input
const guessSend = function (e) {
	let chat = $("#chat-input")
	let text = chat.val().split(" ")
	let name = e.target.dataset.icon
	text[text.length - 1] = `:${ name }: `
	chat.val(text.join(" ")).focus()
	this.view.typeahead.clearTypeahead()
	return this.guessHide()
}

const guessHide = () => $("#tsGuess").remove()

export default app => {
	app.on("type", guessScan)
	Object.assign(app, { 
		guessFind, guessMake, guessSend, guessHide
	})
}

const $guess_wrap = list => `
	<div id="tsGuess"><div class="wrap">${ list }</div></div>
`

const $guess_icon = (icon, name) => `
	<div class="icon" data-icon="${ name }">${ icon } :${ name }:</div>
`