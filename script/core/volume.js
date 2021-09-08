// volume.js | replace the turntable volume

module.exports = app => {

	// load/unload volume functionality
	app.loadVolume = function () {
		// toggle volume on or off
		let opt = this.config.has_vol
		let has = $('body').hasClass('ts_vol')

		// update the body class
		this.classes('ts_vol', opt)

		// make sure we have a copy of realVolume
		let rV = window.turntablePlayer.realVolume
		if (!this.realVolume) this.realVolume = rV

		// turn volume control on or off 
		if (opt && !has) this.addVolume()
		if (has && !opt) this.remVolume()
	}

	// inject the volume UI into tt
	app.addVolume = function () {
		// add our HTML template
		$('.header-content').append(`
			<div id="tsVolume">
				<span id="tsMute"></span>
				<input id="tsSlider" type="range" 
					min="0" max="100" value="${ currentVol() }">
				</input>
				<em id="tsMuted">Muted For One Song</em>
			</div>
		`)
		// bind up our events
		const scroll = 'DOMMouseScroll mousewheel'
		$('#tsMute').on('click', this.muteVolume.bind(this))
		$('#tsSlider').on('input', this.saveVolume.bind(this))
		$('#tsSlider').on( scroll, this.rollVolume.bind(this))
	}

	// remove the volume UI from tt
	app.remVolume = function () {
		$('#tsVolume').remove() // remove the HTML
		// make sure we restore realVolume to the original
		window.turntablePlayer.realVolume = this.realVolume
	}

	// update volume on ts volume change
	app.saveVolume = function (vol) {
		// handle both direct calls and on event
		// convert values so turntable understands
		vol = vol.target ? vol.target.value : vol
		let volume = vol > 0 ? convertVol(vol) : -3

		// turntable doesn't natively go lower than 7
		let volFunc = volume < 7 ? currentVol : this.realVolume
		window.turntablePlayer.realVolume = volFunc

		// send the saved volume to turntable
		window.turntablePlayer.setVolume(volume)
		window.util.setSetting('volume', volume)
	}

	// handle scrolling on volume slider
	app.rollVolume = function (e) {
		let curr = currentVol()
		// handle scrolling on the slider
		// first, check for scroll direction
		let down = e.originalEvent.deltaY > 0
		// step volume by 5 vs 1 if holding shift
		let step = e.originalEvent.shiftKey ? 1 : 5
		// update the volume based on current volume
		let save = down ? (curr - step) : (curr + step)
		// (obviously we should keep the scale 0 -100)
		save = save < 0 ? 0 : save > 100 ? 100 : save

		$('#tsSlider')[0].value = save
		this.saveVolume(save)
		return false // don't interrupt event flow
	}

	// temp mute on volume icon click
	app.muteVolume = function () {
		// toggle mute on/off
		this.muted = !this.muted
		this.classes('ts_muted', this.muted)
		// tt doesn't recognize 0 as 0, so -3
		let vol = this.muted ? -3 : naturalVol()
		window.turntablePlayer.setVolume(vol)

		this.Log(`turned mute ${ this.muted ? 'on' : 'off' }`)
	}

	// unmute after every song
	app.checkMuted = function () {
		// toggle mute off if on for next song
		if (this.muted) this.muteVolume()
	}

	// bind our volume events
	app.on('attach',  app.loadVolume)
	app.on('update',  app.loadVolume)
	app.on('nosong' , app.checkMuted)
	app.on('newsong', app.checkMuted)

}

// why doesn't turntable use standard linear volumes?
const convertVol = x => Math.log(x / 100) / Math.LN2 + 4

const currentVol = e => {
	// get the volume (in real numbers) from tt
	let curr = e || window.util.getSetting('volume')
	return 100 * Math.pow(2, curr - 4)
}

// get the volume from tt, but make it spicy
const naturalVol = () => convertVol(currentVol())