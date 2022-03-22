// volume.js | replace the turntable volume

module.exports = App => {
	// why doesn't turntable use standard linear volumes?
	const convertVol = x => Math.log(x / 100) / Math.LN2 + 4
	const currentVol = e => {
		// get the volume (in real numbers) from tt
		let curr = e || window.util.getSetting("volume")
		return 100 * Math.pow(2, curr - 4)
	}
	// get the volume from tt, but make it spicy
	const naturalVol = () => convertVol(currentVol())

	// load volume functionality
	App.loadVolume = function () {
		let opt = this.config.volume
		let has = $("body").hasClass("ts_vol")
		this.classes("ts_vol", opt)

		// stash a copy of realVolume
		let rV = window.turntablePlayer.realVolume
		if (!this.realVolume) this.realVolume = rV

		// turn volume control on or off 
		if (opt && !has) this.addVolume()
		if (has && !opt) this.remVolume()
	}

	// inject our volume UI into tt
	App.addVolume = function () {
		$(".header-content").append(volume(currentVol()))
		// bind up our events
		const scroll = "DOMMouseScroll mousewheel"
		$("#tsMute")  .on("click", this.muteVolume.bind(this))
		$("#tsSlider").on("input", this.saveVolume.bind(this))
		$("#tsSlider").on( scroll, this.rollVolume.bind(this))
	}

	// remove our volume UI from tt
	App.remVolume = function () {
		$("#tsVolume").remove()
		window.turntablePlayer.realVolume = this.realVolume
	}

	// update volume on ts volume change
	App.saveVolume = function (vol) {
		vol = vol.target ? vol.target.value : vol
		let volume = vol > 0 ? convertVol(vol) : -3
		// turntable doesn"t natively go lower than 7
		let volFunc = volume < 7 ? currentVol : this.realVolume
		window.turntablePlayer.realVolume = volFunc
		window.turntablePlayer.setVolume(volume)
		window.util.setSetting("volume", volume)
	}

	// handle scrolling on volume slider
	App.rollVolume = function (e) {
		let curr = currentVol()
		let down = e.originalEvent.deltaY > 0
		// step volume by 5 vs 1 if holding shift
		let step = e.originalEvent.shiftKey ? 1 : 5
		let save = down ? (curr - step) : (curr + step)
		save = save < 0 ? 0 : save > 100 ? 100 : save

		$("#tsSlider")[0].value = save
		this.saveVolume(save)
		return false // don"t interrupt event flow
	}

	// temp mute on volume icon click
	App.muteVolume = function () {
		// toggle mute on/off
		this.muted = !this.muted
		this._class("ts_muted", this.muted)
		let vol = this.muted ? -3 : naturalVol()
		window.turntablePlayer.setVolume(vol)

		this.Log(`turned mute ${ this.muted ? "on" : "off" }`)
	}

	// unmute after every song
	App.checkMuted = function () {
		if (this.muted) this.muteVolume()
	}

	// reload music players
	App.fixMusic = () => {
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
		$("#tsPanel").removeClass("active")
	}

	// bind our volume events
	App.on("attach",  App.loadVolume)
	App.on("update",  App.loadVolume)
	App.on("nosong" , App.checkMuted)
	App.on("newsong", App.checkMuted)

}

const volume = val => `
  <div id="tsVolume">
    <span id="tsMute"></span>
    <input id="tsSlider" type="range" min="0" max="100" value="${ val }">
    <em id="tsMuted">Muted For One Song</em>
  </div>
`