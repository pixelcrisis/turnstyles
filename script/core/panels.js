// inputs.js | handle the hotbar/options panel

module.exports = app => {

  app.bindPanel = function () {
    $('#turnStyles').remove()
    $('.header-bar').append(this.buildPanel())

    // panel toggle bind
    $('.ts-menu').on('click', () => $('#turnStyles').toggleClass('active'))

    // bind tab switcher
    $('.ts-tab').on('click', (e) => {
      $('#turnStyles .active').removeClass('active')
      $(`*[data-tab="${e.target.dataset.tab}"]`).addClass('active')
    })

    // bind config changes
    $('.ts-button').on('click',  this.saveConfig.bind(this))
    $('.ts-switch').on('change', this.saveConfig.bind(this))
  }

  // core HTML structures
  app.buildPanel = function () { 
    return `<div id="turnStyles">
              ${ this.buildHotBar() }
              ${ this.buildFullView() }
            </div>`
  }

  app.buildHotBar = function () {
    return `<div id="hotBar">
              <h1 class="ts-menu ts-open"></h1>
              ${ this.addToggle('is_afk',  'AFK') }
              ${ this.addToggle('autobop', 'Autobop') }
              ${ this.addToggle('nextdj',  'Next DJ') }
              ${ this.addToggle('auto_q',  'AutoQueue') }
            </div>`
  }

  app.buildFullView = function() {
    return `<div id="fullView">
              <div class="ts-row">
                <h1 class="ts-menu ts-close">✖</h1>
                ${ this.addTab('General', true) }
                ${ this.addTab('Visual') }
                ${ this.addTab('CSS') }
                ${ this.addTab('Alerts') }
                ${ this.addTab('About') }
              </div>

              ${ this.buildGeneral() }
              ${ this.buildVisual() }
              ${ this.buildCSS() }
              ${ this.buildAlerts() }
              ${ this.buildAbout() }
            </div>`
  }

  app.buildGeneral = function () {
    return `<div data-tab="General" class="ts-row active">
              ${ this.addToggle('autobop', 'Autobop') }
              ${ this.addToggle('nextdj',  'Next DJ Spot') }
              ${ this.addToggle('has_vol', 'Control Volume') }
              
              <div class="break"></div>
              ${ this.addToggle('auto_q', 'Enable AutoQueue') }
              ${ this.addString('q_ping') }
              ${ this.addButton('q_ping', 'Save Queue Ping') }
              <p>Paste your bot's queue message above to hop on deck automatically when you're called up.</p>

              <div class="break"></div>
              ${ this.addToggle('is_afk', 'Go AFK') } 
              ${ this.addString('afk_ping') }
              ${ this.addButton('afk_ping', 'Save AFK Response') }
              <p>Sends the response when you go AFK, and if you get pinged while gone.</p>
            </div>`
  }

  app.buildVisual = function () {
    return `<div data-tab="Visual" class="ts-row">
              ${ this.addChoice('theme') }
              ${ this.addChoice('style') }
              <p>Turntable Theme & Style</p>
              
              <div class="break"></div>
              ${ this.addToggle('no_bub', 'Hide Chat Bubbles') }
              ${ this.addToggle('no_aud', 'Hide Audience') }
              ${ this.addToggle('no_vid', 'Hide Player') }
              <p>Hide Various Elements Around Turntable</p>

              <div class="break"></div>
              ${ this.addToggle('played', 'Highlight Recently Played Songs') }
              <p>Add A Red Glow To Songs Played Recently In Room</p>
            </div>`
  }

  app.buildCSS = function () {
    return `<div data-tab="CSS" class="ts-row">
              <textarea id="ts_user_css" class="ts-inputs" rows="10">
                ${ this.config.user_css }
              </textarea>
              <p>Add your own custom CSS snippets to turntable!</p>
              <div class="break"></div>
              ${ this.addButton('user_css', 'Save And Apply Styles') }
            </div>`
  }

  app.buildAlerts = function () {
    return `<div data-tab="Alerts" class="ts-row">
              ${ this.addToggle('chat_song', 'Last Song Stats') }
              ${ this.addToggle('chat_spun', 'Dropped DJ Stats') }
              ${ this.addToggle('chat_snag', 'User Snags') }
              ${ this.addToggle('chat_join', 'User Joins') }
              ${ this.addToggle('chat_left', 'User Leaves') }
              <p>Info Posted In Chat (Just For You To See)</p>
              
              <div class="break"></div>
              ${ this.addToggle('ping_pm', 'On DMs') }
              ${ this.addToggle('ping_chat', 'On Mentions') }
              ${ this.addToggle('ping_song', 'On New Songs') }
              <p>Send Desktop Notifications</p>

              <div class="break"></div>
              ${ this.addString('hot_words') }
              ${ this.addButton('hot_words', 'Save Hot Words') }
              <p>Notifies / highlights word match in chat. Use multiple words in a comma separated list.</p>
            </div>`
  }

  app.buildAbout = function () {
    return `<div data-tab="About" class="ts-row">
              
            ${ this.addToggle('logging',     'Show Logs In Room Tab') } 
            ${ this.runScript('reloadMusic', 'Fix Glitched Players') }
            ${ this.runScript('reload',      'Reload turnStyles') }

            <div class="break"></div>
            <a href="https://chrome.google.com/webstore/detail/turntable-tweaks/pmlkackfnbbnjfejpddpakallilkbdme" target="_blank">Chrome Store</a>
            <a href="https://addons.mozilla.org/en-US/firefox/addon/turnstyles-for-turntable-fm/" target="_blank">Firefox Addon</a>
            <a href="https://ts.pixelcrisis.co" target="_blank">Bookmarklet</a>
            <p>turnStyles v${this.config.version}</p>

            <div class="break"></div>
            <a href="https://discord.gg/wqmAVvgSbE" target="_blank">turnStyles Discord</a>
            <a href="https://discord.gg/jnRs4WnPjM" target="_blank">Turntable.fm Discord</a>
            <p>Support On Discord</p>

            <div class="break"></div>
            <a href="https://github.com/pixelcrisis/turnstyles" target="_blank">turnStyles</a>
            <a href=""https://github.com/fluteds/ttscripts target="_blank">ttscripts (themes + more)</a>
            <p>On Github</p>

            <div class="break"></div>
            <a href="https://patreon.com/pixelcrisis">❤ Patreon</a>
            -&nbsp;<strong>Turntable: <em>@crisis</em></strong>&nbsp;-&nbsp;
            <strong>Discord: <em>@crisis</em></strong>
            <p>The Developer</p>
            </div>`
  }

  // partial HTML structures
  app.addTab = function (name, active) {
    return `<span data-tab="${name}"
              class="ts-tab ${active ? 'active' : ''}">
              ${name}
            </span>`

  }

  // checked if option true
  app.checked = function (item) {
    return this.config[item] ? 'checked' : ''
  }

  app.addToggle = function (item, name) {
    return `<label class="ts-toggle">
              <input 
                type="checkbox"
                class="ts-switch"
                data-for="${item}"
                ${ this.checked(item) }>
              <span class="ts-state"></span>
              ${name}
            </label>`
  }

  app.addString = function (item) {
    return `<input 
              type="text"
              id="ts_${item}"
              class="ts-inputs"
              value="${ this.config[item] }">
            </input>`
  }

  app.addButton = function (item, name) {
    return `<button 
              class="ts-button"
              data-for="ts_${item}">
              ${name}
            </button>`
  }

  app.selected = function (list, key) {
    return this.config[list] == key ? 'selected' : ''
  }

  app.addChoice = function (list, none) {
    const upper = str => str[0].toUpperCase() + str.substring(1)
    const empty = arr => `<option value="">No ${ upper(arr) }</option>`

    return `<select class="ts-choice ts-switch" data-for="${list}">
              ${ empty(list) }
              ${ Object.keys(this.options[list]).map(key => `
                  <option value="${key}" ${ this.selected(list, key)}>
                    ${ this.options[list][key] }
                  </option>
                `).join('') }
            </select>
            `
  }

  app.runScript = function (func, name) {
    return `
      <button class="ts-button" onclick="$tS.${func}()">${name}</button>
    `
  }

  app.on('attach', app.bindPanel)

}