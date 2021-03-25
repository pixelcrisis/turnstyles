// layout.js | attach the options panel

module.exports = tS => {

  tS.prototype.buildPanel = function () {
    $('body').append(htmlLayout(this))
    $('#layout-option').before(htmlButton())

    // bind our events
    let toggle = $('#ts_open')
    let cancel = $('#ts_close')
    let expand = $('.ts_more h3')
    let inputs = $('#ts_pane input, #ts_pane select')

    toggle.on('click', () => $('#ts_pane').toggleClass('active'))
    cancel.on('click', () => $('#ts_pane, .ts_more').removeClass('active'))
    expand.on('click', e => $(e.target).parent().toggleClass('active'))
    inputs.on('change', this.saveConfig.bind(this))
  }

  const htmlLayout = self => `
    <div id="ts_pane">
      <h2>turnStyles options</h2>

      <div class="half">
        <label>Theme</label> ${htmlSelect(self, 'theme')}
      </div>
      <div class="half">
        <label>Style</label> ${htmlSelect(self, 'style')}
      </div>
      <div class="half">
        <label>${htmlToggle(self, 'autobop')} Autobop</label>
        <label>${htmlToggle(self, 'has_vol')} Control Volume</label>
      </div>
      <div class="half">
        <label>${htmlToggle(self, 'nextdj')} Next DJ Spot</label>
        <label>${htmlToggle(self, 'pingdj')} Wait For Ping</label>
      </div>
      <div class="ts_more">
        <h3>Notifications</h3>
        <div class="half">
          <h3>In Chat</h3>
          <label>${htmlToggle(self, 'chat_stat')} Song Stats</label>
          <label>${htmlToggle(self, 'chat_snag')} User Snags</label>
          <label>${htmlToggle(self, 'chat_join')} User Joins</label>
          <label>${htmlToggle(self, 'chat_gone')} User Leaves</label>
        </div>
        <div class="half">
          <h3>Desktop</h3>
          <label>${htmlToggle(self, 'ping_pm')} On DMs</label>
          <label>${htmlToggle(self, 'ping_chat')} On Mentions</label>
          <label>${htmlToggle(self, 'ping_song')} On New Songs</label>
        </div>
      </div>

      <button id="ts_close">Close</button>
    </div>
  `

  const htmlButton = () => `
    <li class="ts link option">
      <a id="ts_open" href="#">turnStyles</a>
    </li>
  `

  const htmlSelect = (self, list) => `
    <select id="ts_${list}">
      <option value="">None</option>
      ${ Object.keys(self.options[list]).map(key => `
        <option value="${key}" ${self.config[list] == key ? 'selected' : ''}>
          ${self.options[list][key]}
        </option>
      `).join('') }
    </select>
  `

  const htmlToggle = (self, item) => `
    <input id="ts_${item}" type="checkbox"
      ${ self.config[item] ? 'checked' : '' }>
    </input>
  `

}