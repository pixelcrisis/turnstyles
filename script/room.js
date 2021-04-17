// room.js | interacting with turntable

module.exports = tS => {

  // portals to tt
  tS.view = () => window.turntable.topViewController

  // chat username lookup
  tS.userName = id => {
    let user = window.turntable.topViewController.userMap[id]
    return user ? user.attributes.name : 'Someone'
  }
  // pm username lookup
  tS.buddyName = id => {
    let chat = window.turntable.buddyList.pmWindows[id]
    return chat ? chat.otherUser.attributes.name : false
  }

  // check for ping
  tS.pinged = str => {
    let ping = `@${window.turntable.user.attributes.name}`
    return str.toLowerCase().indexOf(ping.toLowerCase()) > -1
  }

  // send an actual message to room
  tS.speak = text => {
    let roomid  = window.turntable.topViewController.roomId
    let section = window.turntable.topViewController.section
    let message = { api: 'room.speak', text, roomid, section }

    window.turntable.sendMessage(message)
  }

  // reload the music players
  tS.reloadMusic = () => {
    let yt = window.youtube
    let sc = window.soundcloudplayer
    
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

    // close the panel
    $('#turnStyles').removeClass('active')
  }

  // toggle classes on the body
  tS.toggleClass = (sel, val) => {
    let has = $('body').hasClass(sel)
    if (val && !has) $('body').addClass(sel)
    if (has && !val) $('body').removeClass(sel)
  }

}