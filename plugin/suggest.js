module.exports = TS => {

	TS.hideSuggest = () => $("#tsSuggest").remove()

	TS.scanSuggest = function () {
		if (!this.config["use.emojis"]) return
		let text = this.getWords($("#chat-input").val())
		let word = text[text.length - 1]
		let icon = word[0] == ":" && word.length > 1
		if (icon) this.findSuggest(word)
		else this.hideSuggest()
	}

	TS.findSuggest = function (word) {
		let icons = []
		let match = key => key.indexOf(name) === 0
		let found = (val, key) => { if (match(key)) icons.push(key) }
		this.twitchMap.forEach(found)
		this.bttvMap.forEach(found)
		this.makeSuggest(icons.sort())
	}

	TS.makeSuggest = function (list) {
		if (!list.length) return this.hideSuggest()
		// func to generate our icon HTML
		let click = this.sendSuggest.bind(this)
		let image = name => HTML.ICON( this.getEmote(name), name )
		$("body").append( HTML.WRAP( list.map( image ) ) )
		$("#tsSuggest .icon").on("click", click)
	}

	TS.sendSuggest = function (event) {
		let name = event.target.dataset.icon
		let text = $("#chat-input").val().split(" ")
		// replace the in progress emoji with complete
		text[text.length - 1] = `${ name } `
		$("#chat-input").val( text.join(" "))
		this.hideSuggest()
	}

	TS.$on("attach", function () {
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