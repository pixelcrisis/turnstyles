(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
  "name": "turnStyles",
  "version": "5.7.0",
  "main": "turnStyles.js",
  "repository": "git@github.com:pixelcrisis/turntable-tweaks.git",
  "author": "pixelcrisis <pxcrisis@gmail.com>",
  "license": "MIT",
  "scripts": {
    "b:1": "browserify -p tinyify turnStyles.js -o build/turnStyles.js",
    "b:2": "node-sass turnStyles.sass -o build && postcss build/turnStyles.css --use autoprefixer --no-map -d build/",
    "b:3": "node-sass sass/themes -o build/themes && postcss build/themes/*.css --use autoprefixer --no-map -d build/themes/",
    "b:4": "node-sass sass/styles -o build/styles && postcss build/styles/*.css --use autoprefixer --no-map -d build/styles/",
    "b:5": "cp -R static/. build/",
    "w:1": "watchify turnStyles.js -o build/turnStyles.js",
    "w:2": "node-sass turnStyles.sass -wo build",
    "w:3": "node-sass sass/themes -wo build/themes",
    "w:4": "node-sass sass/styles -wo build/styles",
    "build": "yarn b:1 && yarn b:2 && yarn b:3 && yarn b:4 && yarn b:5",
    "watch": "concurrently \"yarn w:1\" \"yarn w:2\" \"yarn w:3\" \"yarn w:4\""
  },
  "devDependencies": {
    "autoprefixer": "^10.2.5",
    "babel-eslint": "^10.1.0",
    "browserify": "^17.0.0",
    "concurrently": "^6.0.0",
    "eslint": "^7.22.0",
    "node-sass": "^5.0.0",
    "postcss": "^8.2.9",
    "postcss-cli": "^8.3.1",
    "sass": "^1.32.8",
    "tinyify": "^3.0.0",
    "watchify": "^4.0.0"
  },
  "dependencies": {}
}

},{}],2:[function(require,module,exports){
// afk.js | respond to dings with an AFK message

module.exports = tS => {

  // check for when is_afk is set to true
  // and then send the afk_ping message
  tS.on('update', function setAfk (key, val) {
    if (key != 'is_afk') return
    let msg = this.config.afk_ping
    if (val && msg) this.speak(msg)
  })

  tS.on('speak', function checkAfk (e) {
    let afk = this.config.is_afk
    let msg = this.config.afk_ping

    // if pinged and afk, send the afk reminder
    if (!e.$self && e.$ping && afk && msg) this.speak(msg)

    // if we sent the message and it's not the afk reminder
    // then we're obviously not AFK anymore.
    else if (e.$self && afk && e.text != msg) {
      this.writeConfig('is_afk', false)
      this.postToChat(`Welcome Back!`, `I've turned off AFK for you!`, 'stat')
    }
  })

}
},{}],3:[function(require,module,exports){
// alerts.js | sending data to chat/notifications

module.exports = tS => {

  tS.on('pmmed', function alertPM (e) {
    if (!this.config.ping_pm) return
    let head = `New PM ${e.$from ? `from: ${e.$from}` : ''}`
    this.notifyUser(head, e.text, 'pm_ping')
  })

  tS.on('speak', function alertPing (e) {
    if (!e.$ping || !this.config.ping_chat) return
    let head = `[${this.view().roomData.name}] @${e.name}`
    this.notifyUser(head, e.text, 'chat_ping')
  })

  tS.on('speak', function alertMatched (e) {
    let list = this.config.ping_word.split(",")
    for (let word of list) {
      let text = e.text.toLowerCase()
      let find = word.trim().toLowerCase()
      if (text.indexOf(find) > -1) {
        $('.chat .messages .message:last-child').addClass('mention')
        let head = `[${this.view().roomData.name}] Found: ${word}`
        return this.notifyUser(head, e.text, 'match_ping')
      }
    }
  })

  tS.on('snagged', function alertSnag (e) {
    if (!this.config.chat_snag) return
    this.postToChat(e.$name, `has snagged this track!`, 'snag')
  })

  tS.on('registered', function alertJoin (e) {
    for (let user of e.user) {
      this.Log(`[${user.name}](${user.userid}) joined.`)
      
      if (this.config.chat_join) {
        this.postToChat(user.name, `joined.`, 'join')
      }
    }
  })

  tS.on('deregistered', function alertJoin (e) {
    for (let user of e.user) {
      this.Log(`[${user.name}](${user.userid}) left.`)
      
      if (this.config.chat_join) {
        this.postToChat(user.name, `left.`, 'left')
      }
    }
  })

  tS.on('update_votes', function alertVote (e) {
    let curr = e.room.metadata.votelog
    let vote = curr[curr.length - 1]
    let name = this.userName(vote[0])
    this.Log(`[${name}] voted: ${vote[1]}`)
  })

}
},{}],4:[function(require,module,exports){
// attach.js | connect tS to the turntable room

module.exports = tS => {

  tS.init = function initTurnStyles () {
    this.__base = window.tsBase || 'https://ts.pixelcrisis.co/build'
    // load any saved user configs
    let storage = window.localStorage.getItem("tsdb")
    let configs = storage ? JSON.parse(storage) : {}
    let version = require('../package.json').version
    // load and apply our defaults
    this.config = { ...this.default, ...configs, version }
    this.config.is_afk = false
    this.emit('loaded', this.config)
    this.attach()
  }

  // attach to a turntable room
  tS.attach = function attachTurntable () {
    let core = window.turntable
    if (!core) return this.Log(`no room`)

    // check for lobby
    this.lobby = $('#turntable #topBG').length
    if (this.lobby) return this.buildWindow()

    // make sure we've attached to everything possible
    let again = () => setTimeout(tS.attach.bind(this), 150)

    if (!core.user) return again()

    let room = findKey(core, "roomId")
    if (!room) return again()
    
    let full = findKey(room, "roomData")
    if (!full) return again()

    // bind our event handler
    this.handler = this.handle.bind(this)
    window.turntable.addEventListener('message', this.handler)

    this.emit('attach', room)
    this.Log(`loaded room`)
  }

  // unload and reload all of turnstyles
  // mainly for dev use to update without refresh 
  tS.reload = function reloadTurnstyles () {
    clearInterval(this.heart)
    window.turntable.removeEventListener('message', this.handler)
    $(`script[src*="turnStyles.js"]`).remove()
    
    const script = document.createElement('script')
    script.src = `${this.__base}/turnStyles.js?${Math.random()}`
    script.type = "text/javascript"
    
    this.Log(`reloading`)
    document.body.append(script)
  }

}

// look for prop with key in obj
const findKey = function (obj, key) {
  for (let prop in obj) {
    let data = obj[prop]
    if (data !== null && typeof data != "undefined" && data[key]) {
      return data
    }
  }
}
},{"../package.json":1}],5:[function(require,module,exports){
// autobop.js | always boppin

module.exports = tS => {

  // fire our autobop at a random interval
  tS.autoBop = function autoBop () {
    if (this.bopping) clearTimeout(this.bopping)
    if (!this.config.autobop) return

    let delay = (Math.random() * 7) * 100
    this.bopping = setTimeout(bop, delay)
  }

  // fire autobop on load, new song
  tS.on('attach',  tS.autoBop)
  tS.on('newsong', tS.autoBop)

}

// "click" the awesome button
const bop = () => {
  $(window).focus()
  let opts = { bubbles: true, cancelable: true, view: window }
  let elem = document.querySelectorAll('.awesome-button')[0]
  let fire = new MouseEvent('click', opts)
  return !elem.dispatchEvent(fire)
}
},{}],6:[function(require,module,exports){
// cache.js | handles storing tt data

module.exports = tS => {

  // cache all DJs + song on room load
  tS.on('attach', function buildCache (room) {
    for (let id of room.djids) this.cacheNewDJ(id)
    this.cacheTrack(room.currentSong)
  })

  // keep a record of the vote score
  tS.on('update_votes', function cacheVotes (e) {
    this.now_playing.love = e.room.metadata.upvotes
    this.now_playing.hate = e.room.metadata.downvotes
  })

  // keep track of snags as well
  tS.on('snagged', function cacheSnags () {
    this.now_playing.snag += 1
  })

  // cache new DJs as they appear
  tS.cacheNewDJ = function cacheNewDJ (e, data) {
    // handle both direct IDs and events
    let user = e.user ? e.user[0].userid : e
    let curr = this.current_djs[user]
    let name = this.userName(user)
    // only cache if DJ doesn't exist
    if (!curr) this.current_djs[user] = {
      // add data if provided otherwise default 0
      spun: data && data.spun ? data.spun : 0,
      love: data && data.love ? data.love : 0,
      hate: data && data.hate ? data.hate : 0,
      snag: data && data.snag ? data.snag : 0,
    }

    this.Log(`new dj: [${name}](${user})`)
  }

  // when a DJ stops, print out the stats and clear them
  tS.clearOldDJ = function clearOldDJ (e) {
    let name = e.user[0].name
    let user = e.user[0].userid
    // if we haven't tracked them??
    if (!this.current_djs[user]) return
    // generate the stats,
    let stat = { ...this.current_djs[user] }
    let data = `${stat.love}❤️${stat.hate}💔${stat.snag}💖${stat.spun}▶️`
    // delete the user from cache and emit the dropped event
    delete this.current_djs[user]

    this.Log(`old dj: [${name}] (${user})`)
    this.emit('dropped', name, data)
  }

  // cache new/no songs and pass data around
  tS.cacheTrack = function cacheTrack (e) {
    // extract tt song info if any provided
    // handle calling directly on a song and through events
    let song = e && e.room ? e.room.metadata.current_song : e
    let love = e && e.upvoters ? e.upvoters.length : 0
    let djid = song? song.djid : false

    // update last_played and now_playing
    let last = { ...this.now_playing }
    let base = { love, hate: 0, snag: 0, dj: djid }

    this.last_played = last
    this.now_playing = song ? { ...song.metadata, ...base } : {}

    // if last_played has stats, add stats to DJ
    if (last.song && this.current_djs[last.dj]) {
      this.current_djs[last.dj].spun += 1
      this.current_djs[last.dj].love += last.love
      this.current_djs[last.dj].hate += last.hate
      this.current_djs[last.dj].snag += last.snag
    }
    // if stats but no DJ, cache the rogue DJ
    else if (last.song) this.cacheNewDJ(last.dj, last)

    // generate stats and emit the tracked event
    let stat = false
    if (last.song) stat = `${last.love}❤️${last.hate}💔${last.snag}💖`
    
    this.Log(`new song: ${ this.now_playing.song || 'none' }`)
    this.emit('tracked', stat)
  }

  tS.on('add_dj',  tS.cacheNewDJ)
  tS.on('rem_dj',  tS.clearOldDJ)
  tS.on('nosong',  tS.cacheTrack)
  tS.on('newsong', tS.cacheTrack)

  tS.last_played = {}
  tS.now_playing = {}
  tS.current_djs = {}

}
},{}],7:[function(require,module,exports){
// config.js | the default config objects

module.exports = tS => {

  tS.default = {
    logging: false,
    
    theme: "dark",
    style: "",

    autobop: true,

    nextdj: false,
    auto_q: false,
    q_ping: `Hey @user - it's your turn!`,

    has_vol: false,

    no_aud: false,
    no_vid: false,
    no_bub: false,

    ping_pm: false,
    ping_song: false,
    ping_chat: false,
    ping_word: "",

    chat_song: false,
    chat_spun: false,
    chat_snag: false,
    chat_join: false,
    chat_left: false,

    is_afk: false,
    afk_ping: `I'm AFK - Back in a sec!`,

    beats: 0,
    remind: 0,
    reminder: `Today's theme is: Cool.`,

    user_css: ''
  }

  tS.options = {
    theme: {
      dark: "Dark Mode",
      night: "Night Mode",
      forest: "Forest",
      cosmic: "Cosmic",
      midnight: "Midnight"
    },
    style: {
      pink: "Pink",
      blue: "Blue",
      teal: "Teal",
      green: "Green",
      purple: "Purple"
    },
    remind: {
      0: "Don't Remind",
      15: "Every 15m",
      30: "Every 30m",
      60: "Every 1h",
      120: "Every 2h"
    }
  }

}
},{}],8:[function(require,module,exports){
// events.js | self-explanatory

module.exports = tS => {

  // bind functions to the event object
  tS.on = function tsOnEvent (key, cb) {
    if (!this.events) this.events = {}
    if (!this.events[key]) this.events[key] = []
    this.events[key].push(cb.bind(this))
  }

  // loop through event functions and fire
  tS.emit = function tsEmitEvent (key, arg1, arg2) {
    let list = this.events[key]
    if (list) for (let cb of list) cb(arg1, arg2)
  }

  // interpret turntable events as our own
  // handler is bound in attach.js
  tS.handle = function tsHandleEvent (e) {
    if (!e.command) return

    // store some quick data
    e.$ping = this.pinged(e.text)
    e.$name = this.userName(e.userid)
    e.$from = this.buddyName(e.senderid)
    e.$self = e.userid == window.turntable.user.id
    
    // fire our own events
    this.emit(e.command, e)
  }

  tS.events = {}

}
},{}],9:[function(require,module,exports){
// heartbeat.js | internal loop that fires once per minute

module.exports = tS => {

  // emit 'heartbeat' event
  // with how many minutes passed
  tS.beat = function heartbeat () {
    this.config.beats = parseInt(this.config.beats) + 1
    this.emit('heartbeat', this.config.beats)
  }

  // bind the heartbeat interval on attach
  tS.on('attach', function startHeart () {
    this.heart = setInterval(tS.beat.bind(this), 60 * 1000)
  })

}
},{}],10:[function(require,module,exports){
// logging.js | print logs in console and room

module.exports = tS => {

  tS.Log = function tsLog (str) {
    let date = new Date()
    let time = `[${date.toLocaleTimeString('en-us')}]`

    console.info(`${time} turnStyles :: ${str}`)
    this.logBook.push(`[tS] ${time} <span>${str}</span>`)

    this.Logged()
  }

  // update the logbook 
  // printed in room tab
  tS.Logged = function updateLogBook () {
    if (this.logBook.length > 50) this.logBook.shift()

    let logger = $('#ts_logs')[0]
    if (!logger) return

    logger.innerHTML = this.logBook.join('<br>')
    logger.scrollTop = logger.scrollHeight
  }

  tS.logBook = []

}
},{}],11:[function(require,module,exports){
// modify.js | changing the code/structure of TT

module.exports = tS => {

  // apply our static, non-toggleable mods
  tS.on('attach', function modifyTurntable () {
    countSongs()
    // add our song counter, ttstats links 
    watch('#songs-wrapper', '#songs', countSongs)
    watch('#maindiv', '.overlay .profile', attachLink)

    // replace upload button with organize
    $('#upload-button').after(`<div id="ts_upload"></div>`)
    $('#ts_upload').on('click', orderSongs)

    // hide elements
    this.toggleClass('ts_hide_videos', this.config.no_vid)
    this.toggleClass('ts_hide_audience', this.config.no_aud)
    this.toggleClass('ts_hide_bubbles', this.config.no_bub)
    this.toggleClass('ts_has_logging', this.config.logging)
  })

  // all of our dynamic mods are mostly hidden elements
  tS.on('update', function updateModifications (key, val) {
    if (key == "no_vid")  this.toggleClass('ts_hide_videos', val)
    if (key == "no_aud")  this.toggleClass('ts_hide_audience', val)
    if (key == "no_bub")  this.toggleClass('ts_hide_bubbles', val)
    if (key == "logging") this.toggleClass('ts_has_logging', val)
  })

}

// add watchers for DOM updates
const event = 'DOMSubtreeModified'
const watch = (el, target, cb) => $(el).on(event, target, cb)

// create a fake "organize" function to 
// call instead of the "upload" function
const orderSongs = function orderSongs () {
  let playlist = window.turntable.playlist
  if (playlist.isFiltering) playlist.clearSearchBar()
  $("#queue-header").removeClass("normal").addClass("edit")
  playlist.queue.batchEditMode()
}

// add a badge on selected playlist showing 
// the number of songs in that playlist
const countSongs = function countSongs () {
  let head = $('#playlist-header .text')[0]
  let data = window.turntable.playlist.fileids.length
  let name = head.innerHTML.split('<em>')[0]
  head.innerHTML = `${name} <em>${data}</em>`
}

// attach a link to ttstats on user profiles
const attachLink = function attachStatsLink () {
  if ($('.profile.modal .statslink').length) return
  // find the userid of the user
  let data = $('.profile.modal .userid')
  let find = data.length ? data[0].innerHTML : ''
  if (find.length != 24) return // not a valid id yet
  $('.profile.modal .section.web-links').show()
  $('.profile.modal .website').append(`
    <a class="statslink" href="https://ttstats.info/user/${find}" 
      target="_blank" onclick="$('.modal .close-x')[0].click()">
      ttStats Profile
    </a>
  `)
}
},{}],12:[function(require,module,exports){
// nextdj.js | take the deck, automatically

module.exports = tS => {

  // check for an open DJ spot 
  tS.checkDecks = function checkDecks () {
    if (!this.config.nextdj) return
    // check for a spot by checking for button
    let button = $('.become-dj').length
    if (!button) return this.Log(`nextdj: no spot`)
    // attempt to take the open spot
    this.Log(`nextdj: taking spot`)
    this.view().becomeDj()
  }

  // disable next DJ if the user jumps up
  tS.on('add_dj', function isSpinning (e) {
    if (!this.config.nextdj) return
    if (window.turntable.user.id != e.user[0].userid) return

    // disable next DJ, send notifications
    let head = `You've Hopped On Deck!`
    let text = `NextDJ is now disabled.`
    this.notifyUser(head, text)
    this.postToChat(head, text)

    this.writeConfig('nextdj', false)
  })

  // check for our auto-queue feature 
  tS.on('speak', function checkAutoQueue (e) {
    if (!this.config.auto_q) return
    let match = this.config.q_ping == e.text
    if (match) this.view().becomeDj()
  })

  tS.on('attach', tS.checkDecks)
  tS.on('update', tS.checkDecks)
  tS.on('rem_dj', tS.checkDecks)

}
},{}],13:[function(require,module,exports){
// notify.js | send notifications / fake chat messages

module.exports = tS => {

  // get notifications permission from the browser
  tS.notifyAuth = function notifyAuth () {
    let opt = this.config
    let has = opt.ping_chat || opt.ping_pm || opt.ping_song

    // return if no notifications possible/available
    if (!has || !('Notification' in window)) return false

    if (Notification.permission === 'denied') return false
    if (Notification.permission === 'default') {
      this.Log(`requesting notifcation permission`)
      Notification.requestPermission()
      return false
    }

    return true
  }

  // send out a browser notification
  tS.notifyUser = function sendNotification (head, body, key) {
    // return if no perms or we're using turntable
    if (!this.notifyAuth() || document.hasFocus()) return
    let icon = `${this.__base}/images/icon128.png`
  
    let ding = () => {
      let sent = new Notification(head, { icon, body })
      sent.onclick = () => { window.focus(); sent.close() }
    }

    // delay spammy notifications with suspend
    return key ? this.suspend(ding, 5, key) : ding()
  }

  // post a pseudo message in chat only available to user
  tS.postToChat = function postToChat (bold, text, type) {
    $('.chat .messages').append(`
      <div class="message ${type}">
        <em>
          <span class="subject">${bold}</span>
          <span class="text">${text}</span>
        </em>
      </div>
    `)

    this.view().updateChatScroll()
  }

  tS.on('attach', tS.notifyAuth)
  tS.on('update', tS.notifyAuth)

}
},{}],14:[function(require,module,exports){
// reminder.js | send out a configurable reminder

module.exports = tS => {

  tS.on('heartbeat', function sendReminder (min) {
    let text = this.config.reminder
    let freq = parseInt(this.config.remind)

    // min divisible by freq (eg 120 every 60)
    if ((min % freq) === 0 && text) this.speak(`[tS] ${text}`)
  })

}
},{}],15:[function(require,module,exports){
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
    return str && str.toLowerCase().indexOf(ping.toLowerCase()) > -1
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
},{}],16:[function(require,module,exports){
// stats.js | tracking and posting song/dj stats

module.exports = tS => {

  tS.on('tracked', function alertSong (stat) {
    let curr = this.now_playing
    let last = this.last_played

    if (curr.song && this.config.ping_song) {
      let head = `Now Playing: ${curr.song}`
      let text = stat || `By: ${curr.artist}`
      this.notifyUser(head, text)
    }

    if (stat && this.config.chat_song) {
      let text = `${last.song} by ${last.artist}`
      this.postToChat(stat, text, 'stat')
    }
  })

  tS.on('dropped', function alertDrop (name, stat) {
    if (!this.config.chat_spun) return
    let head = `${name} - ${stat}`
    this.postToChat(head, ` - is done spinning!`, 'stat')
  })

}
},{}],17:[function(require,module,exports){
// storage.js | saving our configs

module.exports = tS => {

  // the main saveConfig handler
  // called on all option items
  tS.saveConfig = function saveConfig (e) {
    // parse the key and data
    let which = e.target.dataset.for
    let check = e.target.type == "checkbox"
    let value = check ? e.target.checked : e.target.value

    // if we are using a button func, parse it
    if (which.indexOf('ts_') === 0) {
      value = $(`#${which}`).val()
      which = which.split('ts_').join('')
    }

    // save the update
    this.writeConfig(which, value)

    // only emit update if in room or a visual update
    let visual = ['style', 'theme', 'user_css'].includes(which)
    if (visual || !this.lobby) this.emit('update', which, value)
  }

  // update the config object and write to "db"
  tS.writeConfig = function writeConfig (opt, val) {
    this.config[opt] = val
    // save the updated config locally
    let stored = JSON.stringify(this.config)
    window.localStorage.setItem('tsdb', stored)
    // check if a checkbox or text input
    let toggle = typeof val === 'boolean'
    // mirror the option between window/hotbar
    let mirror = $(`*[data-for="${opt}"]`)
    mirror.prop(toggle ? 'checked' : 'value', val)
  }

}
},{}],18:[function(require,module,exports){
// suspend.js | delaying functions

module.exports = tS => {

  // suspend a func for delayed seconds
  // used to prevent spam from notifications, mainly
  tS.suspend = function suspendFunc (func, delay, key) {
    if (!this.holding) this.holding = {}
    // if we aren't suspended, fire the function
    if (!this.holding[key]) func && func()
    // else clear the timeout so we can reset it
    else clearTimeout(this.holding[key])

    // self clearing timeout
    let timeout = delay * 1000
    let cleared = () => { delete this.holding[key] }
    this.holding[key] = setTimeout(cleared.bind(this), timeout)
  }

  tS.holding = {}

}
},{}],19:[function(require,module,exports){
// themes.js | handles loading/reloading themes/styles

module.exports = tS => {

  // apply all core and selected at startup
  tS.on('loaded', function loadThemes (config) {
    $('link.tS-core').remove()
    create(this.__base, 'turnStyles')
    

    $('link.tS-themes').remove()
    create(this.__base, config.theme, 'themes')


    $('link.tS-styles').remove()
    create(this.__base, config.style, 'styles')

    inject(config.user_css)
  })

  // refresh theme/style/css on save
  tS.on('update', function updateThemes (key, val) {
    if (key == 'theme') update(this.__base, val, 'themes')
    if (key == 'style') update(this.__base, val, 'styles')
    if (key == 'user_css') inject(val)
  })

}

// inject custom css into the DOM
const inject = function injstCoreStyles (style) {
  let css = document.createElement('style')
  css.classList.add('tScss')
  css.type = "text/css"
  css.innerHTML = style
  $('style.tScss').remove()
  document.head.append(css)
}

// locate a path, this is necessary for extension/bookmarklet
const locate = function locateCSSPath (base, file, folder) {
  let path = folder ? `${base}/${folder}` : `${base}`
  return `${path}/${file}.css`
}

// create a link to a theme or a style
const create = function createLinkElem (base, file, folder) {
  let link = document.createElement('link')
  link.classList.add(`tS-${folder || 'core'}`)
  link.type = 'text/css'; link.rel = 'stylesheet'
  link.href = locate(base, file, folder)
  document.head.append(link)
}

// update a link to a theme or a style, create if none
const update = function updateLinkElem (base, file, folder) {
  let curr = $(`link.tS-${folder}`)
  // delete any current stylsheet if set to none
  if (!file) return curr.length ? curr.remove() : false
  // otherwise create or update the new stylesheet
  if (!curr.length) create(base, file, folder)
  else curr.attr('href', locate(base, file, folder))
}
},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
// window.js | attach the options window

module.exports = tS => {

  tS.buildWindow = function () {
    $('#ts_wrap').remove()
    $('.header-bar').append(layout(this))

    // add our logBook output
    $('#ts_logs').remove()
    $('.room-info-nav').after(`<div id="ts_logs"></div>`)

    // full menu toggler
    $('.ts_menu_toggle').on('click', () => {
      $('#turnStyles').toggleClass('active')
    })

    // tab switcher
    $('#ts_tabs div').on('click', e => {
      $('#ts_tabs div, .ts_tab').removeClass('active')
      $(`.${e.currentTarget.className}`).addClass('active')
    })

    // save config on option change
    $('.ts_optbtn').on('click', tS.saveConfig.bind(this))
    $('.ts_option').on('change', tS.saveConfig.bind(this))
  }

  tS.on('attach', tS.buildWindow)

}

const layout = self => `
  <div id="ts_wrap">
    <div id="turnStyles">
      ${ header }
      ${ quick(self) }

      ${ optsTab(self) }
      ${ roomTab(self) }
      ${ dingTab(self) }
      ${ cssTab(self) }
      ${ infoTab() }

      ${ footer(self) }
    </div>
  </div>
`

const header = `
  <h3 id="ts_menu" class="ts_menu_toggle">
    <span class="open">≡</span>
    <span class="close">✖</span>
    tS
  </h3>

  <div id="ts_tabs">
    <div class="tab_opts active">Options</div>
    <div class="tab_room">Room</div>
    <div class="tab_ding">Notify</div>
    <div class="tab_css">Custom Css</div>
    <div class="tab_info">About</div>
  </div>
`

const quick = self => `
  <div id="ts_quick">
    ${ toggle(self, 'is_afk', 'Go AFK') }
    ${ toggle(self, 'autobop', 'Autobop') }
    ${ toggle(self, 'nextdj', 'Next DJ Spot') }
    ${ toggle(self, 'auto_q', 'Auto-Queue') }
  </div>
`

const optsTab = self => `
  <div class="ts_tab tab_opts active">
    <div class="block">
      <h4>General Features</h4>
      ${ toggle(self, 'autobop', 'Autobop') }
      ${ toggle(self, 'has_vol', 'Control Volume') }
      ${ toggle(self, 'nextdj', 'Next DJ Spot') }
    </div>
    <div class="block">
      <h4>Hide Elements</h4>
      ${ toggle(self, 'no_bub', 'Hide Chat Bubbles') }
      ${ toggle(self, 'no_aud', 'Hide Audience') }
      ${ toggle(self, 'no_vid', 'Hide Player') }
    </div>
    <div class="block">
      <h4>Visual Options</h4>
      ${ select(self, 'theme') }
      ${ select(self, 'style') }
    </div>
  </div>
`

const roomTab = self => `
  <div class="ts_tab tab_room">
    <div class="block">
      <h4>Automated Queue</h4>
      ${ toggle(self, 'auto_q', 'Auto-Queue') } 
      <input type="text" id="ts_q_ping" class="ts_inputs"
        value="${ self.config.q_ping }" />
      ${ button('q_ping', 'Save Queue Ping') }
      <small><em>Paste your bot's queue message above to take the decks automatically when you're called.</em></small>
    </div>
    <div class="block">
      <h4>AFK Reminder</h4>
      ${ toggle(self, 'is_afk', 'Go AFK') }
      <input type="text" id="ts_afk_ping" class="ts_inputs"
        value="${ self.config.afk_ping }" />
      ${ button('afk_ping', 'Save AFK Response') }
      <small><em>Sends the response when you go AFK, and if you get pinged while gone.</em></small>
    </div>
    <div class="block">
      <h4>Automated Reminder</h4>
      ${ select(self, 'remind', true) } 
      <input type="text" id="ts_reminder" class="ts_inputs"
        value="${ self.config.reminder }" />
      ${ button('reminder', 'Save Reminder') }
      <small><em>Send an automated message at a set interval in your room - prefixed with [tS]</em></small>
    </div>
    <div class="block">
      <h4>Debugging</h4>
      ${ toggle(self, 'logging', 'Show Logs In Room Tab') }
      ${ doFunc('reloadMusic', 'Fix Glitched Music Player') }
      ${ doFunc('reload', 'Reload turnStyles') }
    </div>
  </div>
`

const dingTab = self => `
  <div class="ts_tab tab_ding">
    <div class="block">
      <h4>Messages In Chat</h4>
      ${ toggle(self, 'chat_song', 'Last Song Stats') }
      ${ toggle(self, 'chat_spun', 'Dropped DJ Stats') }
      ${ toggle(self, 'chat_snag', 'User Snags') }
      ${ toggle(self, 'chat_join', 'User Joins') }
      ${ toggle(self, 'chat_left', 'User Leaves') }
    </div>
    <div class="block">
      <h4>Desktop Notifications</h4>
      ${ toggle(self, 'ping_pm', 'On DMs') }
      ${ toggle(self, 'ping_chat', 'On Mentions') }
      ${ toggle(self, 'ping_song', 'On New Songs') }
    </div>
    <div class="block">
      <h4>Hot Words</h4>
      <input type="text" id="ts_ping_word" class="ts_inputs"
        value="${ self.config.ping_word }" />
      ${ button('ping_word', 'Save Hot Words') }
      <small><em>Sends a notification and highlights message on word match in chat. Use multiple words in a comma separated list.</em></small>
    </div>
  </div>
`

const cssTab = self => `
  <div class="ts_tab tab_css">
    <div class="block">
      <h4>Custom CSS</h4>
      <textarea id="ts_user_css" class="ts_inputs" cols="60" rows="10">${ self.config.user_css }</textarea>
      ${ button('user_css', 'Save And Apply Styles') }
    </div>
  </div>
`

const infoTab = () => `
  <div class="ts_tab tab_info">
    <div class="block">
      <h4>Share tS</h4>
      <div class="list">
        <a class="ts_link" href="https://chrome.google.com/webstore/detail/turntable-tweaks/pmlkackfnbbnjfejpddpakallilkbdme" target="_blank">Chrome Store</a>
        <a class="ts_link" href="https://addons.mozilla.org/en-US/firefox/addon/turnstyles-for-turntable-fm/" target="_blank">Firefox Addon</a>
        <a class="ts_link" href="https://ts.pixelcrisis.co" target="_blank">Bookmarklets</a>
      </div>
    </div>
    <div class="block">
      <h4>Get In Touch</h4>
      <div class="list">
        ON TURNTABLE: <em>@crisis</em>
        <a class="ts_link" href="https://discord.gg/ZprHwNUw8y" target="_blank">turnStyles Discord</a>
        <a class="ts_link" href="https://discord.gg/jnRs4WnPjM" target="_blank">Turntable.fm Discord</a>
      </div>
    </div>
    <div class="block">
      <h4>Extras</h4>
      <div class="list">
        <a class="ts_link" href="https://github.com/pixelcrisis/turnstyles" target="_blank">turnStyles github</a>
        <a class="ts_link" href=""https://github.com/fluteds/ttscripts target="_blank">ttscripts (themes + more)</a>
      </div>
    </div>
  </div>
`

const footer = self => `
  <div class="ts_credits">
    <small id="ts_close" class="ts_menu_toggle">✔︎ CLOSE</small>
    <small>v${self.config.version}</small>
    <small>
      <a class="ts_link" href="https://discord.gg/jnRs4WnPjM" target="_blank">
        Join me on the TT Discord
      </a>
    </small>
  </div>
`

const toggle = (self, item, name) => `
  <label class="ts_toggle">
    <input data-for="${item}" class="ts_option" type="checkbox"
      ${ self.config[item] ? 'checked' : '' }>
    </input>
    <span>•</span>
    ${name}
  </label>
`

const upper = str => str[0].toUpperCase() + str.substring(1)
const empty = arr => `<option value="">No ${ upper(arr) }</option>`
const select = (self, list, none) => `
  <select data-for="${list}" class="ts_option ts_inputs">
    ${ none ? '' : empty(list) }
    ${ Object.keys(self.options[list]).map(key => `
      <option value="${key}" ${self.config[list] == key ? 'selected' : ''}>
        ${self.options[list][key]}
      </option>
    `).join('') }
  </select>
`

const button = (opt, name) => `
  <button class="ts_inputs ts_optbtn" data-for="ts_${opt}">${name}</button>
`

const doFunc = (func, name) => `
  <button class="ts_inputs" onclick="$tS.${func}()">${name}</button>
`
},{}],22:[function(require,module,exports){
// turnStyles.js 
// by pixelcrisis

const tS = {} // define our object

// import our utilities
require('./script/config.js')(tS)
require('./script/events.js')(tS)
require('./script/room.js')(tS)
require('./script/cache.js')(tS)
require('./script/attach.js')(tS)
require('./script/storage.js')(tS)
require('./script/logging.js')(tS)
require('./script/suspend.js')(tS)
require('./script/heartbeat.js')(tS)

// attach our options window
require('./script/window.js')(tS)

// import our UI features
require('./script/themes.js')(tS)
require('./script/modify.js')(tS)
require('./script/volume.js')(tS)

// import functionalities
require('./script/afk.js')(tS)
require('./script/stats.js')(tS)
require('./script/nextdj.js')(tS)
require('./script/notify.js')(tS)
require('./script/alerts.js')(tS)
require('./script/autobop.js')(tS)
require('./script/reminder.js')(tS)

window.$tS = tS
window.$tS.init() // attach.js
},{"./script/afk.js":2,"./script/alerts.js":3,"./script/attach.js":4,"./script/autobop.js":5,"./script/cache.js":6,"./script/config.js":7,"./script/events.js":8,"./script/heartbeat.js":9,"./script/logging.js":10,"./script/modify.js":11,"./script/nextdj.js":12,"./script/notify.js":13,"./script/reminder.js":14,"./script/room.js":15,"./script/stats.js":16,"./script/storage.js":17,"./script/suspend.js":18,"./script/themes.js":19,"./script/volume.js":20,"./script/window.js":21}]},{},[22]);
