// emote.js | getting emotes from twitch/bttv

module.exports = App => {

	App.runEmote = function (e) {
		if (!this.config.emojis) return
		let words = e.text.split(" "), found = {}
		for (let i = 0; i < words.length; i++) {
			let icon = this.getEmote(words[i])
			if (icon) found[ words[i] ] = icon
		}
		let list = Object.keys(found)
		if (list.length) this.genEmote(found, list)
	}

	App.getEmote = function (str) {
		let last = str.length - 1
		if (str[0] != ":" || str[last] != ":") return
		let name = str.split(":").join("").toLowerCase()

		let icon = this.icoT[name]
		let base = "https://static-cdn.jtvnw.net/emoticons/v2"
		if (icon) return `<img src="${ base }/${ icon }/static/light/1.0">`

		icon = this.icoB[name]
		base = "https://cdn.betterttv.net/emote"
		if (icon) return `<img src="${ base }/${ icon }/1x">`

		return false
	}

	App.genEmote = function (emotes, list) {
		// use the first one to find the messages
		let first = list[0].split(":p").join("").split(":P").join("")
		let $text = `.chat .text:contains("${ first }")`
		$( $text ).each(function() {
			let html = this.innerHTML
			for (let icon in emotes) {
				let name = icon.split(":p").join("").split(":P").join("")
				html = html.split( name ).join( emotes[icon] )
			}
			this.innerHTML = html.split(tongue).join("")
		})
	}

	App.bindEmotes = function () {
		this.Bind("speak", this.runEmote)
	}

}

const tongue = `<span title="stuck_out_tongue" class="emoji emoji-stuck_out_tongue emoji-small"></span>`