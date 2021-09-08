// inputs.js | handle the hotbar/options panel

module.exports = app => {

  app.addPanel = function () {
    $('#tsPanel').remove()
    $('.header-bar').append(this.Panel())
    // bind the panel toggle
    $('#tsPanel .ts_menu').on('click', () => $('#tsPanel').toggleClass('active'))
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
    return `
      <div id="tsPanel">
        <div id="tsBar">
          <h1 class="ts_menu"></h1>
          ${ this._toggle('is_afk',  'AFK') }
          ${ this._toggle('autobop', 'Autobop') }
          ${ this._toggle('nextdj',  'Next DJ') }
          ${ this._toggle('auto_q',  'AutoQueue') }
        </div>
        <div id="tsFull">
          <div class="ts-row">
            <h1 class="ts_menu">✖</h1>
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
            <textarea id="ts_user_css" class="ts-flat ts-user" rows="10">
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
      <label class="ts-flat">
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
      <select class="ts-flat" data-for="${list}" class="ts-switch">
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
      <input type="text" class="ts-flat ts-user"
        id="ts_${item}" value="${ this.config[item] }">
      </input> 
    `
  }

  app._button = function (opt, name) {
    return `
      <button class="ts-flat ts-button ts-user" data-for="ts_${opt}">${name}</button>
    `
  }

  app._doFunc = function (func, name) {
    return `
      <button class="ts-flat ts-user" onclick="$tS.${func}()">${name}</button>
    `
  }

  app.on('attach', app.addPanel)

}