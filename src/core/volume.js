// volume.js | replace the turntable volume

module.exports = tS => {

  tS.prototype.loadVolume = function () {
    let hasVolume = $('body').hasClass('has-volume')
    
    if (this.config.has_vol && !hasVolume) {
      $('body').addClass('has-volume')
      $('.header-content').append(this.htmlVolume())

      let muted = $('#ts_mute')
      let range = $('#ts_slider')

      muted.on('click', this.toggleMute.bind(this))
      range.on('input', this.saveVolume.bind(this))
      range.on('DOMMouseScroll mousewheel', this.onVolWheel.bind(this))
    }

    else if (!this.config.has_vol && hasVolume) {
      $('#ts_volume').remove()
      $('body').removeClass('has-volume')
      window.turntablePlayer.realVolume = this.realVolume
    }
  }

  tS.prototype.htmlVolume = function () {
    return `
    <div id="ts_volume">
      <span id="ts_mute"></span>
      <input id="ts_slider" type="range" 
        min="0" max="100" value="${this.currVolume()}">
      </input>
      <em id="ts_muted">Muted For One Song</em>
    </div>`
  }

  tS.prototype.currVolume = function (e) {
    // conert TT's volume to 100 scale
    let curr = e || window.util.getSetting('volume')
    return 100 * Math.pow(2, curr - 4)
  }

  tS.prototype.saveVolume = function (vol) {
    vol = vol.target ? vol.target.value : vol
    // convert our volume to 100 scale
    let scaled = x => Math.log(x / 100) / Math.LN2 + 4
    let volume = vol > 0 ? scaled(vol) : -3

    // rewrite tt func to allow values below 7
    if (volume > 6) window.turntablePlayer.realVolume = this.realVolume
    else window.turntablePlayer.realVolume = this.currVolume

    window.turntablePlayer.setVolume(volume)

    let save = () => { window.util.setSetting('volume', volume) }
    this.suspend(save, 1, 'volume')
  }

  tS.prototype.toggleMute = function () {
    this.mute = !this.mute
    $('#ts_volume').toggleClass('muted', this.mute)
    window.turntablePlayer.setVolume(this.mute ? 0 : this.currVolume())
    this.log(`turned mute ${ this.mute ? 'on' : 'off' }`)
  }

  tS.prototype.onVolWheel = function (e) {
    let current = window.youtube.futureVolume
    if (current < 0) current = this.currVolume()
    let shifted = e.originalEvent.shiftKey ? 1 : 5
    let descend = e.originalEvent.deltaY > 0
    let updated = descend ? (current - shifted) : (current + shifted)
    
    updated = updated < 0 ? 0 : updated
    $('#ts_slider')[0].value = updated
    this.saveVolume(updated)
    return false
  }

}