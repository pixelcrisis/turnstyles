// emotes.js | getting emotes from twitch/bttv

module.exports = App => {

	App.checkEmote = function (e) {
		if (!this.config.emojis) return
		let words = e.text.split(" "), found = {}
		// check every word for an emote
		for (var i = words.length - 1; i >= 0; i--) {
			let icon = this.emoteFind(words[i])
			if (icon) found[ words[i] ] = icon
		}
		let list = Object.keys(found)
		if (list.length) this.emoteRender(found, list)
	}

	App.emoteFind = function (str) {
		// make sure it matches the :syntax:
		if (str[0] != ":" || str[str.length - 1] != ":") return
		let name = str.split(":").join("").toLowerCase()
		// look in both lists for a matching emote
		return this.emoteParse(name)
	}

	App.emoteParse = function (name) {
		let icon = this.emoteTwitch(name)
		return icon || this.emoteBttv(name)
	}

	App.emoteBttv = function (name) {
		let icon = this.bttvIcons[name]
		let base = "https://cdn.betterttv.net/emote"
		return icon ? `<img src="${ base }/${ icon }/1x">` : false
	}

	App.emoteTwitch = function (name) {
		let icon = this.twitchIcons[name]
		let base = "https://static-cdn.jtvnw.net/emoticons/v2"
		return icon ? `<img src="${ base }/${ icon }/static/light/1.0">` : false
	}

	App.emoteRender = function (emotes, list) {
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

	App.bindEmotes = function () {
		this.Bind("speak", this.checkEmote)
		this.Bind("typeahead", this.checkSuggest)
		let onInput = this.checkSuggest.bind(this)
		$("#chat-input").on("input", onInput)
	}

}

const tongue = `<span title="stuck_out_tongue" class="emoji emoji-stuck_out_tongue emoji-small"></span>`