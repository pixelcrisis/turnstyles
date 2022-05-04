// reload.js | reloads turnStyles, other things

module.exports = App => {

  App.Reload = function () {
    // remove turnstyles
    clearInterval(this.ran)
    $(`script[src*="turnStyles.js"]`).remove()
    window.turntable.removeEventListener("message", this.listener)
    // re-inject the script
    let script = document.createElement("script")
    script.src = `${ this.__base }/turnStyles.js?v=${ Math.random() }`
    script.type = "text/javascript"
    this.Ran("reloading turnStyles")
    document.body.append(script)
  }

  App.reloadMusic = function () {
    let yt = window.youtube
    let sc = window.soundcloudplayer
    // update the song delay as time of refresh
    // then resume the song to force an update
    if (sc.song) this.reloadSC(sc)
    if (yt.song) this.reloadYT(yt)
    // close the panel on finish
    $("#tsPanel").removeClass("active")
  }

  App.reloadSC = function (curr) {
    curr.songTime = curr.player.currentTime() / 1e3
    curr.previewStartTime = Date.now() - 1000
    curr.resumeSong(curr.song)
  }

  App.reloadYT = function (curr) {
    curr.songTime = curr.player[0].getCurrentTime()
    curr.previewStartTime = Date.now() - 3000
    curr.resumeSong(curr.song)
  }

}