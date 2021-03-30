(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
  "name": "turnStyles",
  "version": "5.0.2",
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

  // get a username from the room object
  tS.prototype.named = user => this.room.userMap[user.id].attributes.name

  tS.prototype.holding = {}
  // use setTimeout to delay actions
  // used to prevent notification and save spam
  tS.prototype.suspend = function (fire, delay, key) {
    let clear = () => { delete this.holding[key] }
    
    // only fire our function if we aren't suspended
    if (fire && !this.holding[key]) { fire.bind(this); fire() }

    // set/update our suspension
    if (this.holding[key]) clearTimeout(this.holding[key])
    this.holding[key] = setTimeout(clear.bind(this), delay * 1000)
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
    if (this.room.currentSong) this.now_playing = { 
      snag: 0, hate: 0, 
      love: this.room.upvoters.length,
      ...this.room.currentSong.metadata
    }

    // duplicate realVolume for our volume overrides
    this.realVolume = window.turntablePlayer.realVolume

    // bind our event handler
    this.core.addEventListener('message', this.handle.bind(this))
    this.log(`loaded room: ${this.room.roomId}`)
    this.onLoad()
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

    chat_stat: true,
    chat_snag: true,
    chat_join: true,
    chat_left: true
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
    }
  }

  tS.prototype.loadConfig = function () {
    // fetch any saved configs 
    let storage = window.localStorage.getItem("tsdb")
    let configs = storage ? JSON.parse(storage) : {}
    // apply our defaults 
    this.config = { ...this.default, ...configs }
    this.log('loaded config')
  }

  tS.prototype.saveConfig = function () {
    this.config.theme     = $("#ts_theme").val()
    this.config.style     = $("#ts_style").val()

    this.config.autobop   = $("#ts_autobop").is(':checked')

    this.config.nextdj    = $('#ts_nextdj').is(':checked')
    this.config.pingdj    = $('#ts_pingdj').is(':checked')
    
    this.config.has_vol   = $('#ts_has_vol').is(':checked')

    this.config.ping_pm   = $('#ts_ping_pm').is(':checked')
    this.config.ping_chat = $('#ts_ping_chat').is(':checked')
    this.config.ping_song = $('#ts_ping_song').is(':checked')

    this.config.chat_stat = $('#ts_chat_stat').is(':checked')
    this.config.chat_snag = $('#ts_chat_snag').is(':checked')
    this.config.chat_join = $('#ts_chat_join').is(':checked')
    this.config.chat_left = $('#ts_chat_left').is(':checked')

    let stored = JSON.stringify(this.config)
    window.localStorage.setItem("tsdb", stored)
    this.log('saved config')
    this.onSave()
  }

}
},{}],6:[function(require,module,exports){
// events.js | self-explanatory

module.exports = tS => {

  tS.prototype.handle = function (e) {
    switch (e.command) {
      case "pmmed":        this.onPing(e); break;
      case "speak":        this.onChat(e); break;
      case "add_dj":       this.onJump(e); break;
      case "rem_dj":       this.onDrop(e); break;
      case "newsong":      this.onSong(e); break;
      case "snagged":      this.onSnag(e); break;
      case "registered":   this.onJoin(e); break;
      case "deregistered": this.onLeft(e); break;
      case "update_votes": this.onVote(e); break;
    }
  }

  // fired when we attach to a room
  tS.prototype.onLoad = function () {  
    this.buildPanel()
    this.runAutobop()
    this.onSave() 
  }

  // fired when we update our config
  tS.prototype.onSave = function () {
    this.loadThemes()
    this.loadVolume()
    this.checkDecks()
  }

  tS.prototype.onPing = function (e) {
    if (this.config.ping_pm) this.notifyUser({
      head: `New PM`,
      text: e.text
    }, 'ping_pm')
  }

  tS.prototype.onChat = function (e) {
    let search = `@${this.core.user.attributes.name.toLowerCase()}`
    let pinged = e.text.toLowerCase().indexOf(search) > -1
    if (!pinged) return 

    if (this.config.ping_chat) this.notifyUser({
      head: `[${this.room.roomData.name}] @${e.name}`,
      text: e.text
    }, 'ping_chat')

    // take the spot if pinged with nextdj
    if (this.holding['nextdj']) {
      this.log(`nextdj: received ping`)
      this.tryJumping()
    }
  }

  tS.prototype.onSong = function (e) {
    this.runAutobop()
    // turn off mute after one song
    if (this.mute) this.toggleMute()

    // save now playing as last played
    if (!this.now_playing) this.last_played = {}
    else this.last_played = { ...this.now_playing }
    // and save the current song now playing
    this.now_playing = {
      love: 0, hate: 0, snag: 0, ...e.room.metadata.current_song.metadata
    }

    // get the stats of last played
    let stat = false, last = this.last_played
    if (last.song) stat = `[🔺${last.love}🔻${last.hate}❤️${last.snag}]`

    if (this.config.ping_song) this.notifyUser({
      head: `Now Playing: ${this.now_playing.song}`,
      text: stat || `By: ${this.now_playing.artist}`
    })

    if (stat && this.config.chat_stat) this.sendToChat(stat, last.song)
  }

  tS.prototype.onJump = function (e) {
    // remove from next DJ if added to decks
    let me = this.user == e.user[0].userid
    if (me && this.config.nextdj) this.isSpinning()
  }

  tS.prototype.onDrop = function () {
    // check and see if we can take the spot
    this.checkDecks()
  }

  tS.prototype.onSnag = function (e) {
    this.now_playing.snag += 1
    if (this.config.chat_snag) {
      let name = this.named(e.user)
      let text = `has snagged this track!`
      this.sendToChat(name, text, 'snag')
    }
  }

  tS.prototype.onVote = function (e) {
    this.now_playing.love = e.room.metadata.upvotes
    this.now_playing.hate = e.room.metadata.downvotes
  }

  tS.prototype.onJoin = function (e) {
    if (this.config.chat_join) {
      let name = e.user[0].name
      this.sendToChat(name, `joined.`, 'join')
    }
  }

  tS.prototype.onLeft = function (e) {
    if (this.config.chat_left) {
      let name = e.user[0].name
      this.sendToChat(name, `left.`, 'left')
    }
  }

}
},{}],7:[function(require,module,exports){
// layout.js | attach the options panel

module.exports = tS => {

  let version = require('../package.json').version

  tS.prototype.buildPanel = function () {
    $('.header-bar').append(layout(this))

    let toggled = $('#ts_panel, #ts_window')
    let changed = $('#ts_panel input, #ts_window input, #ts_window select')
    $('.ts_toggle').on('click', () => toggled.toggleClass('active'))
    changed.on('change', this.saveConfig.bind(this))
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
      <div>
        <h5>Options</h5>
        <label> ${toggle(self, 'autobop')} Autobop </label>
        <label> ${toggle(self, 'has_vol')} Control Volume </label>
        <label> ${toggle(self, 'nextdj')} Next DJ Spot </label>
        <label> ${toggle(self, 'pingdj')} Next DJ On Ping </label>
      </div>
      <div>
        <h5>Post To Chat</h5>
        <label>${toggle(self, 'chat_stat')} Song Stats</label>
        <label>${toggle(self, 'chat_snag')} User Snags</label>
        <label>${toggle(self, 'chat_join')} User Joins</label>
        <label>${toggle(self, 'chat_left')} User Leaves</label>
      </div>
      <div>
        <h5>Desktop Notifications</h5>
        <label>${toggle(self, 'ping_pm')} On DMs</label>
        <label>${toggle(self, 'ping_chat')} On Mentions</label>
        <label>${toggle(self, 'ping_song')} On New Songs</label>
      </div>
      <div class="ts_credits">
        <button class="ts_toggle">✔︎ Close</button>
        <small>v${version}</small>
        <small>
          <a href="https://discord.gg/jnRs4WnPjM" target="_blank">Join me on the TT Discord</a>
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
},{"../package.json":1}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
// notify.js | chat & desktop notifications

module.exports = tS => {

  // send a message to chrome/notify
  tS.prototype.notifyUser = function (data, key) {
    let packed = { type: "tsNotify", notification: data }
    let notify = () => { window.postMessage(packed) }
    return key ? this.suspend(notify, 10, key) : notify()
  }

  // post messages in chat
  tS.prototype.sendToChat = function (bold, text, type) {
    $('.chat .messages').append(msg(bold, text, type))
    this.view.updateChatScroll()
  }

  const msg = (bold, text, type) => `
    <div class="message ${type}">
      <em>
        <span class="subject">${bold}</span>
        <span class="text">${text}</span>
      </em>
    </div>
  `

}
},{}],10:[function(require,module,exports){
// themes.js | handles loading/reloading themes/styles

module.exports = tS => {

  tS.prototype.loadThemes = function () {
    // check if we've imported our core
    let core = $(`link.tS-core`).length
    if (!core) linkCSS('turnStyles')
    // load the user selected options
    refresh(this.config.theme, 'themes')
    refresh(this.config.style, 'styles')
    // hide the upload if theme applied
    this.hideUpload()
    this.log(`refreshed themes`)
  }

  tS.prototype.hideUpload = function () {
    let curr = $('#ts_upload')
    if (this.config.theme && !curr.length) {
      $('#upload-button').after(`<div id="ts_upload"></div>`)
      $('#ts_upload').on('click', this.fakeUpload.bind(this))
    }
    else if (!this.config.theme && curr.length) curr.remove()
  }

  tS.prototype.fakeUpload = function () {
    $("#queue-header").removeClass("normal").addClass("edit")
    let playlist = this.core.playlist
    playlist.isFiltering && playlist.clearSearchBar()
    playlist.queue.batchEditMode()
  }

  // convert a local path to a URL
  const locate = function (file, folder) {
    let base = window.tsBase || 'https://ts.pixelcrisis.co/build'
    let path = folder ? `${base}/${folder}` : `${base}`
    return `${path}/${file}.css`
  }

  const refresh = function (file, folder) {
    let name = folder || 'core'
    let curr = $(`link.tS-${name}`)
    // remove if we're loading nothing
    if (!file) return curr.length ? curr.remove() : false
    // either build or update our link      
    if (!curr.length) linkCSS(file, folder)
    else curr.attr("href", locate(file, folder))
  }

  const linkCSS = function (file, folder) {
    let name = folder || 'core'
    let link = document.createElement('link')
    link.classList.add(`tS-${name}`)
    link.rel  = "stylesheet"
    link.type = "text/css"
    link.href = locate(file, folder)
    document.head.append(link)
  }

}
},{}],11:[function(require,module,exports){
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
    window.turntablePlayer.setVolume(this.mute ? -3 : this.currVolume())
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
},{}],12:[function(require,module,exports){
const tS = function () {
	this.loadConfig()
	this.loadThemes()
	this.attachRoom()
}

require('./scripts/_utils.js')(tS)
require('./scripts/config.js')(tS)
require('./scripts/events.js')(tS)

require('./scripts/themes.js')(tS)

require('./scripts/attach.js')(tS)
require('./scripts/layout.js')(tS)
require('./scripts/volume.js')(tS)

require('./scripts/autobop.js')(tS)
require('./scripts/nextdj.js')(tS)
require('./scripts/notify.js')(tS)

window.$tS = new tS()
},{"./scripts/_utils.js":2,"./scripts/attach.js":3,"./scripts/autobop.js":4,"./scripts/config.js":5,"./scripts/events.js":6,"./scripts/layout.js":7,"./scripts/nextdj.js":8,"./scripts/notify.js":9,"./scripts/themes.js":10,"./scripts/volume.js":11}]},{},[12]);
