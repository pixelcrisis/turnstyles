const tools = {
  syncPlayers () {
    let yt = window.youtube
    let sc = window.soundcloudplayer
    if (!yt.song && !sc.song) return
    let play = yt.song ? yt : sc
    let curr = current_time(play, yt.song)
    let time = Date.now() - (yt.song ? 3000 : 1000)
    play.songTime = curr
    play.previewStartTime = time
    play.resumeSong(play.song)
    this.hidePanel()
  }
}

const current_time = function (play, tube) {
  if (!tube) return play.player.currentTime() / 1e3
  else return play.player[0].getCurrentTime()
}

export default { tools }