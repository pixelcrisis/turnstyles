// layout.js | attach the options panel

module.exports = tS => {

  let version = require('../package.json').version

  tS.prototype.buildPanel = function () {
    $('.header-bar').append(layout(this))

    let toggled = $('#ts_panel, #ts_window')
    let changed = $('#ts_panel input, #ts_window input, #ts_window select')
    $('.ts_toggle').on('click', () => toggled.toggleClass('active'))
    changed.on('change', this.saveConfig.bind(this))
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
      <div>
        <h5>Options</h5>
        <label> ${toggle(self, 'autobop')} Autobop </label>
        <label> ${toggle(self, 'has_vol')} Control Volume </label>
        <label> ${toggle(self, 'nextdj')} Next DJ Spot </label>
        <label> ${toggle(self, 'pingdj')} Next DJ On Ping </label>
      </div>
      <div>
        <h5>Post To Chat</h5>
        <label>${toggle(self, 'chat_stat')} Song Stats</label>
        <label>${toggle(self, 'chat_snag')} User Snags</label>
        <label>${toggle(self, 'chat_join')} User Joins</label>
        <label>${toggle(self, 'chat_gone')} User Leaves</label>
      </div>
      <div>
        <h5>Desktop Notifications</h5>
        <label>${toggle(self, 'ping_pm')} On DMs</label>
        <label>${toggle(self, 'ping_chat')} On Mentions</label>
        <label>${toggle(self, 'ping_song')} On New Songs</label>
      </div>
      <div class="ts_credits">
        <button class="ts_toggle">✔︎ Close</button>
        <small>v${version}</small>
        <small>
          <a href="https://discord.gg/jnRs4WnPjM" target="_blank">Join me on the TT Discord</a>
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