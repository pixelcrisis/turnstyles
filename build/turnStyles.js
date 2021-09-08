(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
  "name": "turnStyles",
  "version": "9.9.9",
  "main": "turnStyles.js",
  "repository": "git@github.com:pixelcrisis/turntable-tweaks.git",
  "author": "pixelcrisis <pxcrisis@gmail.com>",
  "license": "MIT",
  "scripts": {
    "start": "yarn build && yarn watch",
    "build": "yarn b:core && yarn b:theme && yarn b:style && yarn b:static",
    "watch": "concurrently \"yarn w:1\" \"yarn w:2\" \"yarn w:3\" \"yarn w:4\"",
    "b:core": "yarn b:core:1 && yarn b:core:2 && yarn b:core:3",
    "b:core:1": "browserify -p tinyify turnStyles.js -o build/turnStyles.js",
    "b:core:2": "node-sass turnStyles.sass -o build",
    "b:core:3": "postcss build/turnStyles.css --use autoprefixer -d build/",
    "b:theme": "yarn b:theme:1 && yarn b:theme:2",
    "b:theme:1": "node-sass sass/themes -o build/themes",
    "b:theme:2": "postcss build/themes/*.css --use autoprefixer --d build/themes",
    "b:style": "yarn b:style:1 && yarn b:style:2",
    "b:style:1": "node-sass sass/styles -o build/styles",
    "b:style:2": "postcss build/styles/*.css --use autoprefixer --d build/styles",
    "b:static": "cp -R static/. build/",
    "w:1": "watchify turnStyles.js -o build/turnStyles.js",
    "w:2": "node-sass turnStyles.sass -wo build",
    "w:3": "node-sass sass/themes -wo build/themes",
    "w:4": "node-sass sass/styles -wo build/styles"
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
// alerts.js | sending data to chat/notifications

module.exports = app => {

  const Alerts = {
    speak: {
      conf: 'ping_chat',
      case: '$ping',
      head: '[$room] @$name'
    },
    pmmed: {
      conf: 'ping_pm',
      head: 'New PM from: $from'
    },
    snagged: {
      conf: 'chat_snag',
      head: '$whom',
      body: 'has snagged this track!',
      post: true
    },
    registered: {
      conf: 'chat_join',
      head: '$user',
      body: 'joined.',
      post: true
    },
    deregistered: {
      conf: 'chat_left',
      head: '$user',
      body: 'left.',
      post: true
    }
  }

  // simple parser to replace default alert text
  app.Parse = function (str, e) {
    let users = [] // collect arrays of user names if exist
    for (let user of e.user) if (user.name) users.push(user.name)
    str = str.split('$whom').join(e.$name || 'Someone')
    str = str.split('$from').join(e.$from || 'Someone')
    str = str.split('$name').join(e.name || 'Someone')
    str = str.split('$room').join(this.$Room().name)
    str = str.split('$user').join(users.join(', '))
    return str
  }

  // bind our alerts to their events 
  app.on('attach', function bindAlerts () {
    // loop through our alerts
    for (let event in Alerts) {
      let data = Alerts[event]
      // bind our alert to the event
      app.on(event, function (e) {
        // check our alert conditions
        if (!this.config[data.conf]) return
        if (data.case && !e[data.case]) return
        // parse the alert text
        let head = this.Parse(data.head, e)
        let body = data.body ? this.Parse(data.body, e) : e.text
        // post or send notification
        if (!data.post) this.Notify({ head, body, type: data.conf })
        else this.Post({ head, body })
      })
    }
  })

  // bind our "hot word" notifications
  app.on('speak', function matchAlert (e) {
    let list = this.config.hot_words.split(',')
    // fake "mention" on hot word match
    for (let word of list) {
      // compare hot word to sent text
      let text = e.text.toLowerCase()
      if (text.indexOf(word.trim().toLowerCase()) > -1) {
        // add mention styling and send notification
        $('.messages .message:last-child').addClass('mention')
        return this.Notify({ 
          head: `[${this.$Room()}] Match: ${word}`,
          body: e.text, type: 'matched' 
        })
      }
    }
  })

}
},{}],3:[function(require,module,exports){
// attach.js | connect app to the turntable room

module.exports = app => {

	// attach (init) into the turntable room
	app.attach = function () {
		this.getConfig()
		// load config and fetch tt
		const core = window.turntable
		
		// first make sure we have a room
		if (!core) return this.Log('no room')
		const user = window.turntable.user

		// we can't attach if we're in the lobby
		this.lobby = $('#turntable #topBG').length
		if (this.lobby) return this.addPanel()

		// attempt to attach to the room

		// we loop until the window has loaded the room fully
		const again = () => setTimeout(app.attach.bind(this), 150)

		// look for a nested prop in an object
		// this makes sure turntable has loaded the data
		const findKey = (obj, key) => {
			for (let prop in obj) {
				let data = obj[prop]
				if (data !== null && typeof data != "undefined" && data[key]) {
					return data
				}
			}
		}

		if (!user) return again()
		let room = findKey(core, 'roomId')
		if (!room) return again()
		let full = findKey(room, 'roomData')
		if (!full) return again()

		// room loaded!
		// bind our event listener
		this.listener = this.listen.bind(this)
		window.turntable.addEventListener('message', this.listener)

		this.Emit('attach', room)
		this.Log('loaded room')
	}

	// unload and reload turnStyles assets
	app.reload = function () {
		// unload turnStyles
		clearInterval(this.heart)
		window.turntable.removeEventListener('message', this.listener)
		$('script[src*="turnStyles.js"]').remove()

		// reload turnStyles
		const script = document.createElement('script')
		script.src = `${this.__base}/turnStyles.js?${Math.random()}`
		script.type = 'text/javascript'

		this.Log('reloading')
		document.body.append(script)
	}

}
},{}],4:[function(require,module,exports){
// inputs.js | handle the hotbar/options panel

module.exports = app => {

  app.addPanel = function () {
    $('#tsPanel').remove()
    $('.header-bar').append(this.Panel())
    // bind the panel toggle
    $('#tsPanel h1').on('click', () => $('#tsPanel').toggleClass('active'))
    // bind our tab switching
    $('.ts-tab').on('click', function switchTab (e) {
      $('.ts-tab.active, .ts-tabbed.active').removeClass('active')
      $(`*[data-tab="${e.target.dataset.tab}"]`).addClass('active')
    })
    // save config on option change
    $('.ts-button').on('click', this.saveConfig.bind(this))
    $('.ts-switch').on('change', this.saveConfig.bind(this))
  }

  // define our HTML structures
  // for the options panel & partials
  app.Panel = function () {
    console.log('TODO: Restructure Panel')
    return `
      <div id="tsPanel">
        <div id="tsBar">
          <h1></h1>
          ${ this._toggle('is_afk',  'AFK') }
          ${ this._toggle('autobop', 'Autobop') }
          ${ this._toggle('nextdj',  'Next DJ') }
          ${ this._toggle('auto_q',  'AutoQueue') }
        </div>
        <div id="tsFull">
          <div class="ts-row">
            <h1>✖</h1>
            <span class="ts-tab active" data-tab="general">General</span>
            <span class="ts-tab" data-tab="visual">Visual</span>
            <span class="ts-tab" data-tab="css">CSS</span>
            <span class="ts-tab" data-tab="alerts">Alerts</span>
            <span class="ts-tab" data-tab="about">About</span>
          </div>

          <div class="ts-tabbed active" data-tab="general">
            ${ this._toggle('autobop', 'Autobop') }
            ${ this._toggle('nextdj',  'Next DJ Spot') }
            ${ this._toggle('has_vol', 'Control Volume') }
            
            <div class="break"></div>
            <p class="full">Paste your bot's queue message below to take the decks automatically when you're called.</p>
            ${ this._toggle('auto_q', 'Enable Auto Queue') }
            ${ this._inputs('q_ping') }
            ${ this._button('q_ping', 'Save Queue Ping') }
            
            <div class="break"></div>
            <p class="full">Sends the response when you go AFK, and if you get pinged while gone.</p>
            ${ this._toggle('is_afk', 'Go AFK') } 
            ${ this._inputs('afk_ping') }
            ${ this._button('afk_ping', 'Save AFK Response') }
          </div>

          <div class="ts-tabbed" data-tab="visual">
            <p class="full">Turntable Theme & Style</p>
            ${ this._select('theme') }
            ${ this._select('style') }
            
            <div class="break"></div>
            <p class="full">Hide Various Elements Around Turntable</p>
            ${ this._toggle('no_bub', 'Hide Chat Bubbles') }
            ${ this._toggle('no_aud', 'Hide Audience') }
            ${ this._toggle('no_vid', 'Hide Player') }

            <div class="break"></div>
            <p class="full">Add A Red Glow To Songs Played Recently In Room</p>
            ${ this._toggle('played', 'Highlight Recently Played Songs') }
            
          </div>

          <div class="ts-tabbed" data-tab="css">
            <p class="full">Add your own custom CSS snippets to turntable!</p>
            <textarea id="ts_user_css" rows="10">
              ${ this.config.user_css }
            </textarea>
            <div class="break"></div>
            ${ this._button('user_css', 'Save And Apply Styles') }
          </div>

          <div class="ts-tabbed" data-tab="alerts">
            <p class="full">Info Posted In Chat (Just For You To See)</p>
            ${ this._toggle('chat_song', 'Last Song Stats') }
            ${ this._toggle('chat_spun', 'Dropped DJ Stats') }
            ${ this._toggle('chat_snag', 'User Snags') }
            ${ this._toggle('chat_join', 'User Joins') }
            ${ this._toggle('chat_left', 'User Leaves') }
            
            <div class="break"></div>
            <p class="full">Send Desktop Notifications</p>
            ${ this._toggle('ping_pm', 'On DMs') }
            ${ this._toggle('ping_chat', 'On Mentions') }
            ${ this._toggle('ping_song', 'On New Songs') }

            <div class="break"></div>
            <p class="full">Notifies / highlights word match in chat. Use multiple words in a comma separated list.</p>
            ${ this._inputs('hot_words') }
            ${ this._button('hot_words', 'Save Hot Words') }
          </div>

          <div class="ts-tabbed" data-tab="about">
            ${ this._toggle('logging', 'Show Logs In Room Tab') } 
            ${ this._doFunc('reloadMusic', 'Fix Glitched Players') }
            ${ this._doFunc('reload', 'Reload turnStyles') }

            <div class="break"></div>
            <p class="full">turnStyles v${this.config.version}</p>
            <a class="ts_link" href="https://chrome.google.com/webstore/detail/turntable-tweaks/pmlkackfnbbnjfejpddpakallilkbdme" target="_blank">Chrome Store</a>
            <a class="ts_link" href="https://addons.mozilla.org/en-US/firefox/addon/turnstyles-for-turntable-fm/" target="_blank">Firefox Addon</a>
            <a class="ts_link" href="https://ts.pixelcrisis.co" target="_blank">Bookmarklet</a>

            <div class="break"></div>
            <p class="full">Support On Discord</p>
            <a class="ts_link" href="https://discord.gg/wqmAVvgSbE" target="_blank">turnStyles Discord</a>
            <a class="ts_link" href="https://discord.gg/jnRs4WnPjM" target="_blank">Turntable.fm Discord</a>

            <div class="break"></div>
            <p class="full">On Github</p>
            <a class="ts_link" href="https://github.com/pixelcrisis/turnstyles" target="_blank">turnStyles</a>
            <a class="ts_link" href=""https://github.com/fluteds/ttscripts target="_blank">ttscripts (themes + more)</a>

            <div class="break"></div>
            <p class="full">The Developer</p>
            <strong>Turntable: <em>@crisis</em></strong>&nbsp;-&nbsp;
            <strong>Discord: <em>@crisis</em></strong>
          </div>
          </div>
        </div>
      </div>
    `
  }

  app._toggle = function (item, name) {
    return `
      <label>
        <input class="ts-switch" type="checkbox"
          data-for="${item}" ${ this.config[item] ? 'checked' : ''}> 
        <span class="ts-icon"></span> ${name}
      </label>
    `
  }

  app._select = function (list, none) {
    const upper = str => str[0].toUpperCase() + str.substring(1)
    const empty = arr => `<option value="">No ${ upper(arr) }</option>`

    return `
      <select data-for="${list}" class="ts-switch">
        ${ none ? '' : empty(list) }
        ${ Object.keys(this.options[list]).map(key => `
          <option value="${key}" ${this.config[list] == key ? 'selected' : ''}>
            ${this.options[list][key]}
          </option>
        `).join('') }
      </select>
    `
  }

  app._inputs = function (item) {
    return `
      <input type="text" 
        id="ts_${item}" value="${ this.config[item] }">
      </input> 
    `
  }

  app._button = function (opt, name) {
    return `
      <button class="ts-button" data-for="ts_${opt}">${name}</button>
    `
  }

  app._doFunc = function (func, name) {
    return `
      <button onclick="$tS.${func}()">${name}</button>
    `
  }

  app.on('attach', app.addPanel)

}
},{}],5:[function(require,module,exports){
// playlist.js | modifying the playlist

module.exports = app => {

  // get song count for current playlist
  app.countPlaylist = function () {
    // display song count in playlist header
    let head = $('#playlist-header .text')[0]
    let data = window.playlist.fileids.length
    let name = head.innerHTML.split('<em>')[0]
    head.innerHTML = `${name} <em>${data}</em>`
  }

  // replace "upload" with "organize"
  app.orderPlaylist = function () {
    // literally just a clone of the tt function
    if (window.playlist.isFiltering) window.playlist.clearSearchBar()
    $('#queue-header').removeClass('normal').addClass('edit')
    window.playlist.queue.batchEditMode()
  }

  // highlight any recently played songs
  app.checkPlaylist = function (log) {
    if (log) this.songlog = log
    let list = window.playlist.fileids
    // clear any highlighted songs
    $('.song.ts_played').removeClass('ts_played')
    // loop through all the songs in the playlist
    for (let i = 0; i < list.length; i++) {
      let song = list[i]
      // check the song against the song log
      for (let item of this.songlog) if (item._id == song) {
        // if we have a match, add a highlight to the element
        $(`#queue .songs .song:nth-child(${i + 1})`).addClass("ts_played")
      }
    }
  }

  // bind our playlist features on attach
  app.on('attach', function watchPlaylist (room) {
    // add our initial modifications
    this.countPlaylist()
    this.checkPlaylist(room.roomData.metadata.songlog)
    this.classes('played', this.config.played)
    // replace the 'upload' button with an organize one
    $('#upload-button').after(`<div id="tsUpload"></div>`)
    $('#tsUpload').on('click', this.orderPlaylist)
  })

  // update the song log after every new song
  app.on(['newsong', 'nosong'], function checkSongLog (e) {
    this.checkPlaylist(e.room.metadata.songlog)
  })

  // bind playlist counter to playlist updates
  app.on('playlist', app.countPlaylist, app.checkPlaylist)

  // update our played songs toggle
  app.on('update', function togglePlayed (key, val) {
    if (key == 'played') this.classes('played', val)
  })
}
},{}],6:[function(require,module,exports){
// profile.js | modifying the user profile

module.exports = app => {

  // add ttstats link to user profiles
  app.on('profile', function linkUserStats(id) {
    if ($('.profile.modal .statslink').length) return
    // force the web links section to be visible
    $('.profile.modal .section.web-links').show()
    $('.profile.modal .website').append(`
      <a target="_blank"
        class="statslink"
        onclick="$('.modal .close-x')[0].click()"
        href="https://thompsn.com/turntable/leaderboard/thing/?id=${id}">
        Leaderboard
      </a>
    `)
  })

}
},{}],7:[function(require,module,exports){
// themes.js | handles loading/reloading themes/styles

module.exports = app => {

  // apply all core and selected styles on load
  app.on('loaded', function loadThemes (config) {
    // remove them first just in case we're reloading
    $('#ts_core').remove()
    $('#ts_themes').remove()
    $('#ts_styles').remove()
    $('#ts_css').remove()

    this.insert('turnStyles')
    this.insert(config.theme, 'themes')
    this.insert(config.style, 'styles')
    this.inject(config.user_css)

    // update our hidden elements
    this.classes('no_bub', config.no_bub)
    this.classes('no_vid', config.no_vid)
    this.classes('no_aud', config.no_aud)
  })

  // update link/css elements
  app.on('update', function updateThemes (key, val) {
    if (key == 'theme') this.insert(val, 'themes')
    if (key == 'style') this.insert(val, 'styles')
    if (key == 'user_css') this.inject(val)
      
    if (key == 'no_bub') this.classes('no_bub', val)
    if (key == 'no_vid') this.classes('no_vid', val)
    if (key == 'no_aud') this.classes('no_aud', val)
  })

  // insert or update link to our CSS files
  app.insert = function (file, folder) {
    let id = `ts_${ folder || 'core' }`
    let el = $(`#${ id }`)

    // piece together our base URL using folder
    let base = `${this.__base}${ folder ? `/${folder}` : ''}`
    // null the URL if the option is nothing
    let path = file ? `${base}/${file}.css` : '#'
    // create the link if it doesn't exist
    if (!el.length) document.head.append(Link(id, path))
    // otherwise we update the href
    else el.attr('href', path)
    if (path != "#") this.Log(`inserted: ${path}`)

    // update the body class
    if (folder == 'themes') {
      this.classes('th-none', !file)
      // remove the last theme class
      let last = $('body').data('theme')
      if (last) $('body').removeClass(`th-${last}`)
      // record the new theme and add the class
      if (file) {
        $('body').data('theme', file)
        $('body').addClass(`th-${file}`)
      } 
    }
  }

  // inject css styles into the DOM
  app.inject = function (style) {
    let el = $('#ts_css')
    if (el.length) el[0].innerHTML = style
    else document.head.append(CSS(style))
    if (style) this.Log(`injected: ${style}`)
  }

}

// create a link element
const Link = (id, url) => {
  let el = document.createElement('link')
  el.id = id
  el.rel = "stylesheet"
  el.href = url
  return el
}

// create our user style element
const CSS = style => {
  let el = document.createElement('style')
  el.id = "ts_css"
  el.type = "text/css"
  el.innerHTML = style
  return el
}
},{}],8:[function(require,module,exports){
// volume.js | replace the turntable volume

module.exports = app => {

	// load/unload volume functionality
	app.loadVolume = function () {
		// toggle volume on or off
		let opt = this.config.has_vol
		let has = $('body').hasClass('ts_vol')

		// update the body class
		this.classes('ts_vol', opt)

		// make sure we have a copy of realVolume
		let rV = window.turntablePlayer.realVolume
		if (!this.realVolume) this.realVolume = rV

		// turn volume control on or off 
		if (opt && !has) this.addVolume()
		if (has && !opt) this.remVolume()
	}

	// inject the volume UI into tt
	app.addVolume = function () {
		// add our HTML template
		$('.header-content').append(`
			<div id="tsVolume">
				<span id="tsMute"></span>
				<input id="tsSlider" type="range" 
					min="0" max="100" value="${ currentVol() }">
				</input>
				<em id="tsMuted">Muted For One Song</em>
			</div>
		`)
		// bind up our events
		const scroll = 'DOMMouseScroll mousewheel'
		$('#tsMute').on('click', this.muteVolume.bind(this))
		$('#tsSlider').on('input', this.saveVolume.bind(this))
		$('#tsSlider').on( scroll, this.rollVolume.bind(this))
	}

	// remove the volume UI from tt
	app.remVolume = function () {
		$('#tsVolume').remove() // remove the HTML
		// make sure we restore realVolume to the original
		window.turntablePlayer.realVolume = this.realVolume
	}

	// update volume on ts volume change
	app.saveVolume = function (vol) {
		// handle both direct calls and on event
		// convert values so turntable understands
		vol = vol.target ? vol.target.value : vol
		let volume = vol > 0 ? convertVol(vol) : -3

		// turntable doesn't natively go lower than 7
		let volFunc = volume < 7 ? currentVol : this.realVolume
		window.turntablePlayer.realVolume = volFunc

		// send the saved volume to turntable
		window.turntablePlayer.setVolume(volume)
		window.util.setSetting('volume', volume)
	}

	// handle scrolling on volume slider
	app.rollVolume = function (e) {
		let curr = currentVol()
		// handle scrolling on the slider
		// first, check for scroll direction
		let down = e.originalEvent.deltaY > 0
		// step volume by 5 vs 1 if holding shift
		let step = e.originalEvent.shiftKey ? 1 : 5
		// update the volume based on current volume
		let save = down ? (curr - step) : (curr + step)
		// (obviously we should keep the scale 0 -100)
		save = save < 0 ? 0 : save > 100 ? 100 : save

		$('#tsSlider')[0].value = save
		this.saveVolume(save)
		return false // don't interrupt event flow
	}

	// temp mute on volume icon click
	app.muteVolume = function () {
		// toggle mute on/off
		this.muted = !this.muted
		this.classes('ts_muted', this.muted)
		// tt doesn't recognize 0 as 0, so -3
		let vol = this.muted ? -3 : naturalVol()
		window.turntablePlayer.setVolume(vol)

		this.Log(`turned mute ${ this.muted ? 'on' : 'off' }`)
	}

	// unmute after every song
	app.checkMuted = function () {
		// toggle mute off if on for next song
		if (this.muted) this.muteVolume()
	}

	// bind our volume events
	app.on('attach',  app.loadVolume)
	app.on('update',  app.loadVolume)
	app.on('nosong' , app.checkMuted)
	app.on('newsong', app.checkMuted)

}

// why doesn't turntable use standard linear volumes?
const convertVol = x => Math.log(x / 100) / Math.LN2 + 4

const currentVol = e => {
	// get the volume (in real numbers) from tt
	let curr = e || window.util.getSetting('volume')
	return 100 * Math.pow(2, curr - 4)
}

// get the volume from tt, but make it spicy
const naturalVol = () => convertVol(currentVol())
},{}],9:[function(require,module,exports){
// afk.js | respond to dings with an AFK message

module.exports = app => {

  // handle user being afk/active
  app.on('speak', function getAfk (e) {
    // run our afk check for self and mentions
    let { is_afk, afk_ping } = this.config
    // ignore if we aren't AFK or don't have a ping
    if (!is_afk || !afk_ping) return
    // send out afk message on mention
    // don't send messages to ourselves
    if (!e.$self) this.Speak(afk_ping)
    // and if it was us, we aren't afk
    // as long as we don't count our afk message
    else if (e.text != afk_ping) {
      this.setConfig('is_afk', false)
      this.Post({
        head: `Welcome Back!`,
        body: `You're no longer AFK!`
      })
    }
  })

  // set afk status on update
  app.on('update', function setAfk (key, val) {
    if (key != 'is_afk') return
    // send our afk ping if enabled
    let msg = this.config.afk_ping
    if (val && msg) this.Speak(msg)
  })

}
},{}],10:[function(require,module,exports){
// auto.js | our automatic functions

module.exports = app => {

  // the autobop/awesome function
  app.on(['attach', 'newsong'], function autoBop () {
    // reset our timeout every call
    if (this.bop) clearTimeout(this.bop)
    if (!this.config.autoBop) return

    // use random intervals to Bop
    const delay = (Math.random() * 7) * 100
    // "click" the awesome button
    const Bop = () => {
      $(window).focus()
      const opts = { bubbles: true, cancelable: true, view: window }
      const elem = document.querySelectorAll('.awesome-button')[0]
      const fire = new MouseEvent('click', opts)
      return !elem.dispatchEvent(fire)
    }

    this.bop = setTimeout(Bop, delay)
  })

  // nextdj: checking for open DJ spot
  app.on(['attach', 'update', 'rem_dj'], function checkDecks () {
    if (!this.config.nextdj) return
    // look for the "become DJ" button
    const button = $('.become-dj').length
    if (!button) return this.Log('nextdj: no spot')
    // attempt to take the spot if available
    this.Log('nextdj: jumping on decks')
    this.$View().becomeDj()
  })

  // nextdj: check if user jumped on decks
  app.on('add_dj', function isSpinning (e) {
    if (!this.config.nextdj) return
    if (this.$User().id != e.user[0].userid) return
    // disable nextdj if user jumps up
    this.setConfig('nextdj', false)
    // send success alert/notificaion
    const head = "You've hopped on deck!"
    const body = "NextDJ is now disabled."
    this.Notify({ head, body })
    this.Post({ head, body })
  })

  // autoqueue: jump up if pinged by queue
  app.on('speak', function autoQueue (e) {
    if (!this.config.auto_q) return
    // only queue if the string matches
    const match = this.config.q_ping == e.text
    if (match) this.$View().becomeDj()
  })

  // automatic reminders
  app.on('heartbeat', function sendReminder (ran) {
    if (!this.config.reminder) return
    let freq = parseInt(this.config.remind)
    let text = `[${this.$Room().name}] ${this.config.reminder}`
    // ran divisible by freq (eg, on 120 ran for every 60 freq)
    if ((ran % freq) === 0 && this.config.reminder) this.Speak(text)

  })

}
},{}],11:[function(require,module,exports){
// stats.js | tracking and posting song/dj stats

module.exports = app => {

  // retrieve and post song stats from session
  app.on('tracked', function (stat) {
    // stats on new song
    let curr = this.now_playing
    let last = this.last_played
    if (curr.song && this.config.ping_song) {
      // send new song notifications
      let head = `Now Playing: ${curr.song}`
      let body = stat || `By: ${curr.artist}`
      this.Notify({ head, body })
    }

    if (stat && this.config.chat_song) {
      // send last played stats to chat
      let body = `${last.song} by ${last.artist}`
      this.Post({ head: stat, body, type: 'stat' })
    }
  })

  // retrieve and post dj stats from session
  app.on('dropped', function (name, stat) {
    // stats for DJ dropping
    if (!this.config.chat_spun) return
    let head = `${name} - ${stat}`
    let body = " - is done spinning!"
    this.Post({ head, body, type: 'stat' })
  })

}
},{}],12:[function(require,module,exports){
// config.js | the default config objects

module.exports = app => {

	app.default = {
		logging: false,
		played: false,
		
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
		hot_words: "",

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

	app.options = {
		theme: {
			dark: "Dark Mode",
			night: "Night Mode",
			cosmic: "Cosmic",
			midnight: "Midnight"
		},
		style: {
			blue: "Blue",
			pink: "Pink",
			purple: "Purple",
			teal: "Teal"
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
},{}],13:[function(require,module,exports){
// cache.js | handles storing tt data

module.exports = app => {

	// add a DJ to session storage
	app.cacheDJ = function (e, data) {
		// cache new DJs on attach, and by event
		let user = e.user ? e.user[0].userid : e
		let curr = this.current_djs[user]

		// ignore already cached DJs
		if (!curr) this.current_djs[user] = {
			// 0 out values unless data provided 
			spun: data && data.spun ? data.spun : 0,
			love: data && data.love ? data.love : 0,
			hate: data && data.hate ? data.hate : 0,
			snag: data && data.snag ? data.snag : 0
		}
	}

	// remove a DJ from session storage
	app.clearDJ = function (e) {
		// clear and report stats of dropped DJ
		let name = e.user[0].name
		let user = e.user[0].userid
		let curr = this.current_djs[user]

		let stat = statLine(curr)
		delete this.current_djs[user]
		this.Emit('dropped', name, stat)
	}

	// update song stats on new song
	app.cacheSong = function (e) {
		// cache songs on attach and by event
		let song = e && e.room ? e.room.metadata.current_song : e
		let love = e && e.upvoters ? e.upvoters.length : 0
		let djid = song ? song.djid : false

		// update now playing and last played
		let last = { ...this.now_playing }
		let base = { love, hate: 0, snag: 0, dj: djid }
		this.now_playing = song ? { ...song.metadata, ...base } : {}
		this.last_played = last

		// add any stats to the associated DJ
		if (last.song && this.current_djs[last.dj]) {
			this.current_djs[last.dj].spun += 1
			this.current_djs[last.dj].love += last.love
			this.current_djs[last.dj].hate += last.hate
			this.current_djs[last.dj].snag += last.snag
		}

		this.Log(`new song: ${ this.now_playing.song || 'none' }`)
		this.Emit('tracked', statLine(last))
	}

	// bind our cache events
	app.on('add_dj',  app.cacheDJ)
	app.on('rem_dj',  app.clearDJ)
	app.on('nosong',  app.cacheSong)
	app.on('newsong', app.cacheSong)

	// update stats on snag
	app.on('snagged', function cacheSnag () {
		// update now playing
		this.now_playing.snag += 1
	})

	// update stats on vote
	app.on('update_votes', function cacheVote (e) {
		// update now playing
		this.now_playing.love = e.room.metadata.upvotes
		this.now_playing.hate = e.room.metadata.downvotes
	})

	// build fresh cache on attach
	app.on('attach', function buildCache (room) {
		// define our cache storage
		this.current_djs = {}
		this.now_playing = {}
		this.last_played = {}
		// and cache anything we find
		for (let id of room.djids) this.cacheDJ(id)
		this.cacheSong(room.currentSong)
	})

	// template for our statlines
	const statLine = obj => {
		let str = ''
		if (obj && "love" in obj) str += `${obj.love}❤️`
		if (obj && "hate" in obj) str += `${obj.hate}💔`
		if (obj && "snag" in obj) str += `${obj.snag}💖`
		if (obj && "spun" in obj) str += `${obj.spun}▶️`
		return str || false
	}

}
},{}],14:[function(require,module,exports){
// storage.js | saving our configs

module.exports = app => {

	// build config from defaults and local storage
	app.getConfig = function () {
		// only load the base config once
		if (this.__base) return
		// load base from window, if any
		this.__base = window.tsBase || 'https://ts.pixelcrsis.co/build'
		this.__logo = `${this.__base}/images/icon128.png`
		// load any saved user configs
		let storage = window.localStorage.getItem('tsdb')
		let configs = storage ? JSON.parse(storage) : {}
		let version = require('../../package.json').version
		// load and apply our defaults
		let is_afk  = false // can't be afk if we're loading
		this.config = { ...this.default, ...configs, version, is_afk }

		this.Emit('loaded', this.config)
	}

	// save config to local storage
	app.saveConfig = function (e) {
		// when an option is changed, save it
		// start by finding what option was changed
		let which = e.target.dataset.for
		let check = e.target.type == 'checkbox'
		let value = check ? e.target.checked : e.target.value

		// check for a button function
		// (save buttons for text fields)
		if (which.indexOf('ts_') === 0) {
			value = $(`#${which}`).val()
			which = which.split('ts_').join('')
		}

		// save the updated config 
		this.setConfig(which, value)

		// emit that the change was updated
		let visual = [ 'style', 'theme', 'user_css' ].includes(which)
		if (visual || !this.lobby) this.Emit('update', which, value)
		// only emit visual changes in the lobby
	}

	// update a config item
	app.setConfig = function (opt, val) {
		// update config object
		this.config[opt] = val
		// save the updated config locally
		let stored = JSON.stringify(this.config)
		window.localStorage.setItem('tsdb', stored)
		// mirror the option between window/hotbar
		let toggle = typeof val === 'boolean'
		let mirror = $(`*[data-for="${opt}"]`)
		mirror.prop(toggle ? 'checked' : 'value', val)
	}

}
},{"../../package.json":1}],15:[function(require,module,exports){
// events.js | trigger internal events

module.exports = app => {

	// bind functions to fire on events 
	app.on = function (keys, ...list) {
		// define storage if undefined
		if (!this.events) this.events = {}
		// list-ify non-listed event keys
		if (!Array.isArray(keys)) keys = [ keys ]
		// loop through our list of keys
		for (let key of keys) {
			// define event storage array if undefined
			if (!this.events[key]) this.events[key] = []
			// add function to our event storage
			// bind app to all event functions
			for (let func of list) this.events[key].push(func.bind(this))
		}
	}

	// fire functions bound to events on events
	app.Emit = function (key, ...args) {
		// if we have a list of functions
		let eventList = this.events[key]
		// then fire all the functions in the list
		if (eventList) for (let func of eventList) func(...args)
	}

	// listen and parse data from turntable events
	app.listen = function (event) {
		if (!event.command) return

		// attach some data of our own
		event.$ping = this.pinged(event.text)
		event.$name = this.$Name(event.userid)
		event.$from = this.$Name(event.senderid)
		event.$self = event.userid == this.$User().id

		// fire the event
		this.Emit(event.command, event)
	}

	// listen for DOM changes
	app.on('attach', function DOMListener () {
		let Observe = window.MutationObserver || window.WebKitMutationObserver
		let Watcher = new Observe(function(mutations) {
			for (let changed of mutations) {
				let el = changed.target

				// watch for playlist updates
				if (el.className == "songs") app.Emit('playlist')

				// watch for profile overlay insertion
				if (el.nodeName == "TITLE" && el.baseURI.indexOf('profile/') > -1) {
					app.Emit('profile', el.baseURI.split('profile/')[1])
				}
			}
		})

		Watcher.observe(document, { 
			subtree: true,
			childList: true
		})
	})

}
},{}],16:[function(require,module,exports){
// logger.js | print logs in console and room

module.exports = app => {

	// our main logger function
	app.Log = function (str) {
		// print the log in the console with timestamp
		let time = new Date().toLocaleTimeString('en-us')
		console.info(`[${time}] turnStyles :: ${str}`)
		// push the log record to the logbook
		if (!this.logbook) this.logbook = []
		str = cleanPaths(str) // clean "inserted" string
		this.logbook.push(`[tS - ${time}] <span>${str}</span>`)
		// only keep the last 50 logs in the logbook
		if (this.logbook.length > 50) this.logbook.shift()

		let logTab = $('#tsLogs')[0]
		if (logTab) {
			// print the logbook contents in the room tab
			logTab.innerHTML = this.logbook.reverse().join('<br>')
			logTab.scrollTop = logTab.scrollHeight
		}
	}

	app.on('attach', function addLogPane () {
    $('#tsLogs').remove()
    console.log('TODO: Test Logger Panel')
    $('.room-info-nav').after(`<div id="tsLogs"></div>`)
	})

	// automatic event logs
	app.on('registered', function joinLog (e) {
		for (let user of e.user) {
			this.Log(`[${user.name}](${user.userid}) joined.`)
		}
	})

	app.on('deregistered', function leftLog (e) {
		for (let user of e.user) {
			this.Log(`[${user.name}](${user.userid}) left.`)
		}
	})

	app.on('update_votes', function voteLog (e) {
		let curr = e.room.metadata.votelog
		let vote = curr[curr.length - 1]
		this.Log(`[${this.$Name(vote[0])}] voted: ${vote[1]}`)
	})

	app.on('add_dj', function jumpLog (e) {
		let user = e.user[0].userid
		this.Log(`add dj: [${this.$Name(user)}](${user})`)
	})

	app.on('rem_dj', function dropLog (e) {
		let user = e.user[0].userid
		this.Log(`rem dj: [${this.$Name(user)}](${user})`)
	})

	// trim URLs from inserted logs
	const cleanPaths = str => {
		if (str.indexOf('inserted:') < 0) return str
		let path = str.split('/')
		let file = path[path.length - 1]
		return `inserted: ${file}`
	}

}
},{}],17:[function(require,module,exports){
// notify.js | send notifications / fake chat messages

module.exports = app => {

  // "Silent" messages posted in chat
  app.Post = function (alert) {
    // Alerts post in the chat
    // but are only visible to the user
    let { head, body, type } = alert
    $('.chat .messages').append(`
      <div class="message ${type}"><em>
        <span class="subject">${head}</span>
        <span class="text">${body}</span>
      </em></div>
    `)
    this.$View().updateChatScroll()
  }

  // send a full chat message to the room
  app.Speak = function (text) {
    // Speak sends a message to chat
    // for all the users in the room
    let roomid = this.$View().roomId
    let section = this.$View().section
    window.turntable.sendMessage({
      text, api: 'room.speak', roomid, section
    })
  }

  // send a desktop notification
  app.Notify = function (alert) {
    // Notify sends desktop notifications
    // but not if we can't, or we're on turntable
    if (!this.canNotify() || document.hasFocus()) return
    let { head, body, type } = alert, icon = this.__logo
    // add a function to refocus and close the notification
    let ding = () => {
      let sent = new Notification(head, { icon, body })
      sent.onclick = () => { window.focus(); sent.close() }
    }
    // if we have a type, delay it, therwise send
    return type ? this.delay(ding, 5, type) : ding()
  }

  // get desktop notificaiton permissions
  app.canNotify = function () {
    let cfg = this.config
    // if we need to send notifications,
    // get the browser permission for it
    let has = cfg.ping_pm || cfg.ping_song || cfg.ping_chat
    // return if no notifications possible
    if (!has || !('Notification' in window)) return false
    if (Notification.permission === 'denied') return false
    // prompt for the permission if default
    if (Notification.permission === 'default') {
      this.Log('requesting notifications')
      Notification.requestPermission()
      return false
    }
    // otherwise we have permissions
    return true
  }

  // check for perms on attach and update
  app.on(['attach', 'update'], app.canNotify)

}
},{}],18:[function(require,module,exports){
// timing.js | internal loop and delays

module.exports = app => {

	// delay a function from firing if fired recently
	app.delay = function (func, delay, key) {
		// suspend func for delay seconds
		// used to prevent spam from notifications, etc
		if (!this.holding) this.holding = {}
		// if we're already delayed, just ignore
		if (this.holding[key]) return

		// self-clearing timeout
		let timeout = delay * 1000
		let cleared = () => { delete this.holding[key] }
		this.holding[key] = setTimeout(cleared.bind(this), timeout)

		// fire our function
		if (func) func()
	}

	// the heartbeat fired every minute
	app.beat = function () {
		// emit 'heartbeat' every minute
		this.config.beats = parseInt(this.config.beats) + 1
		this.Emit('heartbeat', this.config.beats)
	}

	// start loop and delay storage on attach
	app.on('attach', function () {
		this.holding = {}
		this.heart = setInterval(app.beat.bind(this), 60 * 1000)
	})

}
},{}],19:[function(require,module,exports){
// utils.js | interacting with turntable

module.exports = app => {
	
	// quick access to turntable room data
	app.$User = () => window.turntable.user
	app.$View = () => window.turntable.topViewController
	app.$Room = () => window.turntable.topViewController.roomData

	// get a username
	app.$Name = userid => {
		if (!userid) return 'Unknown'
		// find the user in the room
		let user = window.turntable.topViewController.userMap[userid]
		if (user) return user.attributes.name
		// else find the user via PM windows?
		if (window.turntable.buddyList.pmWindows) {
			let chat = window.turntable.buddyList.pmWindows[userid]
			if (chat) return chat.otherUser.attributes.name
		}
		// guess we have no idea
		return 'Someone'
	}

	// check if user was pinged in chat message
	app.pinged = str => {
		if (!str) return false
		let ping = `@${app.$User().attributes.name}`
		return str.toLowerCase().indexOf(ping.toLowerCase()) > -1
	}

	// toggle classes on the DOM
	app.classes = (name, on) => {
		let has = $('body').hasClass(name)
		if (on && !has) $('body').addClass(name)
		if (has && !on) $('body').removeClass(name)
	}

	// reload music players
	app.fixMusic = () => {
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
		$('#turnStyles').removeClass('active')
	}

}
},{}],20:[function(require,module,exports){
let turnStyles = {}
// a thing by pixelcrisis

require('./script/utils/ttdata.js')(turnStyles)
require('./script/utils/events.js')(turnStyles)
require('./script/utils/logger.js')(turnStyles)
require('./script/utils/timing.js')(turnStyles)
require('./script/utils/notify.js')(turnStyles)

require('./script/state/config.js')(turnStyles)
require('./script/state/session.js')(turnStyles)
require('./script/state/storage.js')(turnStyles)

require('./script/core/alerts.js')(turnStyles)
require('./script/core/themes.js')(turnStyles)
require('./script/core/volume.js')(turnStyles)
require('./script/core/profile.js')(turnStyles)
require('./script/core/playlist.js')(turnStyles)

require('./script/core/panels.js')(turnStyles)
require('./script/core/attach.js')(turnStyles)

require('./script/main/afk.js')(turnStyles)
require('./script/main/auto.js')(turnStyles)
require('./script/main/stats.js')(turnStyles)

// attach to the room
turnStyles.attach()
},{"./script/core/alerts.js":2,"./script/core/attach.js":3,"./script/core/panels.js":4,"./script/core/playlist.js":5,"./script/core/profile.js":6,"./script/core/themes.js":7,"./script/core/volume.js":8,"./script/main/afk.js":9,"./script/main/auto.js":10,"./script/main/stats.js":11,"./script/state/config.js":12,"./script/state/session.js":13,"./script/state/storage.js":14,"./script/utils/events.js":15,"./script/utils/logger.js":16,"./script/utils/notify.js":17,"./script/utils/timing.js":18,"./script/utils/ttdata.js":19}]},{},[20]);
