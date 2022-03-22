(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// hotbar.js | our hover menu bar

module.exports = App => {

  App.bindHotBar = function () {
    $("#tsHotBar").remove()
    $(".header-bar").append( HotBar() )

    $("#tsOpen").on("click", () => $("#tsWindow").addClass("active"))
    $("#tsHotBar *[data-for]").on("click", this.saveConfig.bind(this))
    $("#tsHotBar *[data-opt]").on("change", this.saveConfig.bind(this))
  }

  const HotBar = () => `
    <div id="tsHotBar">
      ${ App.$button("☰", false, "tsOpen") }
      ${ App.$toggle("is_afk", "AFK", false, 'hbIsAfk') }
      ${ App.$toggle("auto_b", "Autobop", false, 'hbAutoB') }
      ${ App.$toggle("auto_q", "AutoQueue", false, 'hbAutoQ') }
      ${ App.$toggle("nextdj", "Next DJ", false, 'hbNextDJ') }

      ${ App.$qtbtn("1") } ${ App.$qtbtn("2") } ${ App.$qtbtn("3") }

      ${ App.$toggle("bubble", "Bubbles", false, "hbBubbles") }
      ${ App.$toggle("people", "People", false, "hbPeople") }
      ${ App.$toggle("player", "Player", false, "hbPlayer") }
    </div>
  `

}
},{}],2:[function(require,module,exports){
// layout.js | internal templating

module.exports = App => {

  App.$button = (name, item, id, func) => `
    <button class="ts-button" ${ id ? `id="${ id }"` : '' }
      ${ item ? `data-for="${ item }"` : '' }
      ${ func ? `onclick="$tS.${ func }()"` : '' }>
      ${ name }
    </button>
  `

  App.$toggle = function (item, name, group, id) { 
    return `
    <label class="ts-toggle" ${ id ? `id="${ id }"` : '' }>
      <input type="checkbox" 
        data-opt="${ item }" data-cat="${ group || '' }"
        ${ getValue(this.config, item, group) ? 'checked' : ''} />
      <span></span> ${ name }
    </label>`
  }

  App.$string = function (item, name, group) { return `
    <input type="text" class="ts-inputs"
      data-opt="${ item }" data-cat="${ group || '' }"
      value="${ getValue(this.config, item, group) }" />
    ${ this.$button(name, item) }`
  }

  App.$field = function (item, name, group) { return `
    <textarea class="ts-inputs" rows="10"
      data-opt="${ item }" data-cat=${ group || '' }>
      ${ getValue(this.config, item, group) }
    </textarea>
    ${ this.$button(name, item) }`
  }

  App.$select = function (list, group) { return `
    <select class="ts-choice"
      data-opt="${ list }" data-cat="${ group || '' }">
      <option value="">No ${ this.cap(list) }</option>
      ${ getOptions(this.options, this.config, list, group) }
    </select>`
  }

  App.$qtbtn = function (i) {
    let name = `qtbtn${i}`
    let data = this.config.qtbtns[name]
    let text = `QT${i}`
    // parse label
    if (data.indexOf('||') > -1) {
      data = data.split('||')
      text = data.shift()
      data = data.join(' ')
    }
    return this.$button(text, false, name, name)
  }

}

const getValue = function (config, item, group) {
  return group ? config[group][item] : config[item]
}

const getOptions = function (options, config, list, group) {
  let value = getValue(config, list, group)
  return Object.keys(options[list]).map(data => {
    let name = options[list][data]
    let curr = data == value ? 'selected' : ''
    return `<option value="${ data }" ${ curr }>${ name }</option>`
  }).join('')
}
},{}],3:[function(require,module,exports){
// options.js | handle the hotbar/options panel

module.exports = App => {

  require("./layout.js")(App)
  require("./tabbed.js")(App)
  require("./hotbar.js")(App)
  require("./window.js")(App)

  App.on("attach", function () {
    this.bindHotBar()
    this.bindWindow()
  })

}
},{"./hotbar.js":1,"./layout.js":2,"./tabbed.js":4,"./window.js":5}],4:[function(require,module,exports){
// tabbed.js | defining our window tabs

module.exports = App => {

  App.tabs = [ 
    "General",
    "Visual",
    "Hotbar",
    "Alerts",
    "Support" 
  ]

  App.tabbed = {
    General: () => tabContent("General", `
      <h3>Automate</h3>
      <h5>${ App.$toggle("auto_b", "Enable Autobop") }</h5>
      <p>Vote "Awesome" after every new song starts, automatically!</p>

      <h5>${ App.$toggle("nextdj", "Take Next DJ Spot") }</h5>
      <p>turnStyles will attempt to add you as a DJ when a spot becomes available.</p>

      <h5>${ App.$toggle("auto_q", "Enable AutoQueue") }</h5>
      <p>For bots with a queue: Paste your queue ping above to auto DJ on ping!</p>

      <h3>General</h3>
      <h5>${ App.$toggle("is_afk", "Currently AFK" ) }</h5>
      ${ App.$string("afkstr", "Save AFK Response") }
      <p>Sends the AFK Response when you go AFK, and when you're pinged while AFK.</p>

      <h5>${ App.$toggle("volume", "Overrie Volume") }</h5>
      <p>Move volume controls out of the menu, and adds Mute For One Song.</p>
    `, true),

    Visual: () => tabContent("Visual", `
      <h3>Theme/Style</h3>
      ${ App.$select("theme") }
      ${ App.$select("style") }

      <h3>Visual Tweaks</h3>
      <h5>${ App.$toggle("played", "Show Recently Played") }</h5>
      <p>Highlights songs in playlist that were recently played in the room.</p>

      <h5>${ App.$toggle("stamps", "Add Timestamps To Chat") }</h5>
      <p>Adds a timestamp to the right of room chat messages.</p>

      <h3>Turntable</h3>
      ${ App.$toggle("bubble", "Show Chat Bubbles") }
      ${ App.$toggle("people", "Show Room Audience") }
      ${ App.$toggle("player", "Show Video Player") }

      <h3>Custom CSS</h3>
      ${ App.$field("u_css", "Save & Apply Styles") }
      <p>Add your own custom CSS snippets to turntable!</p>
    `),

    Hotbar: () => tabContent("Hotbar", `
      <h3>QuickText</h3>
      <h5>${ App.$toggle("qtbtn1", "Enable QT 1", "hotbar") }</h5>
      ${ App.$string("qtbtn1", "Save QT 1", "qtbtns") }
      <p>Send your most common messages at the push of a button!</p>

      <h5>${ App.$toggle("qtbtn2", "Enable QT 2", "hotbar") }</h5>
      ${ App.$string("qtbtn2", "Save QT 2", "qtbtns") }
      <p>Prefix with <strong>label || </strong> to add a button label!</p>
      <kbd>hello || hello world!</kbd>

      <h5>${ App.$toggle("qtbtn3", "Enable QT 3", "hotbar") }</h5>
      ${ App.$string("qtbtn3", "Save QT 3", "qtbtns") }
      <p>Send multiple by adding <strong>;;</strong></p>
      <kbd>welcome || Hello! || Rules! || Gif!</kbd>

      <h3>Show In Hotbar</h3>
      ${ App.$toggle("is_afk", "AFK", "hotbar") }
      ${ App.$toggle("auto_b", "Autobop", "hotbar") }
      ${ App.$toggle("auto_q", "AutoQueue", "hotbar") }
      ${ App.$toggle("nextdj", "Next DJ", "hotbar") }
      ${ App.$toggle("bubble", "Chat Bubble Toggle", "hotbar") }
      ${ App.$toggle("people", "Audience Toggle", "hotbar") }
      ${ App.$toggle("player", "Player Toggle", "hotbar") }
    `),

    Alerts: () => tabContent("Alerts", `
      <h3>Hot Words</h3>
      ${ App.$string("text", "Save Hot Words", "notify") }
      <p>Desktop Notifications/Highlight Message on word match in chat. Use more than one in a comma separated list.</p>

      <h3>Notify</h3>
      ${ App.$toggle("chat", "On New PM", "notify") }
      ${ App.$toggle("ding", "On New Mention", "notify") }
      ${ App.$toggle("song", "On New Songs", "notify") }
      <p>Send Desktop Notifications</p>

      <h3>Alerts</h3>
      ${ App.$toggle("song", "Last Song Stats", "alerts") }
      ${ App.$toggle("spun", "Last DJ Stats", "alerts") }
      ${ App.$toggle("snag", "Song Snags", "alerts") }
      ${ App.$toggle("join", "On User Join", "alerts") }
      ${ App.$toggle("left", "On User Leave", "alerts") }
      <p>Alerts show up in room chat but are only visible to you.</p>

      <h3>Reminder</h3>
      ${ App.$select("remind", "timing") }
      ${ App.$string("text", "Save Reminder", "timing") }
      <p>Sends Reminder to room at the selected interval! Useful for themes, rules, whatever you like!</p>
    `),

    Support: () => tabContent("support", `
      <h3>Debug</h3>
      ${ App.$toggle("logger", "Show Logs In Room Tab") }
      <div style="width: 0px;height: 10px;"></div>
      ${ App.$button("Reload turnStyles", false, false, "reload") }
      ${ App.$button("Reload Players", false, false, "reloadMusic") }
      ${ App.$button("Reset Data", false, false, "resetData") }

      <h3>Backup</h3>
      ${ App.$button("Download Backup", false, false, "backupData") }
      <label id="tsBackup" class="ts-button"><input type="file">Restore Backup</label>

      <h3>Support</h3>
      <a href="https://discord.gg/wqmAVvgSbE" class="ts-button" target="_blank">turnStyles Discord</a>
      <a href="https://discord.gg/jnRs4WnPjM" class="ts-button" target="_blank">turntable.fm Discord</a>

      <h3>Sharing</h3>
      <a href="https://chrome.google.com/webstore/detail/turntable-tweaks/pmlkackfnbbnjfejpddpakallilkbdme" class="ts-button" target="_blank">Chrome / Opera</a>
      <a href="https://addons.mozilla.org/en-US/firefox/addon/turnstyles-for-turntable-fm/" class="ts-button" target="_blank">Firefox</a>
      <a href="https://ts.pixelcrisis.co" class="ts-button" target="_blank">Bookmarklet</a>
      <a href="https://ts.pixelcrisis.co" class="ts-button" target="_blank">Beta</a>

      <h3>Author</h3>
      <em>turnStyles v${ App.config.version }<em><br />
      <strong>@crisis</strong> on Discord<br />
      <strong>@crisis</strong> on Turntable<br />
      <a target="_blank" href="https://patreon.com/pixelcrisis">patreon.com/pixelcrisis</a><br />
      <em>Request Themes & More on Patreon!</em>
    `)
  }

}

const tabContent = (name, content, active) => `
  <div class="ts-tabbed ${ active ? "active" : "" }" 
    data-tab="${ name }">${ content }</div>
`
},{}],5:[function(require,module,exports){
// window.js | our settings window

module.exports = App => {

  App.bindWindow = function () {
    $("#tsWindow").remove()
    $("body").append(`<div id="tsWindow">${ Options() }</div>`)

    $("#tsClose").on("click", () => $("#tsWindow").removeClass("active"))
    $("#tsWindow *[data-for]").on("click", this.saveConfig.bind(this))
    $("#tsWindow *[data-opt]").on("change", this.saveConfig.bind(this))

    $(".ts-tab").on("click", e => {
      let target = e.target.dataset.tab
      $("#tsWindow .active").removeClass("active")
      $(`*[data-tab="${ target }"]`).addClass("active")
    })

    $("#tsBackup input").on("change", this.uploadData)
    $("#tsWindow").on("click", function (event) {
      let click = event.target == this
      if (click) $("#tsWindow").removeClass("active")
    })
  }
  
  const Options = () => `
    <div id="tsConfig">
      <nav>
        <h2><span id="tsClose">✖</span>turnStyles</h2>
        ${ App.tabs.map(tab => `
            <div data-tab="${ tab }" 
              class="ts-tab ${ tab == "General" ? "active" : "" }">
              ${ tab }
            </div>`).join('') }
      </nav>
      ${ App.tabs.map(tab => App.tabbed[tab]()).join('') }
    </div>
  `

}
},{}],6:[function(require,module,exports){
module.exports={
  "name": "turnStyles",
  "version": "10.5.0",
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
    "postcss": "^8.2.9",
    "postcss-cli": "^8.3.1",
    "sass": "^1.32.8",
    "tinyify": "^3.0.0",
    "watchify": "^4.0.0"
  },
  "dependencies": {
    "node-sass": "^7.0.1"
  }
}

},{}],7:[function(require,module,exports){
// alerts.js | sending data to chat/notifications

module.exports = App => {

  App.notifyPMs = function (e) {
    if (this.config.notify.chat) this.Notify({
      head: `New PM ${e.$from ? `from: ${e.$from}` : ""}`,
      body: e.text, type: "pm_ping"
    })
  }

  App.notifyDings = function (e) {
    if (this.config.notify.ding && e.$ping) this.Notify({
      head: `[${this.view().roomData.name}] @${e.name}`,
      body: e.text, type: "chat_ping"
    })
    this.notifyText(e)
  }

  App.notifySong = function () {
    let curr = this.now_playing
    if (this.config.notify.song && curr.song) this.Notify({
      head: `Now Playing: ${curr.song}`, body: `By: ${curr.artist}`
    })
  }

  App.notifyText = function (e) {
    let match = e.text.toLowerCase()
    if (this.config.notify.text.length < 3) return
    let words = this.config.notify.text.toLowerCase().split(",")
    for (let word of words) if (match.indexOf(word.trim()) > -1) {
      $(".chat .messages .message:last-child").addClass("mention")
      return this.Notify({ head: `Hot Word: "${ word }"`, body: e.text })
    }
  }

  App.alertSnags = function (e) {
    if (this.config.alerts.snag) this.Post({
      head: e.$name, body: `has snagged this track!`, type: "snag"
    })
  }

  App.alertJoin = function (e) {
    if (this.config.alerts.join) for (let user of e.user) this.Post({
      head: user.name, body: "joined.", type: "join"
    })
  }

  App.alertLeft = function (e) {
    if (this.config.alerts.left) for (let user of e.user) this.Post({
      head: user.name, body: "left.", type: "left"
    })
  }

  App.on("pmmed", App.notifyPMs)
  App.on("speak", App.notifyDings)
  App.on("tracked", App.notifySong)
  App.on("snagged", App.alertSnags)
  App.on("registered", App.alertJoin)
  App.on("deregistered", App.alertLeft)

}
},{}],8:[function(require,module,exports){
// autobop.js | automatically bopping!

module.exports = App => {

	App.autoBop = function () {
		if (this.bop) clearTimeout(this.bop)
		if (!this.config.auto_b) return

		const delay = (Math.random() * 7) * 100
		const press = () => click(".awesome-button")
		this.bop = setTimeout(press, delay)
	}

	App.on("newsong", App.autoBop)

}

const click = el => {
  $(window).focus()
  const opts = { bubbles: true, cancelable: true, view: window }
  const elem = document.querySelectorAll(el)[0]
  const fire = new MouseEvent("click", opts)
  return !elem.dispatchEvent(fire)
}
},{}],9:[function(require,module,exports){
// away.js | respond to dings with an AFK message

module.exports = App => {

  App.setAfk = function (key, val, grp) {
    if (key != "is_afk" || grp) return
    if (val && this.config.afkstr) this.isAfk()
  }

  App.isAfk = function () {
    if (!this.config.afkstr) return
    this.Batch(this.config.afkstr)
  }

  App.getAfk = function (event) {
    if (!this.config.is_afk) return
    let check = this.config.afkstr.split(";;").map(s => s.trim())
    if (!event.$self && event.$ping) this.isAfk()

    else if (event.$self && !check.includes(event.text)) {
      this.setConfig("is_afk", false)
      this.Post({
        head: "Welcome Back!",
        body: "You're no longer AFK!"
      })
    }
  }

  App.on("speak", App.getAfk)
  App.on("update", App.setAfk)

}
},{}],10:[function(require,module,exports){
// chat.js | modifying the chatbox

module.exports = App => {

  App.fadeNewSong = function (el) {
    let last = $(el).children(".message").last()
    let user = last.has(".avatar").length
    let text = last[0].innerText.includes("started playing")
    if (!user && text) last.addClass("stat")
  }

  App.addTimeStamp = function (event) {
    if (!this.config.stamps) return
    let message = $(".chat .messages .message:last-of-type")
    let matches = message[0].innerText.indexOf(event.name) === 0
    let stamped = message.has(".timestamp").length
    if (matches && !stamped) {
      let stamp = this.now().split(":").slice(0, 2).join(":")
      message.prepend(`<div class="timestamp">${ stamp }</div>`)
    }
  }

  App.on("speak", App.addTimeStamp)
  App.on("newchat", App.fadeNewSong)

}
},{}],11:[function(require,module,exports){
// nextdj.js | handing auto DJing

module.exports = App => {

  App.nextDJ = function () {
    if (!this.config.nextdj) return
    let button = $(".become-dj").length
    if (!button) return this.Log("nextdj: no spot")
    this.Log("nextdj: attempting jump")
    this.View().becomeDj()
  }

  App.spinning = function (event) {
    if (!this.config.nextdj) return
    if (this.User().id != event.user[0].userid) return

    this.setConfig("nextdj", false)
    let head = "You've hopped on deck!"
    let body = "NextDJ has been disabled."
    this.Notify({ head, body })
    this.Post({ head, body })
  }

  App.autoQueue = function (event) {
    if (!this.config.auto_q) return
    if (event.text == this.config.q_text) this.View().becomeDj()
  }

  App.on("add_dj", App.spinning)
  App.on([ "update", "rem_dj" ], App.nextDJ)
  App.on([ "speak", "pmmed"], App.autoQueue)

}
},{}],12:[function(require,module,exports){
// playlist.js | modifying the playlist

module.exports = App => {

  App.bindPlaylist = function () {
    this.countPlaylist()
    this.checkPlaylist()
    this.classes("played", this.config.played)
  }

  App.countPlaylist = function () {
    let head = $("#playlist-header .text")[0]
    let data = window.playlist.fileids.length
    let name = head.innerHTML.split("<em>")[0]
    head.innerHTML = `${ name } <em>${ data }</em>`
  }

  App.checkPlaylist = function () {
    $(".song.ts_played").removeClass("ts_played")
    if (!this.config.played) return

    let list = this.Room().metadata.songlog
    $("#queue .songs .song").each(function () {
      let el = $(this)
      let name = el.find(".title").text()
      let band = el.find(".details").text().split(" • ")[0]
      for (let item of list) {
        let { song, artist } = item.metadata
        if (song == name && artist == band) el.addClass("ts_played")
      }
    })
  }

  App.updatePlaylist = function (key, val) {
    if (key == "played") this.classes("played", val)
  }

  App.on("update", App.updatePlaylist)
  App.on("playlist", App.countPlaylist)
  App.on([ "tracked", "playlist" ], App.checkPlaylist)

}
},{}],13:[function(require,module,exports){
// plugins.js | getting our "features"

module.exports = App => {
	
	require("./themes.js")(App)
	require("./visual.js")(App)
	require("./volume.js")(App)
	require("./chat.js")(App)
	require("./quicktext.js")(App)
	require("./playlist.js")(App)
	require("./alerts.js")(App)
	require("./stats.js")(App)
	require("./away.js")(App)
	require("./autobop.js")(App)
	require("./reminder.js")(App)
	require("./nextdj.js")(App)

	App.on("loaded", function (config) {
		this.loadThemes(config)
		this.loadClasses(config)
	})

	App.on("attach", function () {
		this.autoBop()
		this.bindPlaylist()
	})

}
},{"./alerts.js":7,"./autobop.js":8,"./away.js":9,"./chat.js":10,"./nextdj.js":11,"./playlist.js":12,"./quicktext.js":14,"./reminder.js":15,"./stats.js":16,"./themes.js":17,"./visual.js":18,"./volume.js":19}],14:[function(require,module,exports){
// quicktext.js | sending rapid messages

module.exports = App => {

	App.qtbtns = function (i) {
		let text = this.config.qtbtns[`qtbtn${ i }`]
		if (!text) return

		// remove the label
		if (text.indexOf("||") > -1) text = text.split("||")[1].trim()
		this.Batch(text)
	}

	// easy inline onlick access
	App.qtbtn1 = function () { this.qtbtns('1') }
	App.qtbtn2 = function () { this.qtbtns('2') }
	App.qtbtn3 = function () { this.qtbtns('3') }

}
},{}],15:[function(require,module,exports){
// reminder.js | text at an interval

module.exports = App => {

	App.sendReminder = function (ran) {
		if (!this.config.timing.text) return
		let freq = parseInt(this.config.timing.post)
		let text = `[${ this.Room().name }] ${ this.config.timing.text }`
		if ((ran % freq) === 0 && this.config.timing.text) this.Chat(text)
	}

	App.on("heartbeat", App.sendReminder)

}
},{}],16:[function(require,module,exports){
// stats.js | tracking and posting song/dj stats

module.exports = App => {

  App.songStats = function (stat) {
    let last = this.last_played
    if (this.config.alerts.song && stat) this.Post({
      head: stat,
      body: `${last.song} by ${last.artist}`,
      type: "stat"
    })
  }

  App.djStats = function (name, stat) {
    if (this.config.alerts.spun) this.Post({
      head: `${name} - ${stat}`,
      body: ` - is done spinning!`,
      type: "stat"
    })
  }

  App.userStats = function (id) {  
    if ($(".profile.modal .statslink").length) return
    // force the web links section to be visible
    $(".profile.modal .section.web-links").show()
    $(".profile.modal .website").append(statLink(id))
  }

  App.on("tracked", App.songStats)
  App.on("dropped", App.djStats)
  App.on("profile", App.userStats)

}

const statLink = id => `
  <a target="_blank" class="statslink" onclick="$('.modal .close-x')[0].click()"
    href="https://thompsn.com/turntable/leaderboard/thing/?id=${ id }">
    Leaderboard
  </a>
`
},{}],17:[function(require,module,exports){
// themes.js | handles loading/reloading themes/styles

module.exports = App => {

  App.loadThemes = function (config) {
    $("#ts_core, #ts_themes, #ts_styles, #ts_css").remove()
    
    this.insert("turnStyles")
    this.insert(config.theme, "themes")
    this.insert(config.style, "style")
    this.inject(config.u_css)
    this.themed(config.theme)
  }

  App.updateThemes = function (key, val) {
    if (key == "theme") this.themed(val)
    if (key == "theme") this.insert(val, "themes")
    if (key == "style") this.insert(val, "styles")
    if (key == "u_css") this.inject(val)
  }

  App.insert = function (file, folder) {
    let base = `${ this.__base }${ folder ? `/${ folder }` : "" }`
    let path = file ? `${ base }/${ file }.css?v=${ Math.random() }` : "#"

    let id = `ts_${ folder || "core" }`
    let el = $(`#${ id }`)
    if (!el.length) document.head.append(link(id, path))
    else el.attr("href", path)

    if (path != "#") this.Log(`inserted: ${ path.split("?v")[0] }`)
  }

  App.inject = function (style) {
    let el = $("#ts_css")
    if (el.length) el[0].innerHTML = style
    else document.head.append(css(style))
    if (style) this.Log(`injected: ${ style }`)
  }

  App.themed = function (theme) {
    this.classes("th-none", !theme) 
    let last = $("body").data("theme")
    if (last) $("body").removeClass(`th-${ last }`)
    if (theme) $("body").addClass(`th-${ theme }`)
    $("body").data("theme", theme)
  }

  App.on("update", App.updateThemes)

}

// create a link element
const link = (id, url) => {
  let el = document.createElement('link'); el.id = id; 
  el.type = "text/css"; el.rel = "stylesheet"; el.href = url;
  return el
}

// create our user style element
const css = style => {
  let el = document.createElement('style'); el.id = "ts_css";
  el.type = "text/css"; el.innerHTML = style;
  return el
}
},{}],18:[function(require,module,exports){
// visual.js | changing and toggling elements

module.exports = App => {

	App.loadClasses = function (config) {
		this.classes("logger", config.logger)
		this.classes("no_bub", !config.bubble)
		this.classes("no_aud", !config.people)
		this.classes("no_vid", !config.player)

    this.classes("hb-is_afk", !config.hotbar.is_afk)
    this.classes("hb-auto_b", !config.hotbar.auto_b)
    this.classes("hb-auto_q", !config.hotbar.auto_q)
    this.classes("hb-nextdj", !config.hotbar.nextdj)
    this.classes("hb-bubble", !config.hotbar.bubble)
    this.classes("hb-people", !config.hotbar.people)
    this.classes("hb-player", !config.hotbar.player)
    this.classes("hb-qtbtn1", !config.hotbar.qtbtn1)
    this.classes("hb-qtbtn2", !config.hotbar.qtbtn2)
    this.classes("hb-qtbtn3", !config.hotbar.qtbtn3)
	}

	App.updateClasses = function (key, val, grp) {
    if (key == 'bubble') this.classes('no_bub', !val)
    if (key == 'player') this.classes('no_vid', !val)
    if (key == 'people') this.classes('no_aud', !val)
    if (key == 'logger') this.classes('logger', val)

    if (grp == "hotbar") {
      if (key == "is_afk") this.classes('hb-is_afk', !val)
      if (key == "auto_b") this.classes('hb-auto_b', !val)
      if (key == "auto_q") this.classes('hb-auto_q', !val)
      if (key == "nextdj") this.classes('hb-nextdj', !val)
      if (key == "bubble") this.classes('hb-bubble', !val)
      if (key == "people") this.classes('hb-people', !val)
      if (key == "player") this.classes('hb-player', !val)
      if (key == "qtbtn1") this.classes('hb-qtbtn1', !val)
      if (key == "qtbtn2") this.classes('hb-qtbtn2', !val)
      if (key == "qtbtn3") this.classes('hb-qtbtn3', !val)
    }

    if (grp == "hotbar" || grp == "qtbtns") {
      this.bindHotBar()
    }
	}

	App.on("update", App.updateClasses)

}
},{}],19:[function(require,module,exports){
// volume.js | replace the turntable volume

module.exports = App => {
	// why doesn't turntable use standard linear volumes?
	const convertVol = x => Math.log(x / 100) / Math.LN2 + 4
	const currentVol = e => {
		// get the volume (in real numbers) from tt
		let curr = e || window.util.getSetting("volume")
		return 100 * Math.pow(2, curr - 4)
	}
	// get the volume from tt, but make it spicy
	const naturalVol = () => convertVol(currentVol())

	// load volume functionality
	App.loadVolume = function () {
		let opt = this.config.volume
		let has = $("body").hasClass("ts_vol")
		this.classes("ts_vol", opt)

		// stash a copy of realVolume
		let rV = window.turntablePlayer.realVolume
		if (!this.realVolume) this.realVolume = rV

		// turn volume control on or off 
		if (opt && !has) this.addVolume()
		if (has && !opt) this.remVolume()
	}

	// inject our volume UI into tt
	App.addVolume = function () {
		$(".header-content").append(volume(currentVol()))
		// bind up our events
		const scroll = "DOMMouseScroll mousewheel"
		$("#tsMute")  .on("click", this.muteVolume.bind(this))
		$("#tsSlider").on("input", this.saveVolume.bind(this))
		$("#tsSlider").on( scroll, this.rollVolume.bind(this))
	}

	// remove our volume UI from tt
	App.remVolume = function () {
		$("#tsVolume").remove()
		window.turntablePlayer.realVolume = this.realVolume
	}

	// update volume on ts volume change
	App.saveVolume = function (vol) {
		vol = vol.target ? vol.target.value : vol
		let volume = vol > 0 ? convertVol(vol) : -3
		// turntable doesn"t natively go lower than 7
		let volFunc = volume < 7 ? currentVol : this.realVolume
		window.turntablePlayer.realVolume = volFunc
		window.turntablePlayer.setVolume(volume)
		window.util.setSetting("volume", volume)
	}

	// handle scrolling on volume slider
	App.rollVolume = function (e) {
		let curr = currentVol()
		let down = e.originalEvent.deltaY > 0
		// step volume by 5 vs 1 if holding shift
		let step = e.originalEvent.shiftKey ? 1 : 5
		let save = down ? (curr - step) : (curr + step)
		save = save < 0 ? 0 : save > 100 ? 100 : save

		$("#tsSlider")[0].value = save
		this.saveVolume(save)
		return false // don"t interrupt event flow
	}

	// temp mute on volume icon click
	App.muteVolume = function () {
		// toggle mute on/off
		this.muted = !this.muted
		this._class("ts_muted", this.muted)
		let vol = this.muted ? -3 : naturalVol()
		window.turntablePlayer.setVolume(vol)

		this.Log(`turned mute ${ this.muted ? "on" : "off" }`)
	}

	// unmute after every song
	App.checkMuted = function () {
		if (this.muted) this.muteVolume()
	}

	// reload music players
	App.fixMusic = () => {
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

	// bind our volume events
	App.on("attach",  App.loadVolume)
	App.on("update",  App.loadVolume)
	App.on("nosong" , App.checkMuted)
	App.on("newsong", App.checkMuted)

}

const volume = val => `
  <div id="tsVolume">
    <span id="tsMute"></span>
    <input id="tsSlider" type="range" min="0" max="100" value="${ val }">
    <em id="tsMuted">Muted For One Song</em>
  </div>
`
},{}],20:[function(require,module,exports){
// configs.js | the default config objects

module.exports = App => {

	App.default = {
		theme: "dark",
		style: "",
		u_css: "",

		is_afk: false,
		afkstr: "I'm AFK - Back in a sec!",

		people: true,
		player: true,
		bubble: true,

		logger: false,
		volume: false,
		played: false,
		stamps: false,

		auto_b: true,
		nextdj: false,
		auto_q: false,
		q_text: "Hey @user - it's your turn!",

		notify: {
			song: false,
			ding: false,
			chat: false,
			text: ""
		},

		alerts: {
			song: false,
			spun: false,
			snag: false,
			join: false,
			left: false
		},

		hotbar: {
			is_afk: true,
			auto_b: true,
			auto_q: true,
			nextdj: true,
			bubble: false,
			people: false,
			player: false,
			qtbtn1: false,
			qtbtn2: false,
			qtbtn3: false
		},

		qtbtns: {
			qtbtn1: "",
			qtbtn2: "",
			qtbtn3: ""
		},

		timing: {
			beat: 0,
			post: 0,
			text: "Today's theme is: Cool."
		},
	}

	App.options = {
		theme: {
			dark: "Dark Mode",
			night: "Night Mode",
			cosmic: "Cosmic",
			forest: "Forest",
			midnight: "Midnight"
		},
		style: {
			blue: "Blue",
			pink: "Pink",
			green: "Green",
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
},{}],21:[function(require,module,exports){
// migrate.js | config layout migrations

module.exports = App => {

	App.migrate = function (config) {
		for (let migrate of Migrations) config = migrate(config)
		return config
	}

}

const Migrations = [

	function v10 (config) {		
		const mapped = {
			"user_css": { map: "u_css" },

			"autobop": { map: "auto_b" },
			"logging": { map: "logger" },
			"has_vol": { map: "volume" },

			"q_ping": 	{ map: "q_text" },
			"afk_ping": { map: "afkstr" },

			"no_aud": { map: "people", flip: true },
			"no_vid": { map: "player", flip: true },
			"no_bub": { map: "bubble", flip: true },

			"ping_pm": 	 { map: "chat", cat: "notify" },
			"ping_song": { map: "song", cat: "notify" },
			"ping_chat": { map: "ding", cat: "notify" },
			"hot_words": { map: "text", cat: "notify" },

			"chat_song": { map: "song", cat: "alerts" },
			"chat_spun": { map: "spun", cat: "alerts" },
			"chat_snag": { map: "snag", cat: "alerts" },
			"chat_join": { map: "join", cat: "alerts" },
			"chat_left": { map: "left", cat: "alerts" },

			"beats": 		{ map: "beat", cat: "timing" },
			"remind": 	{ map: "post", cat: "timing" },
			"reminder": { map: "text", cat: "timing" }
		}

		return Remap(config, mapped)
	}
]

const Remap = function (config, mapped) {
	for (let key in mapped) {
		let { map, cat, flip } = mapped[key]
		// update old keys
		if (key in config) {
			let data = flip ? !config[key] : config[key]
			if (!cat) config[map] = data
			else {
				if (config[cat]) config[cat][map] = config[key]
				else config[cat] = { [map]: config[key] }
			}
			delete config[key]
		}
	}
	return config
}
},{}],22:[function(require,module,exports){
// restore.js | backup / restore / reset

module.exports = App => {

	App.resetData = function (data) {
		// use data if given, otherwise
		// reset all values to default
		data = data || this.default
		for (let prop in data) {
			this.config[prop] = data[prop]
		}
		// save the new settings and reload
		let store = JSON.stringify(this.config)
		window.localStorage.setItem("tsdb", store)
		this.reload()
	}

	App.backupData = function () {
		let config = JSON.stringify(this.config)
		let backup = new Blob([ config ], { type: "text/json" })
		// special use case for windows
		if (window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveBlob(backup, "tsdb.json")
		}
		// otherwise go the HTML5 route
		else {
			let el = window.document.createElement("a")
			el.href = window.URL.createObjectURL(backup)
			el.download = "tsdb.json"
			document.body.appendChild(el)
			el.click()
			document.body.removeChild(el)
		}
	}

	App.uploadData = function () {
		let file = $("#tsBackup input")[0].files[0]
		if (!file) return alert("Select Backup File First")
		
		let Read = new FileReader()
		Read.onload = App.restoreData
		Read.readAsText(file)
	}

	App.restoreData = function (event) {
		let data = JSON.parse(event.target.result)
		if (data.hotbar && data.people) App.resetData(data)
		else alert("Error Reading Backup File")
	}

}
},{}],23:[function(require,module,exports){
// session.js | handles storing tt data

module.exports = App => {

	App.initCache = function (room) {
		// define session
		this.current_djs = {}
		this.now_playing = {}
		this.last_played = {}
		// cache current activity
		this.cacheSong(room.currentSong)
		for (let id of room.djids) this.cacheDJ(id)
	}

	App.cacheDJ = function (e) {
		// find user by id (e) or event (e.user)
		let user = e.user ? e.user[0].userid : e
		// add them to cache if not there
		let curr = this.current_djs[user]
		if (!curr) this.current_djs[user] = getStats()
	}

	App.updateDJ = function (last) {
		// add last song to DJ stats 
		if (!last.song || !last.djid) return
		let curr = this.current_djs[last.djid]
		let data = getStats(curr, { ...last, spun: 1 })
		this.current_djs[last.djid] = data
	}

	App.resetDJ = function (e) {
		let user = e.user[0].userid
		let stat = statLine(this.current_djs[user])
		delete this.current_djs[user]
		this.Emit("dropped", e.user[0].name, stat)
	}

	App.cacheSong = function (e) {
		// check if attaching song (e) or new song (metadata)
		let song = e && e.room ? e.room.metadata.current_song : e
		let love = e && e.upvoters ? e.upvoters.length : 0
		let djid = song ? song.djid : false

		let last = { ...this.now_playing }
		let base = { djid, love, hate: 0, snag: 0 }
		let curr = song ? { ...song.metadata, ...base } : {}

		this.now_playing = curr
		this.last_played = last

		this.updateDJ(last)

		let name = curr.song || "none"
		this.Log(`new song: ${ name }`)
		this.Emit("tracked", statLine(last))
	}

	App.cacheVote = function (e) {
		// have to pull from the room
		this.now_playing.love = e.room.metadata.upvotes
		this.now_playing.hate = e.room.metadata.downvotes
	}

	App.cacheSnag = function () {
		// just increment snags
		this.now_playing.snag += 1
	}

	App.on("attach", App.initCache)
	App.on("add_dj", App.cacheDJ)
	App.on("rem_dj", App.resetDJ)
	App.on("snagged", App.cacheSnag)
	App.on("update_votes", App.cacheVote)
	App.on([ "nosong", "newsong" ], App.cacheSong)

}

const getStats = (curr, data) => {
	let base = { spun: 0, love: 0, hate: 0, snag: 0 }
	// add value from current stats and updated stats
	for (let p in curr || {}) if (p in base) base[p] += curr[p]
	for (let p in data || {}) if (p in base) base[p] += data[p]
	return base
}

const statLine = (obj = {}, str = "") => {
	if ("love" in obj) str += `${obj.love}❤️`
	if ("hate" in obj) str += `${obj.hate}💔`
	if ("snag" in obj) str += `${obj.snag}💖`
	if ("spun" in obj) str += `${obj.spun}▶️`
	return str
}
},{}],24:[function(require,module,exports){
// storage.js | saving our configs

module.exports = App => {

	require("./configs.js")(App)
	require("./migrate.js")(App)
	require("./restore.js")(App)
	require("./session.js")(App)

	App.readConfig = function () {
		let store = this.__sync || {}
		let local = window.localStorage.getItem("tsdb")
		local = local ? JSON.parse(local) : {}
		return { ...local, ...store }
	}

	App.writeConfig = function () {
		let local = JSON.stringify(this.config)
		window.localStorage.setItem("tsdb", local)
	}

	App.initConfig = function () {
		// load and build config
		// but only do it once
		if (this.__base) return
		this.__base = window.tsBase
		this.__sync = window.tsSync
		this.__logo = `${ this.__base }/images/icon128.png`

		let storage = this.readConfig()
		let configs = { ...this.default, ...storage }
		let version = require("../package.json").version

		this.config = this.migrate(configs)
		this.config.version = version
		this.config.is_afk = false

		this.Emit("loaded", this.config)
	}

	App.saveConfig = function (e) {
		let item = e.target.dataset
		if (!item.opt && !item.for) return
		// figure out which item to save
		let name = item.for || item.opt
		let bool = e.target.type == "checkbox"
		let data = bool ? e.target.checked : e.target.value
		if (item.for) data = $(`*[data-opt="${ name }"]`).val()
		// and save the updated item
		this.setConfig(name, data, item.cat)
		// only emit visual changes in the lobby
		let visual = [ "style", "theme", "u_css", "hotbar", "macros" ]
		let update = !this.lobby || visual.includes(name)
		if (update) this.Emit("update", name, data, data.cat)
	}

	App.setConfig = function (name, data, cat) {
		if (!cat) this.config[name] = data
		else this.config[cat][name] = data
		this.writeConfig()
		// mirror values with window / hotbar
		let toggle = typeof data == "boolean"
		let mirror = $(`*[data-opt="${ name }"][data-cat="${ cat || "" }"]`)
		mirror.prop(toggle ? "checked" : "value", data)
	}

}
},{"../package.json":6,"./configs.js":20,"./migrate.js":21,"./restore.js":22,"./session.js":23}],25:[function(require,module,exports){
let turnStyles = window.$tS = {}
// a thing by pixelcrisis

require("./utility/utility.js")(turnStyles)
require("./storage/storage.js")(turnStyles)
require("./options/options.js")(turnStyles)
require("./plugins/plugins.js")(turnStyles)

const init = () => {
	// throw errors for older plugins
	if (!window.tsBase) {
		let ts_url = "https://ts.pixelcrisis.co"
		let issues = `Oops! Something went wrong with turnStyles! 
		If this is a bookmarklet, you may need to update it.
		To update, view the ts website at ${ ts_url } 
		Clicking OK will attempt to open the turnStyles website in a new tab.`
		let update = () => window.open(ts_url, "_blank")
		
		if (window.confirm(issues)) update()
		return false
	}

	turnStyles.attach()
}

init()
},{"./options/options.js":3,"./plugins/plugins.js":13,"./storage/storage.js":24,"./utility/utility.js":32}],26:[function(require,module,exports){
// attach.js | connect app to the turntable room

module.exports = App => {

	App.attach = function () {
		this.initConfig()
		const core = window.turntable
		if (!core) return this.Log("No room")
		const user = window.turntable.user

		this.lobby = $("#turntable #topBG").length
		if (this.lobby) {
			this.bindHotBar()
			this.bindWindow()
			return false
		}
		// loop and check until the room is fully loaded
		const again = () => setTimeout(App.attach.bind(this), 150)

		if (!user) return again()
		let room = findKey(core, "roomId")
		if (!room) return again()
		let full = findKey(room, "roomData")
		if (!full) return again()

		// fully loaded!
		this.lisener = this.listen.bind(this)
		window.turntable.addEventListener("message", this.listener)
		this.Emit("attach", room)
		this.Log("loaded room")
	}

	App.reload = function () {
		clearInterval(this.heart)
		window.turntable.removeEventListener("message", this.listener)
		$(`script[src*="turnStyles.js"]`).remove()

		const script = document.createElement("script")
		script.src = `${ this.__base }/turnStyles.js?v=${ Math.random() }`
		script.type = "text/javascript"

		this.Log("reloading")
		document.body.append(script)
	}

}

// find property by key in an object
const findKey = (obj, key) => {
  const exists = o => o !== null && typeof o != "undefined" && o[key]
  for (let prop in obj) if (exists(obj[prop])) return obj[prop]
}
},{}],27:[function(require,module,exports){
// events.js | trigger internal events

module.exports = App => {

	App.on = function (keys, ...list) {
		// bind list of functions to event list
		if (!this.events) this.events = {}
		if (!Array.isArray(keys)) keys = [ keys ]

		for (let key of keys) {
			if (!this.events[key]) this.events[key] = []
			for (let f of list) this.events[key].push(f.bind(this))
		}
	}

	App.Emit = function (key, ...args) {
		// fire functions bound to events
		let list = this.events[key]
		if (list) for (let f of list) f(...args)
	}

	App.listen = function (event) {
		if (!event.command) return
		// listen to/parse turntable events
		event.$ping = this.findPing(event.text)
		event.$name = this.findName(event.userid)
		event.$from = this.findName(event.senderid)
		event.$self = this.User().id == event.userid
		this.Emit(event.command, event)
	}

	App.watcher = function () {
		let Observe = window.MutationObserver || window.WebKitMutationObserver
		let Watcher = new Observe(function (mutations) {
			for (let changed of mutations) {
				let el = changed.target

				if (el.className == "songs") App.Emit("playlist")
				if (el.className == "messages") App.Emit("newchat", el)

				if (el.nodeName == "TITLE" && el.baseURI.indexOf("profile/") > -1) {
					App.Emit("profile", el.baseURI.split("profile/")[1])
				}
			}
		})
		Watcher.observe(document, { subtree: true, childList: true })
	}

	App.on("attach", App.watcher)

}
},{}],28:[function(require,module,exports){
// logger.js | print logs in console and room

module.exports = App => {

	App.Log = function (str) {
		console.info(`[${ this.now() }] turnStyles :: ${ str }`)
		str = clean(str)

		if (!this.logbook) this.logbook = []
		this.logbook.push(`[tS - ${ this.now() }] <span>${ str }</span>`)
		if (this.logbook.length > 50) this.logbook.shift()

		let print = $("#tsLogs")[0]
		if (print) {
			print.innerHTML = this.logbook.reverse().join("<br>")
			print.scrollTop = print.scrollHeight
		}
	}

	App.bindLogs = function () {
		$("#tsLogs").remove()
		$(".room-info-nav").after(`<div id="tsLogs"></div>`)
	}

	// log events
	App.on("update", function (key, val) {
		this.Log(`update: [${ key }] to (${ val })`)
	})

	App.on("registered", function (event) {
		for (let user of event.user) {
			this.Log(`[${ user.name }](${ user.userid }) joined.`)
		}
	})

	App.on("deregistered", function (event) {
		for (let user of event.user) {
			this.Log(`[${ user.name }](${ user.userid }) left.`)
		}
	})

	App.on("add_dj", function (event) {
		let id = event.user[0].userid
		this.Log(`add dj: [${ this.findName(id) }](${ id })`)
	})

	App.on("rem_dj", function (event) {
		let id = event.user[0].userid
		this.Log(`rem dj: [${ this.findName(id) }](${ id })`)
	})

	App.on("update_votes", function (event) {
		let list = event.room.metadata.votelog
		let last = list[list.length - 1]
		this.Log(`[${ this.findName(last[0]) }] voted: ${ last[1] }`)
	})

}

const clean = str => {
  // trim inserted URL file paths
  if (str.indexOf('inserted:') == 0) {
    let path = str.split('/')
    return `inserted: ${path[path.length - 1]}`
  }
  return str
}
},{}],29:[function(require,module,exports){
// notify.js | manage notifications

module.exports = App => {

  App.Notify = function (alert) {
    if (!this.canNotify() || document.hasFocus()) return
    let { head, body, type } = alert, icon = this.__logo

    let ding = () => {
      let sent = new Notification(head, { icon, body })
      sent.onclick = () => { window.focus(); sent.close() }
    }
    // delay notifications with types to prevent spam
    return type ? this.delay(ding, 5, type) : ding()
  }

  App.canNotify = function () {
    let cfg = this.config.notify
    let has = cfg.chat || cfg.song || cfg.ding
    if (!has || !("Notification" in window)) return false
    if (Notification.permission === "denied") return false
    if (Notification.permission === "default") {
      this.Log("requesting notification permissions")
      Notification.requestPermission()
      return false
    }
    return true
  }

  App.on("update", App.canNotify)

}
},{}],30:[function(require,module,exports){
// timing.js | internal loop and delays

module.exports = App => {

	App.beat = function () {
		let beat = parseInt(this.config.timing.beat) + 1
		this.config.timing.beat = beat
		this.Emit("heartbeat", beat)
	}

	App.bindTimer = function () {
		this.holding = {}
		this.heart = setInterval(App.beat.bind(this), 60 * 1000)
	}

	App.delay = function (func, delay, key) {
		if (!this.holding) this.holding = {}
		if (this.holding[key]) return

		let timeout = delay * 1000
		let cleared = () => { delete this.holding[key] }
		this.holding[key] = setTimeout(cleared.bind(this), timeout)

		if (func) func()
	}

}
},{}],31:[function(require,module,exports){
// ttlink.js | interacting with turntable

module.exports = App => {

	App.User = () => window.turntable.user
	App.View = () => window.turntable.topViewController
	App.Chat = () => window.turntable.buddyList.pmWindows
	App.Room = () => window.turntable.topViewController.roomData

	App.findName = function (id = "Unknown") {
		let User = this.View().userMap[id]
		if (User) return User.attributes.name

		let Chat = this.Chat() ? this.Chat()[id] : false
		if (Chat) return Chat.otherUser.attributes.name
		
		return id
	}

	App.findPing = function (str = "") {
		let ping = `@${ this.User().attributes.name }`
		return str.toLowerCase().indexOf(ping.toLowerCase()) > -1
	}

	App.Post = function (alert) {
		$(".chat .messages").append($post(alert))
		this.View().updateChatScroll()
	}

	App.Chat = function (text) {
		window.turntable.sendMessage({
			api: "room.speak",
			roomid: this.View().roomId,
			section: this.View().section,
			text
		})
	}

	App.Batch = function (text) {
		text = text.split(";;")
		if (text.length > 3) this.Post({
			head: "Send Error!",
			body: `Message contains ${ text.length }/3 Messages.`
		})
		else for (let msg of text) this.Chat(msg.trim())
	}

}

const $post = obj => `
  <div class="message ${ obj.type || '' }"><em>
    <span class="subject">${ obj.head || '' }</span>
    <span class="text">${ obj.body || '' }</span>
  </em></div>
`
},{}],32:[function(require,module,exports){
// utility.js | our core utilities

module.exports = App => {

  App.now = () => new Date().toLocaleTimeString("en-us")
  App.cap =  s => s[0].toUpperCase() + s.substring(1)

  App.classes = (name, on) => {
    // toggle classes on the DOM
    let has = $('body').hasClass(name)
    if (on && !has) $('body').addClass(name)
    if (has && !on) $('body').removeClass(name)
  }

  require("./ttlink.js")(App)
  require("./events.js")(App)
  require("./timing.js")(App)
  require("./logger.js")(App)
  require("./notify.js")(App)
  require("./attach.js")(App)

  App.on("attach", function () {
    this.bindLogs()
    this.bindTimer()
    this.canNotify()
  })

}
},{"./attach.js":26,"./events.js":27,"./logger.js":28,"./notify.js":29,"./timing.js":30,"./ttlink.js":31}]},{},[25]);
