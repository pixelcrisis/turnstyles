module.exports = TS => {

	TS.hideSuggest = () => $("#tsSuggest").remove()

	TS.scanSuggest = function () {
		if (!this.config["use.emojis"]) return
		let text = this.getWords($("#chat-input").val())
		let word = text[text.length - 1]
		let icon = word[0] == ":" && word.length > 1
		if (icon) this.findSuggest(word.split(":").join(""))
		else this.hideSuggest()
	}

	TS.findSuggest = function (word) {
		let icons = []
		let match = key => key.indexOf(word) === 0
		let found = (val, key) => { if (match(key)) icons.push(key) }
		this.twitchMap.forEach(found)
		this.bttvMap.forEach(found)
		this.makeSuggest(icons.sort())
	}

	TS.makeSuggest = function (list) {
		this.hideSuggest()
		if (!list.length) return 
		// func to generate our icon HTML
		let icon = name => this.getEmoji(`:${ name }:`)
		let make = name => HTML.ICON( icon(name), name )
		let html = list.map( make ).join("")
		$("body").append( HTML.WRAP(html) )
		$("#tsSuggest .icon").on("click", this.sendSuggest.bind(this))
	}

	TS.sendSuggest = function (event) {
		let name = event.target.dataset.icon
		let text = $("#chat-input").val().split(" ")
		// replace the in progress emoji with complete
		text[text.length - 1] = `${ name } `
		$("#chat-input").val( text.join(" ")).focus()
		this.$view().typeahead.clearTypeahead()
		this.hideSuggest()
	}

	TS.$on("attach", function loadSuggest () {
		this.$on("type", this.scanSuggest)
		$("#chat-input").on("input", this.scanSuggest.bind(this))
	})

}

const HTML = {
	ICON: (ICON, NAME) => `
		<div class="icon" data-icon=":${ NAME }:">
			${ ICON } :${ NAME }:
		</div>
	`,
	WRAP: LIST => `
		<div id="tsSuggest">
			<div class="wrap">${ LIST }</div>
		</div>
	`
}