// attach.js | connect tS to the turntable room

module.exports = tS => {

  tS.prototype.attachRoom = function () {
    if (!window.turntable) return this.log(`no room`)
    // repeat until we find everything
    let again = () => setTimeout(tS.prototype.attachRoom.bind(this), 250)

    this.core = window.turntable
    this.user = this.core.user.id
    this.view = this.core.topViewController

    // find the room and the room manager
    this.room = hasKey(this.core, "roomId")
    if (!this.room) return again()
    this.ttfm = hasKey(this.room, "roomData")
    if (!this.ttfm) return again()

    // record the current song if any
    this.cacheTrack(this.room.currentSong, this.room.upvoters.length)

    // duplicate realVolume for our volume overrides
    this.realVolume = window.turntablePlayer.realVolume

    // bind our event handler
    this.core.addEventListener('message', this.handle.bind(this))
    this.handleLoad()
  }

  // look for prop with key in obj
  const hasKey = function (obj, key) {
    for (let prop in obj) {
      let data = obj[prop]
      if (data !== null && typeof data != "undefined" && data[key]) {
        return data
      }
    }
  }

}