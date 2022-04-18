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
		return `<img src="${ base }/${ icon }/1x">`
	}

	App.parseTwitch = function (name) {
		let icon = this.twitchIcons[name]
		let base = "https://static-cdn.jtvnw.net/emoticons/v2"
		return `<img src="${ base }/${ icon }/static/light/1.0">`
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

	App.bindEmotes = function () {
		this.Bind("speak", this.checkEmote)
	}

}

const tongue = `<span title="stuck_out_tongue" class="emoji emoji-stuck_out_tongue emoji-small"></span>`