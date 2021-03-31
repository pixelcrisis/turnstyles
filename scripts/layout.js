// layout.js | attach the options panel

module.exports = tS => {

  const menu = '.ts_toggle'
  const pane = '#ts_panel, #ts_window'
  const tabs = '.opts_tab, .chat_tab, .ding_tab'
  const opts = '#ts_panel input, #ts_window input, #ts_window select'
  const vers = require('../package.json').version

  tS.prototype.buildPanel = function () {
    $('.header-bar').append(layout(this))

    $(tabs).on('click', onTab)
    $(menu).on('click', () => $(pane).toggleClass('active'))
    $(opts).on('change', this.saveConfig.bind(this))
  }

  const onTab = e => {
    $(tabs).removeClass('active')
    $(`.${e.currentTarget.className}`).addClass('active')
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
      <div id="ts_tabs">
        <div class="opts_tab active">Options</div>
        <div class="chat_tab">In Chat</div>
        <div class="ding_tab">Notifications</div>
      </div>
      <div class="opts_tab active">
        <label> ${toggle(self, 'autobop')} Autobop </label>
        <label> ${toggle(self, 'has_vol')} Control Volume </label>
        <br>
        <label> ${toggle(self, 'nextdj')} Next DJ Spot </label>
        <label> ${toggle(self, 'pingdj')} Next DJ On Ping (Queues)</label>
      </div>
      <div class="chat_tab">
        <label>${toggle(self, 'chat_stat')} Song Stats</label>
        <label>${toggle(self, 'chat_snag')} User Snags</label>
        <label>${toggle(self, 'chat_join')} User Joins</label>
        <label>${toggle(self, 'chat_left')} User Leaves</label>
      </div>
      <div class="ding_tab">
        <label>${toggle(self, 'ping_pm')} On DMs</label>
        <label>${toggle(self, 'ping_chat')} On Mentions</label>
        <label>${toggle(self, 'ping_song')} On New Songs</label>
      </div>
      <div class="ts_credits">
        <button class="ts_toggle">✔︎ Close</button>
        <small>v${vers}</small>
        <small>
          <a href="https://discord.gg/jnRs4WnPjM" target="_blank">
            Join me on the TT Discord
          </a>
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