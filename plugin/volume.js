module.exports = TS => {

	TS.loadVolume = function () {
		// toggle volume control
		let opt = this.config["use.volume"]
		let has = $("body").hasClass("ts-volume")
		// disable volume controls
		if (has && !opt) {
			$("#tsVolWrap").remove()
			window.turntablePlayer.realVolume = this.realVolume
			this.$debug(`Restored Volume`)
		}
		// or add volume controls
		if (opt && !has) {
			let scroll = "DOMMouseScroll mousewheel"
			$(".header-content").append( VOL.HTML() )
			$("#tsMuteBtn").on("click", this.toggleMute.bind(this))
			$("#tsVolSlide").on("input", this.saveVolume.bind(this))
			$("#tsVolSlide").on(scroll, this.rollVolume.bind(this))
			this.$debug(`Replaced Volume`)
		}
		this.$body("ts-volume", opt)
	}

	TS.saveVolume = function (vol) {
		// update window volume on change
		vol = vol.target ? vol.target.value : vol
		let volume = vol > 0 ? VOL.MAKE(vol) : -7
		// turntable doesn't natively go lower than 7
		// so decide to use tt volume or our own 
		let volFunc = volume < 7 ? VOL.CURR : this.realVolume
		window.turntablePlayer.realVolume = volFunc
		window.turntablePlayer.setVolume(volume)
		window.util.setSetting("volume", volume)
	}

	TS.rollVolume = function (e) {
		// handle scrollbar
		let curr = VOL.CURR()
		// get direction of scrolling
		let down = e.originalEvent.deltaY > 0
		// we step by 5 if holding shift
		let step = e.originalEvent.shiftKey ? 1 : 5
		let save = down ? (curr - step) : (curr + step)
		$("#tsVolSlide")[0].value = save
		this.saveVolume(save)
		return false // don't interrupt event flow
	}

	TS.toggleMute = function () {
		this.muted = !this.muted
		this.$body("ts-muted", this.muted)
		let vol = this.muted ? -7 : VOL.FULL()
		window.turntablePlayer.setVolume(vol)
		this.$print(`Turned Mute ${ this.muted ? "On" : "Off" }`)
	}

	TS.$on("update", TS.loadVolume)
	TS.$on("attach", function attachVolume () {
		// stash realVolume to replace
		let rv = window.turntablePlayer.realVolume
		if (!this.realVolume) this.realVolume = rv
		this.loadVolume()
	})

	TS.$on("song", function unmuteAfter () {
		// unmute if muted after current song
		if (this.muted) this.toggleMute()
	})

}

const VOL = {
	// why doesn't TT use standard linear volumes?
	MAKE: x => Math.log(x / 100) / Math.LN2 + 4,
	CURR: e => {
		// get the volume (in real numbers) from tt
		let curr = e || window.util.getSetting("volume")
		return 100 * Math.pow(2, curr - 4)
	},
	FULL: () => VOL.MAKE( VOL.CURR() ),
	HTML: () => `
	  <div id="tsVolWrap">
	    <span id="tsMuteBtn"></span>
	    <input id="tsVolSlide" type="range" min="0" max="100" value="${ VOL.CURR() }">
	    <em id="tsMutedMsg">Muted For One Song</em>
	  </div>
	`
}