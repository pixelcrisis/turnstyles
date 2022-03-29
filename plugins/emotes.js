// emotes.js | getting emotes from twitch/bttv

module.exports = App => {

	App.findEmote = function (event) {
		if (!this.config.emojis) return
		let done = false
		let text = event.text.split(" ")
		for (let i = 0; i < text.length; i++) {
			let word = text[i]
			// match words beginning and ending with ":"
			if (word[0] === ":" && word[word.length - 1] == ":") {
				let test = word.split(":").join("")
				// then see if we have a matching emote
				for (let icon of emote) {
					if (test == icon.code.toLowerCase()) {
						done = true
						text[i] = image(icon)
					}
				}
			}
		}
		if (done) App.addEmotes(event.text, text.join(" "))
	}

	App.addEmotes = function (find, replace) {
		let message = $(".chat .messages .message:last-of-type")
		let content = message[0].innerHTML
		let matches = content.indexOf(find) > -1
		if (matches) message[0].innerHTML = content.split(find).join(replace)
	}

	App.on("speak", App.findEmote)

}

const { main, bttv } = require("./emotes.json")
const emote = [ ...main, ...bttv ]
const image = icon => {
	let base = `https://cdn.betterttv.net/emote`
	return `<img src="${base}/${icon.id}/1x.${icon.imageType}">`
}