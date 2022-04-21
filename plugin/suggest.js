// suggest.js | suggest external emojis

module.exports = App => {

	App.checkSuggest = function (e) {
		if (!this.config.emojis) return
		let text = e.target.value.split(" ")
		let word = text[text.length - 1]
		let test = word.length > 1 && word[0] == ":"
		if (word[word.length - 1] == ":") test = false

		if (test) this.suggestEmotes(word)
		else $("#tsTyping").remove()
	}

	App.suggestEmotes = function (text) {
		let icons = []
		let query = text.split(":").join("")
		let found = s => s.indexOf(query) === 0
		let listA = Object.keys(this.twitchIcons)
		let listB = Object.keys(this.bttvIcons)
		for (let i of listA) if ( found(i) ) icons.push(i)
		for (let i of listB) if ( found(i) ) icons.push(i)

		$("#tsTyping").remove()
		this.bindSuggest( icons.sort() )
	}

	App.suggestThis = function (e) {
		let name = e.target.dataset.icon
		let text = $("#chat-input").val().split(" ")
		text[text.length - 1] = `${ name } `
		$("#chat-input").val(text.join(" ")).focus()
		$("#tsTyping").remove()
	}

	App.bindSuggest = function (list) {
		let getIcon = this.emoteParse.bind(this)
		let onClick = this.suggestThis.bind(this)
		$("body").append( suggestHTML(getIcon, list) )
		$("#tsTyping .icon").on("click", onClick)
	}

}

const suggestHTML = (icon, list) => `
	<div id="tsTyping">
		<div class="wrap">
			${ list.map(name => iconHTML(icon, name)).join("") }
		</div>
	</div>
`

const iconHTML = (icon, name) => `
	<div class="icon" data-icon=":${ name }:">
		${ icon(name) } :${ name }:
	</div>`