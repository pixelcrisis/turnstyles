// emotes.js | getting emotes from twitch/bttv

module.exports = App => {

	App.checkEmote = function (e) {
		if (!this.config.emojis) return
		let words = e.text.split(" "), found = {}
		// check every word for an emote
		for (var i = words.length - 1; i >= 0; i--) {
			let icon = this.findEmote(words[i])
			if (icon) found[ words[i] ] = icon
		}
		let list = Object.keys(found)
		if (list.length) this.renderEmotes(found, list)
	}

	App.findEmote = function (str) {
		// make sure it matches the :syntax:
		if (str[0] != ":" || str[str.length - 1] != ":") return
		let name = str.split(":").join("").toLowerCase()
		// look in both lists for a matching emote
		if (this.twitchIcons[name]) return this.parseTwitch(name)
		if (this.bttvIcons[name]) return this.parseBttv(name)
		return false
	}

	App.parseBttv = function (name) {
		let icon = this.bttvIcons[name]
		let base = "https://cdn.betterttv.net/emote"
		return icon ? `<img src="${ base }/${ icon }/1x">` : false
	}

	App.parseTwitch = function (name) {
		let icon = this.twitchIcons[name]
		let base = "https://static-cdn.jtvnw.net/emoticons/v2"
		return icon ? `<img src="${ base }/${ icon }/static/light/1.0">` : false
	}

	App.parseEmote = function (name) {
		let icon = this.parseTwitch(name)
		if (!icon) icon = this.parseBttv(name)
		return icon
	}

	App.renderEmotes = function (emotes, list) {
		// use the first one to find the messages
		let first = list[0].split(":p").join("")
		let $text = `.chat .text:contains("${ first }")`
		$( $text ).each(function() {
			let html = this.innerHTML
			for (let icon in emotes) {
				let name = icon.split(":p").join("")
				html = html.split( name ).join( emotes[icon] )
			}
			this.innerHTML = html.split(tongue).join("")
		})
	}

	App.typeEmotes = function (e) {
		if (!this.config.emojis) return
		let text = e.target.value.split(" ")
		let word = text[text.length - 1]
		let test = word.length > 1 && word[0] == ":"
		if (word[word.length - 1] == ":") test = false

		if (test) this.addTyping(word)
		else $("#tsTyping").remove()
	}

	App.addTyping = function (text) {
		let icons = []
		let query = text.split(":").join("")
		let found = s => s.indexOf(query) === 0
		let listA = Object.keys(this.twitchIcons)
		let listB = Object.keys(this.bttvIcons)
		for (let i of listA) if ( found(i) ) icons.push(i)
		for (let i of listB) if ( found(i) ) icons.push(i)

		$("#tsTyping").remove()
		let make = this.parseEmote.bind(this)
		let bind = this.selectTyped.bind(this)
		let list = icons.sort().map(name => typeHTML(make, name)).join("")
		let html = `<div id="tsTyping"><div class="wrap">${ list }</div></div>`
		$("body").append( html )
		$("#tsTyping .icon").on("click", bind)
	}

	App.selectTyped = function (e) {
		let name = e.target.dataset.icon
		let text = $("#chat-input").val().split(" ")
		text[text.length - 1] = `${ name } `
		$("#chat-input").val(text.join(" ")).focus()
		$("#tsTyping").remove()
	}

	App.bindEmotes = function () {
		this.Bind("speak", this.checkEmote)
		$("#chat-input").on("input", this.typeEmotes.bind(this))
	}

}

const typeHTML = (make, name) => `
	<div class="icon" data-icon=":${ name }:">
		${ make(name) } :${ name }:
	</div>`

const tongue = `<span title="stuck_out_tongue" class="emoji emoji-stuck_out_tongue emoji-small"></span>`