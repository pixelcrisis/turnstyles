module.exports = TS => {

	TS.isEmoji = function (str) {
		// make sure first/last char match syntax
		let cF = word[0], cL = word[word.length - 1]
		return cF == ":" && cL == ":"
	}

	TS.getEmoji = function (word)	{
		if (!this.isEmoji(word)) return false
		let name = word.split(":").join("").toLowerCase()
		// check the twitch map first
		let icoA = this.twitchMap.get(name)
		if (icoA) return TWITCH.ICON(icoA)
		// if nothing, check the bttv map
		let icoB = this.bttvMap.get(name)
		if (icoB) return BTTV.ICON(icoB)
		return false
	}

	TS.genEmoji = function (word, icon) {
		// find the message via the word
		// we have to replace :P because of the emoji
		let name = NO_TONGUE(word)
		$(`.chat .text:contains("${ name }")`).each(function () {
			let html = this.innerHTML.split(name).join(icon)
			this.innerHTML = NO_TONGUE(html)
		})
	}

	TS.$on("chat", function (event) {
		if (!this.config["use.emojis"]) return
		this.getWords(event.text).forEach(word => {
			let icon = this.getEmoji(word)
			if (icon) this.genEmoji(word, icon)
		})

	})

}

const BTTV = {
	BASE: "https://cdn.betterttv.net/emote/", TAIL: "/1x",
	ICON: ICON => `<img src="${ BTTV.BASE }${ ICON }${ BTTV.TAIL }">`
}

const TWITCH = {
	BASE: "https://static-cdn.jtvnw.net/emoticons/v2/", TAIL: "/static/light/1.0",
	ICON: ICON => `<img src="${ TWITCH.BASE }${ ICON }${ TWITCH.TAIL }">`
}

const NO_TONGUE = STR => {
	STR = STR.split(":p").join("")
	STR = STR.split(":P").join("")
	return STR.split(TONGUE).join("")
}

const TONGUE = `<span title="stuck_out_tongue" class="emoji emoji-stuck_out_tongue emoji-small"></span>`