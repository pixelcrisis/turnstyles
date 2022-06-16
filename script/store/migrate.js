const tools = {
	migrate (conf) {
		this.config = { ...this.default }
		// handle any older config remnants
		let older = window.localStorage.getItem("tsdb")
		if (older)  conf = JSON.parse(older)
		if (older)  window.localStorage.removeItem("tsdb")
		// start migrating our passed config
		let which = version(conf.version)
		if (which < 12) this.upgrade(rules12, conf)
		else this.refresh(conf) // current properties
		this.set("version", 12)
	},

	upgrade (rules, conf) {
		rules.forEach(rule => {
			if (rule.sub && !conf[rule.sub]) return
			if (!rule.sub && !rule.old in conf) return
			if (rule.sub && !rule.old in conf[rule.sub]) return
			let data = conf[rule.sub || rule.old]
			if (rule.sub) data = data[rule.old]
			this.set(rule.new, data)
		})
	},

	refresh (conf) {
		for (let name in conf) {
			if (!conf in this.config) return
			else this.set(name, conf[name])
		}
	}
}

const version = v => isNaN(v) ? 10 : parseInt(v)
const rules12 = [
	{ old: "style", new: "color" },
	{ old: "u_css", new: "style" },
	{ old: "auto_b", new: "autobop" },
	{ old: "emojis", new: "use.emojis" },
	{ old: "volume", new: "use.volume" },
	{ old: "played", new: "use.recent" },
	{ old: "stamps", new: "use.stamps" },
	{ old: "logger", new: "use.logger" },
	{ old: "people", new: "hide.people" },
	{ old: "player", new: "hide.player" },
	{ old: "bubble", new: "hide.bubble" },
	{ old: "afkmax", new: "afk.auto" },
	{ old: "afkstr", new: "afk.text" },
	{ old: "auto_q", new: "dj.auto" },
	{ old: "q_text", new: "dj.text" },
	{ old: "qtbtn1", new: "qtbtn1", sub: "qtbtns" },
	{ old: "qtbtn2", new: "qtbtn2", sub: "qtbtns" },
	{ old: "qtbtn3", new: "qtbtn3", sub: "qtbtns" },
	{ old: "post", new: "note.on", sub: "timing" },
	{ old: "text", new: "note.text", sub: "timing" },
	{ old: "chat", new: "on.pm", sub: "notify" },
	{ old: "song", new: "on.song", sub: "notify" },
	{ old: "text", new: "on.text", sub: "notify" },
	{ old: "ding", new: "on.mention", sub: "notify"},
	{ old: "song", new: "post.song", sub: "alerts" },
	{ old: "spun", new: "post.spun", sub: "alerts" },
	{ old: "snag", new: "post.snag", sub: "alerts" },
	{ old: "join", new: "post.join", sub: "alerts" },
	{ old: "left", new: "post.left", sub: "alerts" },
	{ old: "qtbtn1", new: "hb.qtbtn1", sub: "hotbar" },
	{ old: "qtbtn2", new: "hb.qtbtn2", sub: "hotbar" },
	{ old: "qtbtn3", new: "hb.qtbtn3", sub: "hotbar" },
	{ old: "auto_b", new: "hb.autobop", sub: "hotbar" },
	{ old: "is_afk", new: "hb.afk.idle", sub: "hotbar" },
	{ old: "nextdj", new: "hb.dj.next", sub: "hotbar" },
	{ old: "escort", new: "hb.dj.done", sub: "hotbar" },
	{ old: "auto_q", new: "hb.dj.auto", sub: "hotbar" },
	{ old: "shared", new: "hb.share", sub: "hotbar" }
]

export default { tools }