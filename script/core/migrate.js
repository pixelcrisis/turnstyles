// migrate the db between versions
const migrate = function (old) {
	let version = this.config.version
	let initial = window.localStorage.getItem("tsdb")
	if (initial) old = JSON.parse(initial)
	if (isNaN(version)) version = 11
	if (version < 12 || old) this.migrate12(old)
	if (initial) window.localStorage.removeItem("tsdb")
}

// version 12 migration
const migrate12 = function (old) {
	if (!old) return false
	migrateTo(old, "debug", "debug")
	migrateTo(old, "theme", "theme")
	migrateTo(old, "style", "color")
	migrateTo(old, "u_css", "style")
	migrateTo(old, "auto_b", "autobop")
	migrateTo(old, "emojis", "use.emojis")
	migrateTo(old, "volume", "use.volume")
	migrateTo(old, "played", "use.recent")
	migrateTo(old, "stamps", "use.stamps")
	migrateTo(old, "logger", "use.logger")
	migrateTo(old, "afkstr", "afk.text")
	migrateTo(old, "afkmax", "afk.auto")
	migrateTo(old, "auto_q", "dj.auto")
	migrateTo(old, "q_text", "dj.text")
	migrateTo(old, "people", "show.people")
	migrateTo(old, "player", "show.player")
	migrateTo(old, "bubble", "show.bubble")
	
	migrateTo(old, "qtbtn1", "qtbtn1", "qtbnts")
	migrateTo(old, "qtbtn2", "qtbtn2", "qtbnts")
	migrateTo(old, "qtbtn3", "qtbtn3", "qtbnts")
	
	migrateTo(old, "post", "note.on", "timing")
	migrateTo(old, "text", "note.text", "timing")
	
	migrateTo(old, "ding", "on.song", "notify")
	migrateTo(old, "song", "on.spun", "notify")
	migrateTo(old, "chat", "on.mention", "notify")
	migrateTo(old, "text", "on.text", "notify")
	
	migrateTo(old, "song", "post.song", "alerts")
	migrateTo(old, "spun", "post.spun", "alerts")
	migrateTo(old, "snag", "post.snag", "alerts")
	migrateTo(old, "join", "post.join", "alerts")
	migrateTo(old, "left", "post.left", "alerts")
	
	migrateTo(old, "qtbtn1", "hb.qtbtn1", "hotbar")
	migrateTo(old, "qtbtn2", "hb.qtbtn2", "hotbar")
	migrateTo(old, "qtbtn3", "hb.qtbtn3", "hotbar")
	migrateTo(old, "auto_b", "hb.autobop", "hotbar")
	migrateTo(old, "is_afk", "hb.afk.idle", "hotbar")
	migrateTo(old, "nextdj", "hb.dj.next", "hotbar")
	migrateTo(old, "escort", "hb.dj.done", "hotbar")
	migrateTo(old, "auto_q", "hb.dj.auto", "hotbar")
	migrateTo(old, "people", "hb.people", "hotbar")
	migrateTo(old, "player", "hb.player", "hotbar")
	migrateTo(old, "bubble", "hb.bubble", "hotbar")
	
	this.debug(`Migrated DB to v12`)
	this.config.version = 12
}

// simple config updater
const migrateTo = function (old, name1, name2, cat) {
	if (!name1 in old && !cat) return false
	else if (cat && !cat in old) return false
	let val = cat ? old[cat][name1] : old[name1]
	return this.set(name2, val)
}

export default app => {
	Object.assign(app, { migrate, migrateTo, migrate12 })
}