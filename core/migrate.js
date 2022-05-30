module.exports = TS => {

	TS.Migrate = function (old) {
		let ver = this.config.version
		let tmp = window.localStorage.getItem("tsdb")
		if (tmp) old = JSON.parse(tmp)
		if (isNaN(ver)) ver = 11
		if (ver < 12 || old) this.migrate12(old)
		if (tmp) window.localStorage.removeItem("tsdb")
	}

	TS.migrate12 = function(old) {
		if (!old) return false

		if ("debug" in old) this.config["debug"] = old.debug
		if ("theme" in old) this.config["theme"] = old.theme
		if ("style" in old) this.config["color"] = old.style
		if ("u_css" in old) this.config["style"] = old.u_css

		if ("auto_b" in old) this.config["autobop"] = old.auto_b

		if ("emojis" in old) this.config["use.emojis"] = old.emojis
		if ("volume" in old) this.config["use.volume"] = old.volume
		if ("played" in old) this.config["use.recent"] = old.played
		if ("stamps" in old) this.config["use.stamps"] = old.stamps
		if ("logger" in old) this.config["use.logger"] = old.logger

		if ("afkstr" in old) this.config["afk.text"] = old.afkstr
		if ("afkmax" in old) this.config["afk.auto"] = old.afkmax

		if ("auto_q" in old) this.config["dj.auto"] = old.auto_q
		if ("q_text" in old) this.config["dj.text"] = old.q_text

		if ("people" in old) this.config["show.people"] = old.people
		if ("player" in old) this.config["show.player"] = old.player
		if ("bubble" in old) this.config["show.bubble"] = old.bubble

		if ("qtbtns" in old) {
			if (old.qtbtns.qtbtn1) this.config["qtbtn1"] = old.qtbtns.qtbtn1
			if (old.qtbtns.qtbtn2) this.config["qtbtn2"] = old.qtbtns.qtbtn2
			if (old.qtbtns.qtbtn3) this.config["qtbtn3"] = old.qtbtns.qtbtn3
		}

		if ("timing" in old) {
			this.config["note.on"] = old.timing.post
			this.config["note.text"] = old.timing.text
		}

		if ("notify" in old) {
			this.config["on.pm"] = old.notify.ding
			this.config["on.song"] = old.notify.song
			this.config["on.mention"] = old.notify.chat
			this.config["on.text"] = old.notify.text
		}

		if ("alerts" in old) {
			this.config["post.song"] = old.alerts.song
			this.config["post.spun"] = old.alerts.spun
			this.config["post.snag"] = old.alerts.snag
			this.config["post.join"] = old.alerts.join
			this.config["post.left"] = old.alerts.left
		}

		if ("hotbar" in old) {
			this.config["hb.qtbtn1"] = old.hotbar.qtbtn1
			this.config["hb.qtbtn2"] = old.hotbar.qtbtn2
			this.config["hb.qtbtn3"] = old.hotbar.qtbtn3
			this.config["hb.autobop"] = old.hotbar.auto_b
			this.config["hb.afk.idle"] = old.hotbar.is_afk
			this.config["hb.dj.next"] = old.hotbar.nextdj
			this.config["hb.dj.done"] = old.hotbar.escort
			this.config["hb.dj.auto"] = old.hotbar.auto_q
			this.config["hb.people"] = old.hotbar.people
			this.config["hb.player"] = old.hotbar.player
			this.config["hb.bubble"] = old.hotbar.bubble
		}

		this.$debug("Migrated DB to v12")
		this.config.version = 12
	}

}