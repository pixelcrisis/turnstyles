// reload the music players
const playReload = function () {
  let yt = window.youtube
  let sc = window.soundcloudplayer
  // song delay = time to refresh
  // resume song to force update
  if (sc.song) reload_sc(sc)
  if (yt.song) reload_yt(yt)
  // close panel when done
  return this.panelHide()
}

export default app => {
  Object.assign(app, { playReload })
}

const reload_sc = function (sc) {
  sc.songTime = sc.player.currentTime() / 1e3
  sc.previewStartTime = Date.now() - 1000
  sc.resumeSong(sc.song)
}

const reload_yt = function (yt) {
  yt.songTime = yt.player[0].getCurrentTime()
  yt.previewStartTime = Date.now() - 3000
  yt.resumeSong(yt.song)
}