// window.js | attach the options window

module.exports = tS => {

  tS.buildWindow = function () {
    $('.header-bar').append(layout(this))

    // hotbar/window toggler
    $('.ts_menu').on('click', () => {
      let panes = '#ts_hotbar, #ts_window'
      $(panes).toggleClass('active')
    })

    // tab switcher
    $('#ts_tabs div').on('click', e => {
      $('#ts_tabs div, .ts_tab').removeClass('active')
      $(`.${e.currentTarget.className}`).addClass('active')
    })

    // save config on option change
    $('.ts_option').on('change', tS.saveConfig.bind(this))
  }

  tS.on('attach', tS.buildWindow)

}

const layout = self => `
  <div id="ts_hotbar">
    <h3 class="ts_menu">☰ tS</h3>
    ${ hotBar(self) }
  </div>
  <div id="ts_window">
    <h3 class="ts_menu">✕ tS</h3>
    ${ tabList }
    ${ mainTab(self) }
    ${ visualTab(self) }
    ${ chatTab(self) }
    ${ notifyTab(self) }
    ${ footer(self) }
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
  <select id="ts_${list}" class="ts_option">
    <option value="">No ${list[0].toUpperCase() + list.substring(1)}</option>
    ${ Object.keys(self.options[list]).map(key => `
      <option value="${key}" ${self.config[list] == key ? 'selected' : ''}>
        ${self.options[list][key]}
      </option>
    `).join('') }
  </select>
`

const hotBar = self => `
  ${ toggle(self, 'autobop', 'Autobop') }
  ${ toggle(self, 'nextdj', 'Next DJ Spot') }
  ${ toggle(self, 'pingdj', 'Wait For Ping') }
`

const tabList = `
  <div id="ts_tabs">
    <div class="tab_main active">Options</div>
    <div class="tab_ui">Visual</div>
    <div class="tab_chat">In Chat</div>
    <div class="tab_ding">Notify</div>
  </div>
`

const mainTab = self => `
  <div class="ts_tab tab_main active">
    <h4>General Features</h4> 
    ${ toggle(self, 'autobop', 'Autobop') }
    ${ toggle(self, 'has_vol', 'Control Volume') }
    <br>
    ${ toggle(self, 'nextdj', 'Next DJ Spot') }
    ${ toggle(self, 'pingdj', 'Wait For Ping') }
  </div>
`

const visualTab = self => `
  <div class="ts_tab tab_ui">
    <h4>Visual Options</h4>
    ${ select(self, 'theme') }
    ${ select(self, 'style') }
    <br>
    ${ toggle(self, 'no_aud', 'Hide Audience') }
    ${ toggle(self, 'no_vid', 'Hide Player') }
    <br>
    ${ toggle(self, 'no_bub', 'Hide Chat Bubbles') }
  </div>
`

const chatTab = self => `
  <div class="ts_tab tab_chat">
    <h4>Post Messages In Chat</h4>
    ${ toggle(self, 'chat_song', 'Last Song Stats') }
    ${ toggle(self, 'chat_spun', 'Dropped DJ Stats') }
    <br>
    ${ toggle(self, 'chat_snag', 'User Snags') }
    ${ toggle(self, 'chat_join', 'User Joins') }
    ${ toggle(self, 'chat_left', 'User Leaves') }
  </div>
`

const notifyTab = self => `
  <div class="ts_tab tab_ding">
    <h4>Send Desktop Notifications</h4>
    ${ toggle(self, 'ping_pm', 'On DMs') }
    ${ toggle(self, 'ping_chat', 'On Mentions') }
    ${ toggle(self, 'ping_song', 'On New Songs') }
  </div>
`

const footer = self => `
  <div class="ts_credits">
    <small class="ts_menu">✔︎ CLOSE</small>
    <small>v${self.config.version}</small>
    <small>
      <a href="https://discord.gg/jnRs4WnPjM" target="_blank">
        Join me on the TT Discord
      </a>
    </small>
  </div>
`