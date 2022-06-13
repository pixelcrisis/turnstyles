// check for the emoji syntax
const emojiTry = str => str[0] == ":" && str[str.length - 1] == ":"

// return html tag for emojis
const emojiFind = function (word) {
	if (!this.emojiTry(word)) return
	let name = word.split(":").join("").toLowerCase()
	let icoA = this.twitMap.get(name)
	if (icoA) return $twit_icon(icoA)
	let icoB = this.bttvMap.get(name)
	if (icoB) return $bttv_icon(icoB)
	return false
}

// replace emojis in the message
const emojiMake = function (word, icon) {
	let name = no_tongue(word)
	return $(`.chat .text:contains("${ name }")`).each(function () {
		let html = this.innerHTML.split(name).join(icon)
		this.innerHTML = no_tongue(html)
	})
}

// check for emojis to replace
const emojiScan = function (e) {
	if (!this.get("use.emojis")) return
	let list = e.text.split(" ").map(s => s.trim())
	return list.forEach(word => {
		let icon = this.emojiFind(word)
		if (icon) this.emojiMake(word, icon)
	})
}

export default app => {
	app.on("chat", emojiScan)
	Object.assign(app, { emojiTry, emojiFind, emojiMake })
}

const bttv_base = "https://cdn.betterttv.net/emote"
const bttv_link = name => `${ bttv_base }/${ name }/1x`
const $bttv_icon = name => `<img src="${ bttv_link(name) }">`

const twit_base = "https://static-cdn.jtvnw.net/emoticons/v2"
const twit_link = name => `${ twit_base }/${ name }/static/light/1.0`
const $twit_icon = name => `<img src="${ twit_link(name) }">`

const no_tongue = str => str
	.split(":p").join("").split(":P").join("")
	.split(`<span title="stuck_out_tongue" class="emoji emoji-stuck_out_tongue emoji-small"></span>`).join("")