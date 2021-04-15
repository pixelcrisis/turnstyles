// volume.js | replace the turntable volume

module.exports = tS => {

  tS.loadVolume = function loadVolume () {
    let opt = this.config.has_vol
    let has = $('body').hasClass('has-volume')
    this.toggleClass('has-volume', opt)

    if (has && !opt) this.remVolume()
    if (opt && !has) this.addVolume()
  }

  tS.addVolume = function addVolume () {
    $('.header-content').append(layout)

    const scroll = 'DOMMouseScroll mousewheel'
    $('#ts_mute').on('click',   this.toggleMute.bind(this))
    $('#ts_slider').on('input', this.saveVolume.bind(this))
    $('#ts_slider').on(scroll,  this.onVolWheel.bind(this))
  }

  tS.remVolume = function remVolume () {
    $('#ts_volume').remove()
    window.turntablePlayer.realVolume = this.realVolume
  }

  tS.saveVolume = function saveVolume (vol) {
    vol = vol.target ? vol.target.value : vol
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

  tS.checkMuted = function checkMuted () { 
    if (this.mute) this.toggleMute() 
  }

  tS.toggleMute = function toggleMute () {
    this.mute = !this.mute
    $('#ts_volume').toggleClass('muted', this.mute)

    let volume = this.mute ? -3 : convert(current())
    window.turntablePlayer.setVolume(volume)

    this.Log(`turned mute ${ this.mute ? 'on' : 'off' }`)
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

const layout = `
  <div id="ts_volume">
    <span id="ts_mute"></span>
    <input id="ts_slider" type="range" 
      min="0" max="100" value="${current()}">
    </input>
    <em id="ts_muted">Muted For One Song</em>
  </div>
`