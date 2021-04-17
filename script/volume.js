// volume.js | replace the turntable volume

module.exports = tS => {

  tS.loadVolume = function loadVolume () {
    let opt = this.config.has_vol
    let has = $('body').hasClass('has-volume')
    this.toggleClass('has-volume', opt)

    // store a copy of realVolume on attach
    let rV = window.turntablePlayer.realVolume
    if (!this.realVolume) this.realVolume = rV

    if (has && !opt) this.remVolume()
    if (opt && !has) this.addVolume()
  }

  // add our volume slider to the DOM
  // bind events for volume and mute
  tS.addVolume = function addVolume () {
    $('.header-content').append(`
      <div id="ts_volume">
        <span id="ts_mute"></span>
        <input id="ts_slider" type="range" 
          min="0" max="100" value="${current()}">
        </input>
        <em id="ts_muted">Muted For One Song</em>
      </div>
    `)

    const scroll = 'DOMMouseScroll mousewheel'
    $('#ts_mute').on('click',   this.toggleMute.bind(this))
    $('#ts_slider').on('input', this.saveVolume.bind(this))
    $('#ts_slider').on(scroll,  this.onVolWheel.bind(this))
  }

  // remove volume slider from the DOM
  // put realVolume back in case we've swapped it
  tS.remVolume = function remVolume () {
    $('#ts_volume').remove()
    window.turntablePlayer.realVolume = this.realVolume
  }

  // set the volume with turntable
  tS.saveVolume = function saveVolume (vol) {
    // handle on event and directly
    vol = vol.target ? vol.target.value : vol
    // undo turntable funky volume math for low volumes
    let volume = vol > 0 ? convert(vol) : -3

    // rewrite tt func to allow vals < 7
    if (volume > 6) window.turntablePlayer.realVolume = this.realVolume
    else window.turntablePlayer.realVolume = current

    window.turntablePlayer.setVolume(volume)
    window.util.setSetting('volume', volume)
  }

  // handle scrolling on the volume input
  tS.onVolWheel = function onVolWheel (e) {
    const curr = current()
    let shifted = e.originalEvent.shiftKey ? 1 : 5
    let descend = e.originalEvent.deltaY > 0
    let updated = descend ? (curr - shifted) : (curr + shifted)
    
    updated = updated < 0 ? 0 : updated > 100 ? 100 : updated
    $('#ts_slider')[0].value = updated
    this.saveVolume(updated)
    return false
  }

  // mute or unmute the volume 
  tS.toggleMute = function toggleMute () {
    this.mute = !this.mute
    $('#ts_volume').toggleClass('muted', this.mute)

    let volume = this.mute ? -3 : convert(current())
    window.turntablePlayer.setVolume(volume)

    this.Log(`turned mute ${ this.mute ? 'on' : 'off' }`)
  }

  // turn off mute if muted on new/no song
  tS.checkMuted = function checkMuted () { 
    if (this.mute) this.toggleMute() 
  }

  tS.on('attach',  tS.loadVolume)
  tS.on('update',  tS.loadVolume)
  tS.on('nosong' , tS.checkMuted)
  tS.on('newsong', tS.checkMuted)

}

const convert = x => Math.log(x / 100) / Math.LN2 + 4

const current = e => {
  let curr = e || window.util.getSetting('volume')
  return 100 * Math.pow(2, curr - 4)
}