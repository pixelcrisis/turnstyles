// add volume controls
const volAdd = function () {
	let scroll = "DOMMouseScroll mousewhell"
	$(".header-content").append($html_vol())
	$("#tsMuteBtn").on("click", this.volToggle.bind(this))
	$("#tsVolSlide").on(scroll, this.volRoll.bind(this))
	$("#tsVolSlide").on("input", this.volSave.bind(this))
	return this.debug(`Replaced Volume`)
}

// disable volume controls
const volRem = function () {
	$("#tsVolWrap").remove()
	window.turntablePlayer.realVolume = this.realVolume
	return this.debug(`Restored Volume`)
}

// toggle the volume control
const volLoad = function () {
	// stash realVolume to replace
	let rv = window.turntablePlayer.realVolume
	if (!this.realVolume) this.realVolume = rv
	// load or unload our volume control
	let opt = this.get("use.volume")
	let has = $("body").hasClass("ts-volume")
	if (has && !opt) this.volRem()
	if (opt && !has) this.volAdd()
	return this.bodyClass("ts-volume", opt)
}

// update window volume on change
const volSave = function (vol) {
	vol = vol.target ? vol.target.value : vol
	let volume = vol > 0 ? make_vol(vol) : -7
	// tt doesn't go lower than 7 so we'll do it
	let getVol = volume < 7 ? curr_vol : this.realVolume
	window.turntablePlayer.realVolume = getVol
	window.turntablePlayer.setVolume(volume)
	window.util.setSetting("volume", volume)
}

// handle scrolling the volume slider
const volRoll = function (e) {
	let curr = curr_vol()
	let down = e.originalEvent.deltaY > 0
	let step = e.originalEvent.shiftKey ? 1 : 5
	let save = down ? (curr - step) : (curr + step)
	$("#tsVolSlide").val(save)
	this.volSave(save)
	return false // don't interrupt event flow
}

const volToggle = function () {
	this.muted = !this.muted
	this.bodyClass("ts-muted", this.muted)
	let vol = this.muted ? -7 : full_vol()
	window.turntablePlayer.setVolume(vol)
	this.print(`Turned Mute ${ this.muted ? "On" : "Off" }`)
}

const unmuteAfter = function () { 
	if (this.muted) this.volToggle()
}

export default app => {
	app.on("song", unmuteAfter)
	app.on([ "attach", "save" ], volLoad)
	Object.assign(app, { volAdd, volRem, volSave, volRoll, volToggle })
}

// why doesn't turntable use standard linear volumes?
const make_vol = x => Math.log(x / 100) / Math.LN2 + 4
const room_vol = x => window.util.getSetting("volume")
const curr_vol = e => 100 * Math.pow(2, (e || room_vol()) - 4)
// get the volume from tt, but make it spicy
const full_vol = () => make_vol(curr_vol())

const $html_vol = () => `
  <div id="tsVolWrap">
    <span id="tsMuteBtn"></span>
    <input id="tsVolSlide" type="range" min="0" max="100" value="${ curr_vol() }">
    <em id="tsMutedMsg">Muted For One Song</em>
  </div>
`