const tools = {
	realEmoji: str => str[0] == ":" && str[str.length - 1] == ":",

	findEmoji (word) {
		if (!this.realEmoji(word)) return
		let name = word.split(":").join("").toLowerCase()
		let icoA = this.twitMap.get(name)
		if (icoA)  return $twit_icon(icoA)
		let icoB = this.bttvMap.get(name)
		if (icoB)  return $bttv_icon(icoB)
		return false
	},

	makeEmoji (word, icon) {
		let name = no_tongue(word)
		has_emoji().each(function () {
			let html = this.innerHTML.split(name).join(icon)
			this.innerHTML = no_tongue(html)
		})
	}
}

const events = {
	chat: function scanEmoji (e) {
		if (!this.get("use.emojis")) return
		let list = this.strArr(e.text)
		list.forEach(word => {
			let icon = this.findEmoji(word)
			if (icon)  this.makeEmoji(word, icon)
		})
	}
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

const has_emoji = name => `.chat .text:contains("${ name }")`

export default { tools, events }