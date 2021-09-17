// utils.js | interacting with turntable

module.exports = app => {
	
	// quick access to turntable room data
	app.$User = () => window.turntable.user
	app.$View = () => window.turntable.topViewController
	app.$Chat = () => window.turntable.buddyList.pmWindows
	app.$Room = () => window.turntable.topViewController.roomData

	// find username from id
	app.$Name = id => {
		if (!id) return 'Unknown'
		// check the room for the user first
		let user = app.$View().userMap[id]
		if (user) return user.attributes.name
		// else loop through PM windows for user
		if (app.$Chat()) {
			let buds = app.$Chat()[id]
			if (buds) return buds.otherUser.attributes.name
		}
		return 'Unknown' // nowhere else to check
	}

	// check if user was pinged in chat message
	app.pinged = str => {
		if (!str) return false
		let ping = `@${app.$User().attributes.name}`
		return str.toLowerCase().indexOf(ping.toLowerCase()) > -1
	}

	// toggle classes on the DOM
	app.classes = (name, on) => {
		let has = $('body').hasClass(name)
		if (on && !has) $('body').addClass(name)
		if (has && !on) $('body').removeClass(name)
	}

	// reload music players
	app.fixMusic = () => {
		let yt = window.youtube
		let sc = window.soundcloudplayer

		// update the song delay as time of refresh
		// then resume the song to force an update
		if (sc.song) {
			sc.songTime = sc.player.currentTime() / 1e3
			sc.previewStartTime = Date.now() - 1000
			sc.resumeSong(sc.song)
		}

		if (yt.song) {
			yt.songTime = yt.player[0].getCurrentTime()
			yt.previewStartTime = Date.now() - 3000
			yt.resumeSong(yt.song)
		}

		// close the panel on finish
		$('#tsPanel').removeClass('active')
	}

}