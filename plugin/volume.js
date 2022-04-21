// volume.js | replace the turntable volume

module.exports = App => {

	// add or remove volume control
	App.loadVolume = function () {
		let opt = this.config.volume
		let has = $("body").hasClass("ts-volume")
		// disable volume controls
		if (has && !opt) {
			$("#tsVolWrap").remove()
			window.turntablePlayer.realVolume = this.realVolume
			this.Log(`[volume] removed`)
		}
		// or add volume controls
		if (opt && !has) {
			let scroll = "DOMMouseScroll mousewheel"
			$(".header-content").append( volumeHTML() )
			$("#tsMuteBtn").on("click", this.toggleMute.bind(this))
			$("#tsVolSlide").on("input", this.saveVolume.bind(this))
			$("#tsVolSlide").on(scroll, this.rollVolume.bind(this))
			this.Log(`[volume] added`)
		}
		this.bodyClass("ts-volume", opt)
	}

	// update window volume on change
	App.saveVolume = function (vol) {
		vol = vol.target ? vol.target.value : vol
		let volume = vol > 0 ? makeVolume(vol) : -7
		// turntable doesn't natively go lower than 7
		// so decide to use tt volume or our own 
		let volFunc = volume < 7 ? currVolume : this.realVolume
		window.turntablePlayer.realVolume = volFunc
		window.turntablePlayer.setVolume(volume)
		window.util.setSetting("volume", volume)
	}

	// handle the scrollbar
	App.rollVolume = function (e) {
		let curr = currVolume()
		// get direction of scrolling
		let down = e.originalEvent.deltaY > 0
		// we step by 5 if holding shift
		let step = e.originalEvent.shiftKey ? 1 : 5
		let save = down ? (curr - step) : (curr + step)
		$("#tsVolSlide")[0].value = save
		this.saveVolume(save)
		return false // don't interrupt event flow
	}

	App.toggleMute = function () {
		this.muted = !this.muted
		this.bodyClass("ts-muted", this.muted)
		let vol = this.muted ? -7 : trueVolume()
		window.turntablePlayer.setVolume(vol)
		this.Ran(`[mute] ${ this.muted ? "on" : "off" }`)
	}

	App.checkMuted = function () {
		// unmute if muted after current song
		if (this.muted) this.toggleMute()
	}

	App.bindVolume = function () {
		// stash realVolume to replace
		let rv = window.turntablePlayer.realVolume
		if (!this.realVolume) this.realVolume = rv

		this.Bind("update", this.loadVolume)
		this.Bind("nosong", this.checkMuted)
		this.Bind("newsong", this.checkMuted)

		this.loadVolume()
	}

}

// why doesn't turntable use standard linear volumes?
const makeVolume = x => Math.log(x / 100) / Math.LN2 + 4
const currVolume = e => {
	// get the volume (in real numbers) from tt
	let curr = e || window.util.getSetting("volume")
	return 100 * Math.pow(2, curr - 4)
}
// get the volume from tt, but make it spicy
const trueVolume = () => makeVolume(currVolume())

const volumeHTML = () => `
  <div id="tsVolWrap">
    <span id="tsMuteBtn"></span>
    <input id="tsVolSlide" type="range" min="0" max="100" value="${ currVolume() }">
    <em id="tsMutedMsg">Muted For One Song</em>
  </div>
`