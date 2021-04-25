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
      <h4>Ding On Match</h4>
      <input type="text" id="ts_ping_word" class="ts_inputs"
        value="${ self.config.ping_word }" />
      ${ button('ping_word', 'Save Matched Words') }
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