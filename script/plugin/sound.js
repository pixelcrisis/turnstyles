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
	return this.debug(`Restored Volume`)
}

// toggle the volume control
const volLoad = function () {
	let opt = this.get("use.volume")
	let has = $("body").hasClass("ts-volume")
	if (has && !opt) this.volRem()
	if (opt && !has) this.volAdd()
	return this.bodyClass("ts-volume", opt)
}

// update window volume on change
const volSave = function (vol) {
	vol = vol.target ? vol.target.value : vol
	window.turntablePlayer.setVolume(vol)
	window.util.setSetting("volume", vol)
}

// handle scrolling the volume slider
const volRoll = function (e) {
	let curr = window.util.getSetting("volume")
	let down = e.originalEvent.deltaY > 0
	let step = e.originalEvent.shiftKey ? 0.04 : 0.2
	let save = down ? (curr - step) : (curr + step)
	$("#tsVolSlide").val(save)
	this.volSave(save)
	return false // don't interrupt event flow
}

const volToggle = function () {
	this.muted = !this.muted
	this.bodyClass("ts-muted", this.muted)
	let curr = window.util.getSetting("volume")
	let save = this.muted ? -7 : curr
	window.turntablePlayer.setVolume(save)
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

const $html_vol = () => `
  <div id="tsVolWrap">
    <span id="tsMuteBtn"></span>
    <input id="tsVolSlide" type="range" min="0" max="4" step="0.04" value="${ window.util.getSetting("volume") }">
    <em id="tsMutedMsg">Muted For One Song</em>
  </div>
`