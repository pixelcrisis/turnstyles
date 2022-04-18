// reload.js | reloads turnStyles, other things

module.exports = App => {

  App.Reload = function () {
    // remove turnstyles
    clearInterval(this.looping)
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
    if (sc.song) {
      sc.songTime = sc.player.currentTime() / 1e3
      sc.previewStartTime = Date.now() - 1000
      sc.resumeSong(sc.song)
    }
    if (yt.song) {
      yt.songTime = yt.player[0].getCurrentTime()
      yt.previewStartTime = Date.now() - 3000
      yt.resumeSong(yt.song)
    }
    // close the panel on finish
    $("#tsPanel").removeClass("active")
  }

}