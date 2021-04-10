// window.js | attach the options window

module.exports = tS => {

  tS.buildWindow = function () {
    $('.header-bar').append(layout(this))

    // full menu toggler
    $('#ts_menu, #ts_close').on('click', () => {
      $('#turnStyles').toggleClass('active')
    })

    // tab switcher
    $('#ts_tabs div').on('click', e => {
      $('#ts_tabs div, .ts_tab').removeClass('active')
      $(`.${e.currentTarget.className}`).addClass('active')
    })

    // save config on option change
    $('#ts_apply').on('click', tS.saveConfig.bind(this))
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

      ${ footer(self) }
    </div>
  </div>
`

const header = `
  <h3 id="ts_menu">tS</h3>

  <div id="ts_tabs">
    <div class="tab_opts active">Options</div>
    <div class="tab_room">Room</div>
    <div class="tab_ding">Notify</div>
    <div class="tab_css">Custom Css</div>
  </div>
`

const quick = self => `
  <div id="ts_quick">
    ${ toggle(self, 'autobop', 'Autobop') }
    ${ toggle(self, 'nextdj', 'Next DJ Spot') }
    ${ toggle(self, 'pingdj', 'Wait For Ping') }
  </div>
`

const optsTab = self => `
  <div class="ts_tab tab_opts active">
    <div>
      <h4>General Features</h4>
      ${ toggle(self, 'autobop', 'Autobop') }
      ${ toggle(self, 'has_vol', 'Control Volume') }
      <br>
      ${ toggle(self, 'nextdj', 'Next DJ Spot') }
      ${ toggle(self, 'pingdj', 'Wait For Ping') }
    </div>
    <div>
      <h4>Hide Elements</h4>
      ${ toggle(self, 'no_aud', 'Hide Audience') }
      ${ toggle(self, 'no_vid', 'Hide Player') }
      <br>
      ${ toggle(self, 'no_bub', 'Hide Chat Bubbles') }
    </div>
    <div>
      <h4>Visual Options</h4>
      ${ select(self, 'theme') }
      ${ select(self, 'style') }
    </div>
  </div>
`

const roomTab = self => `
  <div class="ts_tab tab_room">
    <h4>Room / Moderator Features</h4>
    ${ button('reload', 'Reload turnStyles') }
  </div>
`

const dingTab = self => `
  <div class="ts_tab tab_ding">
    <div>
      <h4>Messages In Chat</h4>
      ${ toggle(self, 'chat_song', 'Last Song Stats') }
      ${ toggle(self, 'chat_spun', 'Dropped DJ Stats') }
      <br>
      ${ toggle(self, 'chat_snag', 'User Snags') }
      ${ toggle(self, 'chat_join', 'User Joins') }
      ${ toggle(self, 'chat_left', 'User Leaves') }
    </div>
    <div>
      <h4>Desktop Notifications</h4>
      ${ toggle(self, 'ping_pm', 'On DMs') }
      ${ toggle(self, 'ping_chat', 'On Mentions') }
      ${ toggle(self, 'ping_song', 'On New Songs') }
    </div>
  </div>
`

const cssTab = self => `
  <div class="ts_tab tab_css">
    <h4>Custom CSS</h4>
    <textarea id="ts_user_css" class="ts_inputs" cols="60" rows="10">${ self.config.user_css || "" }</textarea>
    <h4 id="ts_apply">Save And Apply Styles</h4>
  </div>
`

const toggle = (self, item, name) => `
  <label class="ts_toggle">
    <input id="ts_${item}" class="ts_option" type="checkbox"
      ${ self.config[item] ? 'checked' : '' }>
    </input>
    ${name}
  </label>
`

const select = (self, list) => `
  <select id="ts_${list}" class="ts_option ts_inputs">
    <option value="">No ${list[0].toUpperCase() + list.substring(1)}</option>
    ${ Object.keys(self.options[list]).map(key => `
      <option value="${key}" ${self.config[list] == key ? 'selected' : ''}>
        ${self.options[list][key]}
      </option>
    `).join('') }
  </select>
`

const button = (func, name) => `
  <button class="ts_inputs" onclick="$tS.${func}()">${name}</button>
`

const footer = self => `
  <div class="ts_credits">
    <small id="ts_close">✔︎ CLOSE</small>
    <small>v${self.config.version}</small>
    <small>
      <a href="https://discord.gg/jnRs4WnPjM" target="_blank">
        Join me on the TT Discord
      </a>
    </small>
  </div>
`