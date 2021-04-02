// layout.js | attach the options panel

module.exports = tS => {

  const open = '.ts_menu'
  const tabs = '.ts_tab'
  const menu = '#ts_tabs div'
  const pane = '#ts_hotbar, #ts_window'
  const opts = '#ts_hotbar input, #ts_window input, #ts_window select'
  const vers = require('../package.json').version

  tS.prototype.buildPanel = function () {
    $('.header-bar').append(layout(this))

    $(menu).on('click', onTab)
    $(open).on('click', () => $(pane).toggleClass('active'))
    $(opts).on('change', this.saveConfig.bind(this))
  }

  const onTab = e => {
    $(`${menu}, ${tabs}`).removeClass('active')
    $(`.${e.currentTarget.className}`).addClass('active')
  }

  const layout = self => `
    <div id="ts_hotbar">
      <h3 class="ts_menu">☰ tS</h3>
      ${toggle(self, 'autobop', 'Autobop')}
      ${splitToggle(self, ['nextdj','pingdj'], ['Next DJ Spot','On Ping'])}
    </div>
    <div id="ts_window">
      <h3 class="ts_menu">☰ turnStyles</h3>
      <div id="ts_tabs">
        <div class="tab_opts active">Options</div>
        <div class="tab_ui">Visual</div>
        <div class="tab_chat">In Chat</div>
        <div class="tab_ding">Notify</div>
      </div>
      <div class="ts_tab tab_opts active">
        <h4>General Features</h4> 
        ${toggle(self, 'autobop', 'Autobop')}
        ${toggle(self, 'has_vol', 'Control Volume')}
        <br>
        ${splitToggle(self, ['nextdj', 'pingdj'], ['Next DJ Spot', 'Wait For Ping'])}
      </div>
      <div class="ts_tab tab_ui">
        <h4>Visual Options</h4>
        ${select(self, 'theme')}
        ${select(self, 'style')}
        <br>
        ${toggle(self, 'no_aud', 'Hide Audience')}
        ${toggle(self, 'no_vid', 'Hide Player')}
      </div>
      <div class="ts_tab tab_chat">
        <h4>Post Messages In Chat</h4>
        ${toggle(self, 'chat_song', 'Last Song Stats')}
        ${toggle(self, 'chat_spun', 'Dropped DJ Stats')}
        <br>
        ${toggle(self, 'chat_snag', 'User Snags')}
        ${toggle(self, 'chat_join', 'User Joins')}
        ${toggle(self, 'chat_left', 'User Leaves')}
      </div>
      <div class="ts_tab tab_ding">
        <h4>Send Desktop Notifications</h4>
        ${toggle(self, 'ping_pm', 'On DMs')}
        ${toggle(self, 'ping_chat', 'On Mentions')}
        ${toggle(self, 'ping_song', 'On New Songs')}
      </div>
      <div class="ts_credits">
        <small class="ts_menu">✔︎ CLOSE</small>
        <small>v${vers}</small>
        <small>
          <a href="https://discord.gg/jnRs4WnPjM" target="_blank">
            Join me on the TT Discord
          </a>
        </small>
      </div>
    </div>
  `

  const toggle = (self, item, name) => `
    <label class="ts_toggle">
      <input id="ts_${item}" type="checkbox"
        ${ self.config[item] ? 'checked' : '' }>
      </input>
      ${name}
    </label>
  `

  const splitToggle = (self, items, names) => {
    let html = `<label class="ts_toggle">`
    for (var i = 0; i < items.length; i++) html += `
      <input id="ts_${items[i]}" type="checkbox"
        ${ self.config[items[0]] ? 'checked' : ''}>
      </input>
      ${names[i]}
      ${ i < items.length - 1 ? '<span>|</span>' : ''}
    `
    html += `</label>`
    return html
  }

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

}