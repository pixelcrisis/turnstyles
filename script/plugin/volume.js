const tools = {
	showVol () {
		$(tt_header).append($ts_volume())
		$(ts_muting).on("click", this.muteVol.bind(this))
		$(ts_slider).on("input", this.saveVol.bind(this))
		$(ts_slider).on(on_roll, this.rollVol.bind(this))
		this.debug(`Replaced Volume`)
	},

	hideVol () {
		$("#tsVolume").remove()
		this.debug(`Restored Volume`)
	},

	loadVol () {
		let opt = this.get("use.volume")
		let has = $("body").hasClass("ts-volume")
		if (has && !opt) this.showVol()
		if (opt && !has) this.hideVol()
		this.bodyClass("ts-volume", opt)
	},

	saveVol (vol) {
		vol = vol.target ? vol.target.value : vol
		window.turntablePlayer.setVolume(vol)
		window.util.setSetting("volume", vol)
	},

	rollVol (e) {
		let down = e.originalEvent.deltaY > 0
		let step = e.originalEvent.shiftKey ? 0.2 : 0.04
		let curr = window.util.getSetting("volume")
		let roll = down ? (curr - step) : (curr + step)
		$(ts_slider).val(roll)
		this.saveVol(roll)
	},

	muteVol () {
		this.muted = !this.muted
		this.bodyClass("ts-muted", this.muted)
		let curr = window.util.getSetting("volume")
		let save = this.muted ? -7 : curr
		window.turntablePlayer.setVolume(save)
		this.print(`Turned Mute ${ this.onOff(this.muted) }`)
	}
}

const events = {
	song: function unmuteAfter () { 
		this.muted && this.muteVol() 
	},

	save: tools.loadVol,
	attach: tools.loadVol
}

const ts_muting = "#tsMuteBtn"
const ts_slider = "#tsVolSlide"
const tt_header = ".header-content"
const on_roll = "DOMMouseScroll mousewheel"

const $ts_volume = () => `
  <div id="tsVolume">
    <span id="tsMuteBtn"></span>
    <input id="tsVolSlide" type="range" min="0" max="4" step="0.04" value="${ window.util.getSetting("volume") }">
    <em id="tsMutedMsg">Muted For One Song</em>
  </div>
`

export default { tools, events }