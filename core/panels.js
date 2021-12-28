// inputs.js | handle the hotbar/options panel

module.exports = app => {

  app.bindPanel = function () {
    $('#turnStyles').remove()
    $('.header-bar').append(panel(this.config))

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

  const panel = (conf) => `
    <div id="turnStyles">
      <div id="hotBar">
        <h1 class="ts-menu ts-open"></h1>
        ${ app.$_toggle('is_afk', 'AFK') }
        ${ app.$_toggle('autobop', 'AutoBop') }
        ${ app.$_toggle('auto_q', 'AutoQueue') }
        ${ app.$_toggle('nextdj', 'Next DJ') }
      </div>
      <div id="fullView">
        <div class="ts-row">
          <h1 class="ts-menu ts-close">✖</h1>
          ${ app.$_tab('General', true) }
          ${ app.$_tab('Visual') }
          ${ app.$_tab('CSS') }
          ${ app.$_tab('Alerts') }
          ${ app.$_tab('About') }
        </div>

        ${ generalTab() }
        ${ visualTab() }
        ${ cssTab(conf) }
        ${ alertsTab() }
        ${ aboutTab(conf) }
      </div>
    </div>
  `
  const generalTab = () => `
    <div data-tab="General" class="ts-row active">
      ${ app.$_toggle('autobop', 'Autobop') }
      ${ app.$_toggle('nextdj', 'Next DJ Spot') }
      ${ app.$_toggle('has_vol', 'Control Volume') }

      <div class="break"></div>
      ${ app.$_toggle('auto_q', 'Enable AutoQueue') }
      ${ app.$_string('q_ping', 'Save Queue Ping') }
      <p>Paste your bot's queue message above to hop on deck when called up.</p>

      <div class="break"></div>
      ${ app.$_toggle('is_afk', 'Go AFK') }
      ${ app.$_string('afk_ping', 'Save AFK Response') }
      <p>Sends your response when you mark as AFK, and if pinged while gone.</p>
    </div>
  `
  const visualTab = () => `
    <div data-tab="Visual" class="ts-row">
      ${ app.$_select('theme') }
      ${ app.$_select('style') }
      <p>Turntable Theme & Style</p>

      <div class="break"></div>
      ${ app.$_toggle('no_bub', 'Hide Chat Bubbles') }
      ${ app.$_toggle('no_vid', 'Hide Video Player') }
      ${ app.$_toggle('no_aud', 'Hide Room Audience') }
      ${ app.$_toggle('stamps', 'Add Timestamps To Chat') }
      <p>Show/Hide Various Visual Elements</p>

      <div class="break"></div>
      ${ app.$_toggle('played', 'Highlight Recently Played Songs') }
      <p>Add Red Glow To Songs Played Recently In The Room</p>
    </div>
  `
  const cssTab = (conf) => `
    <div data-tab="CSS" class="ts-row">
      <textarea id="ts_user_css" class="ts0inputs" rows="10">
        ${ conf.user_css }
      </textarea>
      <p>Add your own custom CSS snippets to turntable!</p>
      <div class="break"></div>
      ${ app.$_button('user_css', 'Save & Apply Styles') }
    </div>
  `
  const alertsTab = () => `
    <div data-tab="Alerts" class="ts-row">
      ${ app.$_toggle('chat_song', 'Last Song Stats') }
      ${ app.$_toggle('chat_spun', 'Dropped DJ Stats') }
      ${ app.$_toggle('chat_snag', 'User Snags') }
      ${ app.$_toggle('chat_join', 'User Joins') }
      ${ app.$_toggle('chat_left', 'User Leaves') }
      <p>Info Posted In Chat (Just For You To See)</p>
      
      <div class="break"></div>
      ${ app.$_toggle('ping_pm', 'On DMs') }
      ${ app.$_toggle('ping_chat', 'On Mentions') }
      ${ app.$_toggle('ping_song', 'On New Songs') }
      <p>Send Desktop Notifications</p>

      <div class="break"></div>
      ${ app.$_string('hot_words', 'Save Hot Words') }
      <p>Notifies / highlights word match in chat. Use multiple words in a comma separated list.</p>
    </div>
  `
  const aboutTab = (conf) => `
    <div data-tab="About" class="ts-row">
      ${ app.$_toggle('logging',     'Show Logs In Room Tab') } 
      ${ app.$_firing('reloadMusic', 'Fix Glitched Players') }
      ${ app.$_firing('reload',      'Reload turnStyles') }

      <div class="break"></div>
      <a href="https://chrome.google.com/webstore/detail/turntable-tweaks/pmlkackfnbbnjfejpddpakallilkbdme" target="_blank">Chrome Store</a>
      <a href="https://addons.mozilla.org/en-US/firefox/addon/turnstyles-for-turntable-fm/" target="_blank">Firefox Addon</a>
      <a href="https://ts.pixelcrisis.co" target="_blank">Bookmarklet</a>
      <p>turnStyles v${conf.version}</p>

      <div class="break"></div>
      <a href="https://discord.gg/wqmAVvgSbE" target="_blank">turnStyles Discord</a>
      <a href="https://discord.gg/jnRs4WnPjM" target="_blank">Turntable.fm Discord</a>
      <p>Support On Discord</p>

      <div class="break"></div>
      <a href="https://github.com/pixelcrisis/turnstyles" target="_blank">turnStyles</a>
      <a href=""https://github.com/fluteds/ttscripts target="_blank">ttscripts (themes + more)</a>
      <p>On Github</p>

      <div class="break"></div>
      <strong>Turntable: <em>@crisis</em></strong>&nbsp;-&nbsp;
      <strong>Discord: <em>@crisis</em></strong>
      <p>The Developer</p>

      <div class="break"></div>
      <a href="https://patreon.com/pixelcrisis">Make Requests On Patreon!</a>
      <p>Patrons can get features and themes added!</p>
    </div>
  `

  app.on('attach', app.bindPanel)

}