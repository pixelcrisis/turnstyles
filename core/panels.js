// panels.js | handle the hotbar/options panel

module.exports = app => {

  app.bindPanels = function () {
    $('#tsPanels').remove()
    $('.header-bar').append(panels())

    // panel toggle bind
    $('#tsMenu').on('click', () => $('#tsPanels').toggleClass('active'))

    // bind tab switcher
    $('.ts-tab').on('click', (e) => {
      $('#tsPanels .active').removeClass('active')
      $(`*[data-tab="${e.target.dataset.tab}"]`).addClass('active')
    })

    // bind config changes
    $('.ts-button').on('click',  this.saveConfig.bind(this))
    $('.ts_switch').on('change', this.saveConfig.bind(this))
  }

  const panels = () => `
    <div id="tsPanels">
      <div id="tsHotBar">
        <h1 id="tsMenu"></h1>
        ${ app.$_toggle('is_afk', 'AFK') }
        ${ app.$_toggle('autobop', 'AutoBop') }
        ${ app.$_toggle('auto_q', 'AutoQueue') }
        ${ app.$_toggle('nextdj', 'Next DJ') }

        ${ app.$_tab('General', true) }
        ${ app.$_tab('Visual') }
        ${ app.$_tab('CSS') }
        ${ app.$_tab('Alerts') }
        ${ app.$_tab('About') }
      </div>
      <div id="tsOptions">
        ${ general() }
        ${ visual() }
        ${ alerts() }
        ${ about() }
      </div>
    </div>
  `
  const general = () => `
    <div data-tab="General" class="ts-tabbed active">
      <div class="ts-col">
        ${ app.$_toggle('autobop', 'Autobop') }
        ${ app.$_toggle('nextdj', 'Next DJ Spot') }
        ${ app.$_toggle('has_vol', 'Control Volume') }
      </div>
      <div class="ts-col">
        ${ app.$_toggle('auto_q', 'Enable AutoQueue') }
        ${ app.$_string('q_ping', 'Save Queue Ping') }
        <p>Paste your bot's queue message above to hop on deck when called up.</p>
      </div>
      <div class="ts-col">
        ${ app.$_toggle('is_afk', 'Go AFK') }
        ${ app.$_string('afk_ping', 'Save AFK Response') }
        <p>Sends your response when you mark as AFK, and if pinged while gone.</p>
      </div>
    </div>
  `
  const visual = () => `
    <div data-tab="Visual" class="ts-tabbed">
      <div class="ts-col">
        ${ app.$_select('theme') }
        ${ app.$_select('style') }
        ${ app.$_toggle('played', 'Show Recently Played') }
        <p>Add A Red Glow To Songs Played Recently In The Room</p>
      </div>
      <div class="ts-col">
        ${ app.$_toggle('no_bub', 'Hide Chat Bubbles') }
        ${ app.$_toggle('no_vid', 'Hide Video Player') }
        ${ app.$_toggle('no_aud', 'Hide Room Audience') }
        ${ app.$_toggle('stamps', 'Add Timestamps To Chat') }
        <p>Toggle Visual Elements</p>
      </div>
    </div>
    <div data-tab="CSS" class="ts-tabbed">
      <div class="ts-col full">
        ${ app.$_field('user_css', 'Save & Apply Styles!', '10') }
        <p>Add your own custom CSS snippets to turntable!</p>
      </div>
    </div>
  `
  const alerts = () => `
    <div data-tab="Alerts" class="ts-tabbed">
      <div class="ts-col">
        ${ app.$_toggle('chat_song', 'Last Song Stats') }
        ${ app.$_toggle('chat_spun', 'Dropped DJ Stats') }
        ${ app.$_toggle('chat_snag', 'User Snags') }
        ${ app.$_toggle('chat_join', 'User Joins') }
        ${ app.$_toggle('chat_left', 'User Leaves') }
        <p>Added To Chat (Just For You)</p>
      </div>
      <div class="ts-col">
        ${ app.$_toggle('ping_pm', 'On DMs') }
        ${ app.$_toggle('ping_chat', 'On Mentions') }
        ${ app.$_toggle('ping_song', 'On New Songs') }
        <p>Desktop Notifications</p>
      </div>
      <div class="ts-col">
        ${ app.$_field('hot_words', 'Save Hot Words', '3') }
        <p>Notifies / highlights word match in chat. Use multiple words in a comma separated list.</p>
      </div>
    </div>
  `
  const about = () => `
    <div data-tab="About" class="ts-tabbed ts-links">
      <div class="ts-col">
        ${ app.$_toggle('logging',     'Show Logs In Room Tab') } 
        ${ app.$_firing('reloadMusic', 'Fix Glitched Players') }
        ${ app.$_firing('reload',      'Reload turnStyles') }

        <p>Get Support On Discord</p>
        <a href="https://discord.gg/wqmAVvgSbE" target="_blank">
          turnStyles Discord</a>
        <a href="https://discord.gg/jnRs4WnPjM" target="_blank">
          Turntable.fm Discord</a>
      </div>
      <div class="ts-col">
        <a href="https://chrome.google.com/webstore/detail/turntable-tweaks/pmlkackfnbbnjfejpddpakallilkbdme" target="_blank">Chrome Store</a>
        <a href="https://addons.mozilla.org/en-US/firefox/addon/turnstyles-for-turntable-fm/" target="_blank">Firefox Addon</a>
        <a href="https://ts.pixelcrisis.co" target="_blank">Bookmarklet</a>
        
        <p>Running turnStyles v${ app.config.version }</p>
        
        <a href="https://github.com/pixelcrisis/turnstyles" target="_blank">turnStyles Source</a>
        <a href=""https://github.com/fluteds/ttscripts target="_blank">ttscripts (themes + more)</a>
      </div>
      <div class="ts-col">
        <a href="https://patreon.com/pixelcrisis">Make Requests On Patreon!</a>
        <p>Patrons can get features and themes added!</p>

        <p>Finding The Developer</p>
        <div style="text-align: center">
          <strong>@crisis</strong> on Discord<br>
          <strong>@crisis</strong> on Turntable<br>
          <strong>turntable.fm/pixelcrisis</strong>
        </div>
      </div>
    </div>
  `

  app.on('attach', app.bindPanels)

}