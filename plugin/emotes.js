// emotes.js | getting emotes from twitch/bttv

module.exports = App => {

	App.runEmote = function (event) {
		if (!this.config.emojis) return
		let text = event.text.split(" ")
		for (var i = 0; i < text.length; i++) {
			let icon = this.getEmote(text[i])
			if (icon) text[i] = icon
		}
		if (event.text !== text.join(" ")) {
			this.addEmote(event.text, text.join(" "))
		}
	}

	App.getEmote = function (str) {
		let find = this.findEmote(str)
		if (!find) return false

		let icon = this.findTwitchEmote(find)
		if (!icon) icon = this.findBTTVEmote(find)
		return icon
	}

	App.addEmote = async function (find, replace) {
		// check for replaced :P smileys
		if (find.indexOf(":p") > -1) find = find.split(":p")[0]
		let $el = $(".chat .message:last-of-type .text:last-of-type")[0]
		if (!$el.innerHTML.indexOf(find) < 0) return
		$el.innerHTML = replace
	}

	App.findEmote = function (str) {
		let raw = str.split(":").join("").toLowerCase()
		let has = str[0] === ":" && str[str.length - 1] === ":"
		return has ? raw : false
	}

	App.findTwitchEmote = function (name) {
		let icon = this.twitchIcons[name]
		if (!icon) return false
		let base = `https://static-cdn.jtvnw.net/emoticons/v2/`
		return `<img src="${ base }/${ icon }/static/light/1.0">`
	}

	App.findBTTVEmote = function (name) {
		let icon = this.bttvIcons[name]
		if (!icon) return false
		let base = `https://cdn.betterttv.net/emote`
		return `<img src="${ base }/${ icon }/1x">`
	}

	App.on("speak", App.runEmote)

}