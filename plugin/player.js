module.exports = TS => {

  TS.reloadMusic = function () {
    let yt = window.youtube
    let sc = window.soundcloudplayer
    // update the song delay as time of refresh
    // then resume the song to force an update
    if (sc.song) this.reloadSC(sc)
    if (yt.song) this.reloadYT(yt)
    // close the panel on finish
    this.hidePanel()
  }

  TS.reloadSC = function (curr) {
    curr.songTime = curr.player.currentTime() / 1e3
    curr.previewStartTime = Date.now() - 1000
    curr.resumeSong(curr.song)
  }

  TS.reloadYT = function (curr) {
    curr.songTime = curr.player[0].getCurrentTime()
    curr.previewStartTime = Date.now() - 3000
    curr.resumeSong(curr.song)
  }

}