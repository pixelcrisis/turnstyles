// hotbar.js | handle the hotbar/options panel

module.exports = tS => {

  tS.on('attach', function buildHotBar () {
    // add hot bar to header
    $('#ts_hotbar').remove()
    $('.header-bar').append(hotbar(this))
    // bind out options panel toggler
    $('#ts_hotbar h1').on('click', this.togglePanel.bind(this))
    // save config on option change
    $('#ts_hotbar .ts_optbtn').on('click', this.saveConfig.bind(this))
    $('#ts_hotbar .ts_option').on('change', this.saveConfig.bind(this))
  })

  tS.togglePanel = function injectOptionsPanel () {
    // remove the panel if it exists
    let curr = $('#ts_panel')
    if (curr.length) return curr.remove()
    
    // otherwise inject it into current tab
    let one = $('.right-panel.tabs-3').length
    let tab = one ? '.right-panel' : '.left-panel'
    $(`${tab} .selected .tab-pane`).append(panel(window.$tS))

    // bind psuedo accordion
    $('.ts_section > h4').on('click', e => {
      $('.ts_section.active').removeClass('active')
      $(e.currentTarget).parent().addClass('active')
    })

    // bind close button
    $('.ts_close').on('click', () => $('#ts_panel').remove()) 
    // save config on option change
    $('#ts_panel .ts_optbtn').on('click', this.saveConfig.bind(this))
    $('#ts_panel .ts_option').on('change', this.saveConfig.bind(this))
  }

}

const hotbar = self => `
  <div id="ts_hotbar">
    <div class="ts_wrap">
      <h1>≡ tS</h1>
      ${ toggle(self, 'is_afk', 'AFK') }
      ${ toggle(self, 'autobop', 'Autobop') }
      ${ toggle(self, 'nextdj', 'Next DJ') }
      ${ toggle(self, 'auto_q', 'AutoQueue') }
    </div>
  </div>
`

const panel = self => `
  <div id="ts_panel">
    <h1>
      turnStyles
      <small>v${self.config.version}</small>
      <span class="ts_close">✖</span>
    </h1>

    <div class="active ts_section">
      <h4>General</h4>
      <div class="ts_content">
        ${ toggle(self, 'autobop', 'Autobop') }
        ${ toggle(self, 'has_vol', 'Control Volume') }
        ${ toggle(self, 'nextdj',  'Next DJ Spot') }
      </div>
    </div>

    <div class="ts_section">
      <h4>UI Options</h4>
      <div class="ts_content">
        ${ select(self, 'theme') }
        ${ select(self, 'style') }
        ${ toggle(self, 'no_bub', 'Hide Chat Bubbles') }
        ${ toggle(self, 'no_aud', 'Hide Audience') }
        ${ toggle(self, 'no_vid', 'Hide Player') }
      </div>
    </div>

    <div class="ts_section">
      <h4>Auto-Queue</h4>
      <div class="ts_content">
        ${ toggle(self, 'auto_q', 'Enable') }
        <p>Paste your bot's queue message below to take the decks automatically when you're called.</p>
        ${ inputs(self, 'q_ping') }
        ${ button('q_ping', 'Save Queue Ping') }
      </div>
    </div>

    <div class="ts_section">
      <h4>AFK Reminder</h4>
      <div class="ts_content">
        ${ toggle(self, 'is_afk', 'Go AFK') } 
        <p>Sends the response when you go AFK, and if you get pinged while gone.</p>
        ${ inputs(self, 'afk_ping') }
        ${ button('afk_ping', 'Save AFK Response') }
      </div>
    </div>

    <div class="ts_section">
      <h4>Bulletins</h4>
      <div class="ts_content">
        ${ select(self, 'remind', true) } 
        <p>Send an automated message at a set interval in your room - message prefixed with [tS]</p>
        ${ inputs(self, 'reminder') }
        ${ button('reminder', 'Save Bulletin') }
      </div>
    </div>

    <div class="ts_section">
      <h4>Data In Chat</h4>
      <div class="ts_content">
        ${ toggle(self, 'chat_song', 'Last Song Stats') }
        ${ toggle(self, 'chat_spun', 'Dropped DJ Stats') }
        ${ toggle(self, 'chat_snag', 'User Snags') }
        ${ toggle(self, 'chat_join', 'User Joins') }
        ${ toggle(self, 'chat_left', 'User Leaves') }
      </div>
    </div>

    <div class="ts_section">
      <h4>Notifications</h4>
      <div class="ts_content">
        ${ toggle(self, 'ping_pm', 'On DMs') }
        ${ toggle(self, 'ping_chat', 'On Mentions') }
        ${ toggle(self, 'ping_song', 'On New Songs') }
      </div>
    </div>

    <div class="ts_section">
      <h4>Hot words</h4>
      <div class="ts_content">
        <p>Sends a notification and highlights message on word match in chat. Use multiple words in a comma separated list.</p>
        ${ inputs(self, 'hot_words') }
        ${ button('hot_words', 'Save Hot Words') }
      </div>
    </div>

    <div class="ts_section">
      <h4>Custom CSS</h4>
      <div class="ts_content">
        <textarea id="ts_user_css" rows="10">${ self.config.user_css }</textarea>
        ${ button('user_css', 'Save And Apply Styles') }
      </div>
    </div>

    <div class="ts_section">
      <h4>About / Extras</h4>
      <div class="ts_content">
        <a class="ts_link" href="https://chrome.google.com/webstore/detail/turntable-tweaks/pmlkackfnbbnjfejpddpakallilkbdme" target="_blank">Chrome Store</a>
        <a class="ts_link" href="https://addons.mozilla.org/en-US/firefox/addon/turnstyles-for-turntable-fm/" target="_blank">Firefox Addon</a>
        <a class="ts_link" href="https://ts.pixelcrisis.co" target="_blank">Bookmarklets</a>

        <br>
        <a class="ts_link" href="https://discord.gg/ZprHwNUw8y" target="_blank">turnStyles Discord</a>
        <a class="ts_link" href="https://discord.gg/jnRs4WnPjM" target="_blank">Turntable.fm Discord</a>
        <br><strong>ON TURNTABLE: <em>@crisis</em></strong>

        <br>
        <a class="ts_link" href="https://github.com/pixelcrisis/turnstyles" target="_blank">turnStyles github</a>
        <a class="ts_link" href=""https://github.com/fluteds/ttscripts target="_blank">ttscripts (themes + more)</a>
      </div>
    </div>

    <div class="ts_section">
      <h4>Debugging</h4>
      <div class="ts_content">
        ${ toggle(self, 'logging', 'Show Logs In Room Tab') } 
        ${ doFunc('reloadMusic', 'Fix Glitched Players') }
        ${ doFunc('reload', 'Reload turnStyles') }
      </div>
    </div>
  </div>
`

const toggle = (self, item, name) => `
  <label>
    <input data-for="${item}" class="ts_option" type="checkbox"
      ${ self.config[item] ? 'checked' : '' }>
    </input>
    <span></span> ${name}
  </label>
`

const upper = str => str[0].toUpperCase() + str.substring(1)
const empty = arr => `<option value="">No ${ upper(arr) }</option>`
const select = (self, list, none) => `
  <select data-for="${list}" class="ts_option">
    ${ none ? '' : empty(list) }
    ${ Object.keys(self.options[list]).map(key => `
      <option value="${key}" ${self.config[list] == key ? 'selected' : ''}>
        ${self.options[list][key]}
      </option>
    `).join('') }
  </select>
`

const inputs = (self, item) => `
  <input type="text" 
    id="ts_${item}" value="${ self.config[item] }">
  </input>
`

const button = (opt, name) => `
  <button class="ts_optbtn" data-for="ts_${opt}">${name}</button>
`

const doFunc = (func, name) => `
  <button onclick="$tS.${func}()">${name}</button>
`