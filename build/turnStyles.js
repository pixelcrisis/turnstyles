(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
  "name": "turnStyles",
  "version": "5.1.0",
  "main": "turnStyles.js",
  "repository": "git@github.com:pixelcrisis/turntable-tweaks.git",
  "author": "pixelcrisis <pxcrisis@gmail.com>",
  "license": "MIT",
  "scripts": {
    "b:1": "browserify -p tinyify turnStyles.js -o build/turnStyles.js",
    "b:2": "node-sass turnStyles.sass -o build",
    "b:3": "node-sass themes -o build/themes",
    "b:4": "node-sass styles -o build/styles",
    "w:1": "watchify turnStyles.js -o build/turnStyles.js",
    "w:2": "node-sass turnStyles.sass -wo build",
    "w:3": "node-sass themes -wo build/themes",
    "w:4": "node-sass styles -wo build/styles",
    "build": "concurrently \"yarn b:1\" \"yarn b:2\" \"yarn b:3\" \"yarn b:4\"",
    "watch": "concurrently \"yarn w:1\" \"yarn w:2\" \"yarn w:3\" \"yarn w:4\""
  },
  "devDependencies": {
    "babel-eslint": "^10.1.0",
    "browserify": "^17.0.0",
    "concurrently": "^6.0.0",
    "eslint": "^7.22.0",
    "node-sass": "^5.0.0",
    "sass": "^1.32.8",
    "tinyify": "^3.0.0",
    "watchify": "^4.0.0"
  }
}

},{}],2:[function(require,module,exports){
// _utils.js | general purpose utilities

module.exports = tS => {

  tS.prototype.log = function (str) {
    console.info(`turnStyles :: ${str}`)
  }

  // get a username from the userMap
  tS.prototype.named = id => {
    let user = window.turntable.topViewController.userMap[id]
    return user ? user.attributes.name : 'Someone'
  }

  // get a username from the buddyList
  tS.prototype.buddy = id => {
    let buds = window.turntable.buddyList.pmWindows[id]
    return buds ? buds.otherUser.attributes.name : false
  }

  // check if a user was pinged
  tS.prototype.pinged = function (str) {
    let search = `@${this.core.user.attributes.name.toLowerCase()}`
    return str.toLowerCase().indexOf(search) > -1
  }

  // convert a value from between 0-100
  // to one recognized by TT's volume system
  tS.prototype.scaleVol = x => Math.log(x / 100) / Math.LN2 + 4

  tS.prototype.holding = {}
  // use setTimeout to delay actions
  // used to prevent notification and save spam
  tS.prototype.suspend = function (cb, delay, key) {
    let delayed = () => { delete this.holding[key] }
    if (this.holding[key]) delete this.holding[key]
    // fire the callback if no delay
    else if (cb) cb()
    // update our delay
    this.holding[key] = setTimeout(delayed.bind(this), delay * 1000)
  }

  // "click" an element
  tS.prototype.click = function (el) {
    $(window).focus()
    let opts = { bubbles: true, cancelable: true, view: window }
    let elem = document.querySelectorAll(el)[0]
    let fire = new MouseEvent('click', opts)
    return !elem.dispatchEvent(fire)
  }

}
},{}],3:[function(require,module,exports){
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
    for (let id of this.room.djids) this.cacheNewDJ(id)

    // duplicate realVolume for our volume overrides
    this.realVolume = window.turntablePlayer.realVolume

    // bind our playlist counter
    this.countSongs()
    $('#songs-wrapper').on('DOMSubtreeModified', '#songs', this.countSongs)

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
},{}],4:[function(require,module,exports){
// autobop.js | always boppin

module.exports = tS => {

  // called on load, new song
  tS.prototype.runAutobop = function () {
    if (this.autobop) clearTimeout(this.autobop)
    if (!this.config.autobop) return

    const bop = () => this.click('.awesome-button')
    let delay = (Math.random() * 7) * 100
    
    this.autobop = setTimeout(bop.bind(this), delay)
  }

}
},{}],5:[function(require,module,exports){
// cache.js | handles storing tt data

module.exports = tS => {

  tS.prototype.buildCache = function () {
    if (!this.last_played) this.last_played = {}
    if (!this.now_playing) this.now_playing = {}
    if (!this.current_djs) this.current_djs = {}
  }

  tS.prototype.cacheTrack = function (song, love = 0) {
    let last = { ...this.now_playing }

    this.last_played = last
    this.now_playing = song ? { 
      ...song.metadata, love, hate: 0, snag: 0, dj: song.djid
    } : {}

    // return false if no stats
    if (!last.song) return false

    // add stats to current DJ
    let dj = this.current_djs[last.dj]
    if (!dj) this.cacheNewDJ(last.dj, 1)
    dj.spun += 1
    dj.love += last.love
    dj.hate += last.hate
    dj.snag += last.snag

    return `${last.love}❤️${last.hate}💔${last.snag}💖`
  }

  tS.prototype.cacheNewDJ = function (user, spun = 0) {
    let curr = this.current_djs[user]
    if (!curr) this.current_djs[user] = {
      spun, love: 0, hate: 0, snag: 0
    }
  }

  tS.prototype.clearOldDJ = function (user) {
    if (!this.current_djs[user]) return false
    let stat = { ...this.current_djs[user], user }
    delete this.current_djs[user.userid]
    return `${stat.love}❤️${stat.hate}💔${stat.snag}💖${stat.spun}▶️` 
  }

}
},{}],6:[function(require,module,exports){
// config.js | handles storage, defaults, options

module.exports = tS => {

  tS.prototype.default = {
    theme: "dark",
    style: "",

    autobop: true,

    nextdj: false,
    pingdj: false,

    has_vol: false,

    ping_pm: false,
    ping_song: false,
    ping_chat: false,

    chat_song: false,
    chat_spun: false,
    chat_snag: false,
    chat_join: false,
    chat_left: false
  }

  tS.prototype.options = {
    theme: {
      dark: "Dark Mode",
      night: "Night Mode",
    },
    style: {
      pink: "Pink",
      blue: "Blue",
      teal: "Teal",
      green: "Green",
      purple: "Purple"
    }
  }

  tS.prototype.loadConfig = function () { 
    this.buildCache()
    this.chrome = !!window.tsBase // check if we're an extension
    this.__base = window.tsBase || 'https://ts.pixelcrisis.co/build'
    // fetch any saved configs 
    let storage = window.localStorage.getItem("tsdb")
    let configs = storage ? JSON.parse(storage) : {}
    // apply our defaults 
    this.config = { ...this.default, ...configs }
    this.log('loaded config')
  }

  tS.prototype.saveConfig = function (e) {
    let toggle = e.target.type == "checkbox"
    let option = e.target.id.split('ts_').join('')
    let saving = toggle ? e.target.checked : e.target.value

    // mirror values between hot bar and main option window
    let mirror = $(`#ts_panel #${e.target.id}, #ts_window #${e.target.id}`)
    mirror.prop(toggle ? 'checked' : 'value', saving)

    this.config[option] = saving
    let stored = JSON.stringify(this.config)
    window.localStorage.setItem("tsdb", stored)
    this.log('saved config')
    this.handleSave(option)
  }

}
},{}],7:[function(require,module,exports){
// playlist.js | counts the songs in a playlist

module.exports = tS => {

  tS.prototype.countSongs = () => {
    let head = $('#playlist-header .text')[0]
    let data = $('#songs li').length
    let name = head.innerHTML.split('<em>')[0]
    head.innerHTML = `${name} <em>${data}</em>`
  }

}
},{}],8:[function(require,module,exports){
// events.js | self-explanatory

module.exports = tS => {

  tS.prototype.handle = function (e) {
    switch (e.command) {
      case "pmmed":        this.handlePmmed(e); break;
      case "speak":        this.handleSpeak(e); break;
      case "nosong":       this.handleTrack(e); break;
      case "add_dj":       this.handleAddDJ(e); break;
      case "rem_dj":       this.handleRemDJ(e); break;
      case "newsong":      this.handleTrack(e); break;
      case "snagged":      this.handleSteal(e); break;
      case "registered":   this.handleJoins(e); break;
      case "deregistered": this.handleLeave(e); break;
      case "update_votes": this.handleVotes(e); break;
    }
  }

  // fired when we attach to a room
  tS.prototype.handleLoad = function () {
    this.buildPanel()
    this.runAutobop()
    this.handleSave()
    this.log(`loaded room: ${this.room.roomId}`)
  }

  // fired when we update our config
  tS.prototype.handleSave = function (opt) {
    let nextdj = opt && opt == 'nextdj'
    let volume = opt && opt == 'has_vol'
    let themes = opt && opt == 'theme' || opt == 'style'
    let notify = opt && opt.indexOf('ping_') === 0

    if (!opt || nextdj) this.checkDecks()
    if (!opt || themes) this.loadThemes()
    if (!opt || volume) this.loadVolume()
    if (!opt || notify) this.notifyAuth()
  }

  tS.prototype.handlePmmed = function (e) {
    if (this.config.ping_pm) {
      let user = this.buddy(e.senderid)
      let head = user ? `New PM from: ${user}` : `New PM`
      this.notifyUser({ head, text: e.text }, 'ping_pm')
    }
  }

  tS.prototype.handleSpeak = function (e) {
    if (!this.pinged(e.text)) return 

    if (this.config.ping_chat) {
      let head = `[${this.room.roomData.name}] @${e.name}`
      this.notifyUser({ head, text: e.text }, 'ping_chat')
    }

    // take the spot if pinged with nextdj
    if (this.holding['nextdj']) {
      this.log(`nextdj: received ping`)
      this.tryJumping()
    }
  }

  tS.prototype.handleTrack = function (e) {
    let song = e.room.metadata.current_song
    let stat = this.cacheTrack(song)

    // turn off mute after one song
    if (this.mute) this.toggleMute()

    // send out notifications
    if (this.config.ping_song) {
      let head = `Now Playing: ${this.now_playing.song}`
      let text = stat || `By: ${this.now_playing.artist}`
      this.notifyUser({ head, text })
    }
    if (this.config.chat_song && stat) {
      let last = this.last_played
      this.sendToChat(stat, `${last.song} by ${last.artist}`, 'stat')
    }

    // bop new song
    this.runAutobop()
  }

  tS.prototype.handleAddDJ = function (e) {
    this.cacheNewDJ(e.user[0].userid)
    // remove from next DJ if added to decks
    let me = this.user == e.user[0].userid
    if (me && this.config.nextdj) this.isSpinning()
  }

  tS.prototype.handleRemDJ = function (e) {
    this.checkDecks() // check if we can take the spot
    if (this.config.chat_spun) {
      let name = e.user[0].name
      let text = `- is done spinning!`
      let stat = this.clearOldDJ(e.user[0].userid)
      this.sendToChat(`${name} - ${stat}`, text, 'stat')
    }
  }

  tS.prototype.handleSteal = function (e) {
    this.now_playing.snag += 1
    if (this.config.chat_snag) {
      let name = this.named(e.userid)
      let text = `has snagged this track!`
      this.sendToChat(name, text, 'snag')
    }
  }

  tS.prototype.handleVotes = function (e) {
    this.now_playing.love = e.room.metadata.upvotes
    this.now_playing.hate = e.room.metadata.downvotes
  }

  tS.prototype.handleJoins = function (e) {
    if (this.config.chat_join) {
      let name = e.user[0].name
      this.sendToChat(name, `joined.`, 'join')
    }
  }

  tS.prototype.handleLeave = function (e) {
    if (this.config.chat_left) {
      let name = e.user[0].name
      this.sendToChat(name, `left.`, 'left')
    }
  }

}
},{}],9:[function(require,module,exports){
// layout.js | attach the options panel

module.exports = tS => {

  const menu = '.ts_toggle'
  const pane = '#ts_panel, #ts_window'
  const tabs = '.opts_tab, .chat_tab, .ding_tab'
  const opts = '#ts_panel input, #ts_window input, #ts_window select'
  const vers = require('../package.json').version

  tS.prototype.buildPanel = function () {
    $('.header-bar').append(layout(this))

    $(tabs).on('click', onTab)
    $(menu).on('click', () => $(pane).toggleClass('active'))
    $(opts).on('change', this.saveConfig.bind(this))
  }

  const onTab = e => {
    $(tabs).removeClass('active')
    $(`.${e.currentTarget.className}`).addClass('active')
  }

  const layout = self => `
    <div id="ts_panel">
      <h3 class="ts_toggle">☰ tS</h3>
      <label> ${toggle(self, 'autobop')} Autobop </label>
      <label> ${toggle(self, 'nextdj')} Next DJ Spot </label>
      <label> ${toggle(self, 'pingdj')} Next DJ On Ping </label>
      <button class="ts_toggle">...more</button>
    </div>
    <div id="ts_window">
      <h3 class="ts_toggle">☰ turnStyles</h3>
      <label> ${select(self, 'theme')} </label>
      <label> ${select(self, 'style')} </label>
      <div id="ts_tabs">
        <div class="opts_tab active">Options</div>
        <div class="chat_tab">In Chat</div>
        <div class="ding_tab">Notifications</div>
      </div>
      <div class="opts_tab active">
        <label> ${toggle(self, 'autobop')} Autobop </label>
        <label> ${toggle(self, 'has_vol')} Control Volume </label>
        <br>
        <label> ${toggle(self, 'nextdj')} Next DJ Spot </label>
        <label> ${toggle(self, 'pingdj')} Next DJ On Ping</label>
        <br> <h5>Use On Ping For Rooms With Queues</h5>
      </div>
      <div class="chat_tab">
        <label>${toggle(self, 'chat_song')} Last Song Stats</label>
        <label>${toggle(self, 'chat_spun')} Dropped DJ Stats</label>
        <br>
        <label>${toggle(self, 'chat_snag')} User Snags</label>
        <label>${toggle(self, 'chat_join')} User Joins</label>
        <label>${toggle(self, 'chat_left')} User Leaves</label>
      </div>
      <div class="ding_tab">
        <label>${toggle(self, 'ping_pm')} On DMs</label>
        <label>${toggle(self, 'ping_chat')} On Mentions</label>
        <label>${toggle(self, 'ping_song')} On New Songs</label>
      </div>
      <div class="ts_credits">
        <button class="ts_toggle">✔︎ Close</button>
        <small>v${vers}</small>
        <small>
          <a href="https://discord.gg/jnRs4WnPjM" target="_blank">
            Join me on the TT Discord
          </a>
        </small>
      </div>
    </div>
  `

  const select = (self, list) => `
    <select id="ts_${list}">
      <option value="">No ${list[0].toUpperCase() + list.substring(1)}</option>
      ${ Object.keys(self.options[list]).map(key => `
        <option value="${key}" ${self.config[list] == key ? 'selected' : ''}>
          ${self.options[list][key]}
        </option>
      `).join('') }
    </select>
  `

  const toggle = (self, item) => `
    <input id="ts_${item}" type="checkbox"
      ${ self.config[item] ? 'checked' : '' }>
    </input>
  `

}
},{"../package.json":1}],10:[function(require,module,exports){
// nextdj.js | take the deck, automatically

module.exports = tS => {

  // called in events onLoad, onDrop 
  tS.prototype.checkDecks = function () {
    if (!this.config.nextdj) return
    if (!this.config.pingdj) this.tryJumping()
    else this.suspend(null, 1, 'nextdj')
  }

  tS.prototype.tryJumping = function () {
    let button = $('.become-dj').length
    if (!button) return this.log(`nextdj: no spot`)
    this.log(`nextdj: taking spot`)
    this.room.becomeDj()
  }

  tS.prototype.isSpinning = function () {
    // in case we fired after set
    $('#ts_pane').removeClass('active')
    // reset nextDJ after fire, delay saving for load
    this.config.nextdj = false
    $('#ts_nextdj').prop('checked', false)
    setTimeout(this.saveConfig.bind(this), 5 * 1000)

    this.notifyUser({ 
      head: `You've Hopped On Deck!`,
      text: `NextDJ is now disabled.`
    })
  }

}
},{}],11:[function(require,module,exports){
// notify.js | chat & desktop notifications

module.exports = tS => {

  // check for browser notification permissions
  tS.prototype.notifyAuth = function () {
    let configs = this.config
    let running = configs.ping_chat || configs.ping_pm || configs.ping_song
    // return if nothing to notify, chrome is available or Notification isn't
    if (!running || this.chrome || !('Notification' in window)) return false
    // can't do anything with disabled permissions
    if (Notification.permission === 'denied') return false
    if (Notification.permission === 'default') {
      Notification.requestPermission()
      this.log(`requesting notification permission`)
      return false
    }
    return true
  }

  // send a user notifications
  tS.prototype.notifyUser = function (data, key) {
    if (document.hasFocus()) return // page focused, don't notify
    let packaged = popup(this, data)
    let notified = () => { window.postMessage(packaged) }

    if (!this.chrome) {
      if (!this.notifyAuth()) return // no browser permissions
      notified = () => {
        const sent = new Notification(data.head, packaged)
        sent.onclick = () => { window.focus(); sent.close() }
      }
    }

    // only send 1 notification per 10 seconds if suspend key provided
    return key ? this.suspend(notified, 10, key) : notified()
  }

  // post messages in chat
  tS.prototype.sendToChat = function (bold, text, type) {
    $('.chat .messages').append(msg(bold, text, type))
    this.view.updateChatScroll()
  }

  const msg = (bold, text, type = "") => `
    <div class="message ${type}">
      <em>
        <span class="subject">${bold}</span>
        <span class="text">${text}</span>
      </em>
    </div>
  `

  const popup = (self, data) => {
    const icon = "https://ts.pixelcrisis.co/build/images/icon128.png"
    if (!self.chrome) return { icon, body: data.text }
    else return { type: "tsNotify", notification: data }
  }

}
},{}],12:[function(require,module,exports){
// themes.js | handles loading/reloading themes/styles

module.exports = tS => {

  tS.prototype.loadThemes = function () {
    // check if we've imported our core
    let core = $(`link.tS-core`).length
    if (!core) this.createLink('turnStyles')
    // load the user selected options
    this.refreshURL(this.config.theme, 'themes')
    this.refreshURL(this.config.style, 'styles')
    // hide the upload if theme applied
    this.hideUpload()
    this.log(`refreshed themes`)
  }

  tS.prototype.hideUpload = function () {
    let curr = $('#ts_upload')
    if (this.config.theme && !curr.length) {
      // replace the upload button with valid theme
      $('#upload-button').after(`<div id="ts_upload"></div>`)
      $('#ts_upload').on('click', this.fakeUpload.bind(this))
    }
    // remove the upload button if theme removed
    else if (!this.config.theme && curr.length) curr.remove()
  }

  // replace upload with playlist edit functionality
  tS.prototype.fakeUpload = function () {
    $("#queue-header").removeClass("normal").addClass("edit")
    let playlist = this.core.playlist
    playlist.isFiltering && playlist.clearSearchBar()
    playlist.queue.batchEditMode()
  }

  // convert a local path to a URL
  // used to locate themes in extensions/bookmarklet
  tS.prototype.locatePath = function (file, folder) {
    let path = folder ? `${this.__base}/${folder}` : `${this.__base}`
    return `${path}/${file}.css`
  }

  // update or create a link to a theme/style
  tS.prototype.refreshURL = function (file, folder) {
    let name = folder || 'core'
    let curr = $(`link.tS-${name}`)
    // remove if we're loading nothing
    if (!file) return curr.length ? curr.remove() : false
    // either build or update our link      
    if (!curr.length) this.createLink(file, folder)
    else curr.attr("href", this.locatePath(file, folder))
  }

  // create a link to theme/style if none exist
  tS.prototype.createLink = function (file, folder) {
    let name = folder || 'core'
    let link = document.createElement('link')
    link.classList.add(`tS-${name}`)
    link.rel  = "stylesheet"
    link.type = "text/css"
    link.href = this.locatePath(file, folder)
    document.head.append(link)
  }

}
},{}],13:[function(require,module,exports){
// volume.js | replace the turntable volume

module.exports = tS => {

  tS.prototype.loadVolume = function () {
    let hasVolume = $('body').hasClass('has-volume')
    
    if (this.config.has_vol && !hasVolume) {
      $('body').addClass('has-volume')
      $('.header-content').append(layout(this))

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

  // convert TT's volume to 100 scale
  tS.prototype.currVolume = function (e) {
    let curr = e || window.util.getSetting('volume')
    return 100 * Math.pow(2, curr - 4)
  }

  // convert value and use turntabe's volume saving 
  tS.prototype.saveVolume = function (vol) {
    vol = vol.target ? vol.target.value : vol
    let volume = vol > 0 ? this.scaleVol(vol) : -3

    // rewrite tt func to allow values below 7
    if (volume > 6) window.turntablePlayer.realVolume = this.realVolume
    else window.turntablePlayer.realVolume = this.currVolume

    window.turntablePlayer.setVolume(volume)
    window.util.setSetting('volume', volume)
  }

  // toggle mute for one song
  tS.prototype.toggleMute = function () {
    this.mute = !this.mute
    $('#ts_volume').toggleClass('muted', this.mute)
    window.turntablePlayer.setVolume(this.mute ? -3 : this.scaleVol(this.currVolume()))
    this.log(`turned mute ${ this.mute ? 'on' : 'off' }`)
  }

  // handle scrolling on the volume input
  tS.prototype.onVolWheel = function (e) {
    const current = this.currVolume()
    let shifted = e.originalEvent.shiftKey ? 1 : 5
    let descend = e.originalEvent.deltaY > 0
    let updated = descend ? (current - shifted) : (current + shifted)
    
    updated = updated < 0 ? 0 : updated > 100 ? 100 : updated
    $('#ts_slider')[0].value = updated
    this.saveVolume(updated)
    return false
  }


  const layout = self => `
    <div id="ts_volume">
      <span id="ts_mute"></span>
      <input id="ts_slider" type="range" 
        min="0" max="100" value="${self.currVolume()}">
      </input>
      <em id="ts_muted">Muted For One Song</em>
    </div>
    `


}
},{}],14:[function(require,module,exports){
const tS = function () {
	this.loadConfig()
	this.loadThemes()
	this.attachRoom()
}

require('./scripts/_utils.js')(tS)
require('./scripts/config.js')(tS)
require('./scripts/cached.js')(tS)
require('./scripts/events.js')(tS)
require('./scripts/counts.js')(tS)

require('./scripts/themes.js')(tS)

require('./scripts/attach.js')(tS)
require('./scripts/layout.js')(tS)
require('./scripts/volume.js')(tS)

require('./scripts/autobop.js')(tS)
require('./scripts/nextdj.js')(tS)
require('./scripts/notify.js')(tS)

window.$tS = new tS()
},{"./scripts/_utils.js":2,"./scripts/attach.js":3,"./scripts/autobop.js":4,"./scripts/cached.js":5,"./scripts/config.js":6,"./scripts/counts.js":7,"./scripts/events.js":8,"./scripts/layout.js":9,"./scripts/nextdj.js":10,"./scripts/notify.js":11,"./scripts/themes.js":12,"./scripts/volume.js":13}]},{},[14]);
