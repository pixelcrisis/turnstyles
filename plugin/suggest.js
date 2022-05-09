// suggest.js | suggest external emojis

module.exports = App => {

	App.runSuggest = function () {
		if (!this.config.emojis) return
		let text = $("#chat-input").val().split(" ")
		let word = text[text.length - 1]
		let last = word[word.length - 1]
		let test = word.length > 1 && word[0] == ":" && last == ":"
		if (test) this.getSuggest(word)
		else $("#tsSuggest").remove()
	}

	App.getSuggest = function (word) {
		word = word.split(":").join("")
		let icons = [], query = word.toLowerCase()
		let listA = Object.keys(this.icoT)
		let listB = Object.keys(this.icoB)

		let found = str => str.indexOf(query) === 0
		for (let i of listA) if ( found(i) ) icons.push(i)
		for (let i of listB) if ( found(i) ) icons.push(i)
		$("#tsSuggest").remove()
		this.genSuggest( icons.sort() )
	}

	App.genSuggest = function (list) {
		if (!list.length) return false
		let getIcon = this.getEmote.bind(this)
		let onClick = this.addSuggest.bind(this)
		let suggest = suggestHTML(getIcon, list)
		$("body").append( suggest )
		$("#tsSuggest .icon").on("click", onClick)
	}

	App.addSuggest = function (e) {
		let name = e.target.dataset.icon
		let text = $("chat-input").val().split(" ")
		text[text.length - 1] = `${ name } `
		$("#chat-input").val( text.join(' ') )
		$("#tsSuggest").remove()
	}

	App.bindSuggest = function () {
		this.Bind("typeahead", this.runSuggest)
		$("#chat-input").on("input", this.runSuggest.bind(this))
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