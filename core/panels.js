// panels.js | handle the hotbar/options panel

module.exports = app => {

  app.bindPanels = function () {
    this.drawHotBar()
    this.drawWindow()
  }

  app.drawHotBar = function () {
    $('#tsHotBar').remove()
    $('.header-bar').append(HotBar())

    $('#tsOpen').on('click', () => $('#tsWindow').addClass('active'))
    
    $('#tsHotBar *[data-for]').on('click',  this.saveConfig.bind(this))
    $('#tsHotBar *[data-opt]').on('change', this.saveConfig.bind(this))
  }

  app.drawWindow = function () {
    $('#tsWindow').remove()
    $('body').append(Options())

    $('#tsClose').on('click', () => $('#tsWindow').removeClass('active'))
    $('#tsWindow').on('click', function (e) {
      if (e.target == this) $('#tsWindow').removeClass('active')
    })

    $('.ts-tab').on('click', (e) => {
      $('#tsWindow .active').removeClass('active')
      $(`*[data-tab="${e.target.dataset.tab}"]`).addClass('active')
    })
    
    $('#tsWindow *[data-for]').on('click',  this.saveConfig.bind(this))
    $('#tsWindow *[data-opt]').on('change', this.saveConfig.bind(this))
  }

  const HotBar = () => `
    <div id="tsHotBar">
      ${ app.$_button('☰', false, 'tsOpen') }
      ${ app.$_toggle('is_afk', 'AFK', false, 'hbIsAfk') }
      ${ app.$_toggle('auto_b', 'AutoBop', false, 'hbAutoB') }
      ${ app.$_toggle('auto_q', 'AutoQueue', false, 'hbAutoQ') }
      ${ app.$_toggle('nextdj', 'Next DJ', false, 'hbNextDJ') }

      ${ app.$_qt_btn('1') }
      ${ app.$_qt_btn('2') }
      ${ app.$_qt_btn('3') }

      ${ app.$_toggle('bubble', 'Bubbles', false, 'hbBubbles') }
      ${ app.$_toggle('people', 'People', false, 'hbPeople') }
      ${ app.$_toggle('player', 'Player', false, 'hbPlayer') }
    </div>
  `

  const Options = () => `
    <div id="tsWindow">
      <div id="tsConfig">
        <nav>
          <h2><span id="tsClose">✖</span>turnStyles</h2>
          <div class="ts-tab active" data-tab="general">General</div>
          <div class="ts-tab" data-tab="visual">Visual</div>
          <div class="ts-tab" data-tab="hotbar">HotBar</div>
          <div class="ts-tab" data-tab="alerts">Alerts</div>
          <div class="ts-tab" data-tab="support">Help / About</div>
        </nav>

        ${ General() }
        ${ Visuals() }
        ${ HBarTab() }
        ${ Alerts() }
        ${ Support() }
      </div>
    </div>
  `
  const General = () => `
    <div data-tab="general" class="ts-tabbed active">
      <h3>Automate</h3>

      <h5>${ app.$_toggle('auto_b', 'Enable Autobop') }</h5>
      <p>Vote "Awesome" after every new song starts, automatically!</p>

      <h5>${ app.$_toggle('nextdj', 'Take Next DJ Spot') }</h5>
      <p>With this selected, turnStyles will attempt to automatically add you as a DJ when a spot becomes available.</p>

      <h5>${ app.$_toggle('auto_q', 'Enable AutoQueue') }</h5>
      ${ app.$_string('q_text', 'Save Ping')}
      <p>Have a bot in your room that uses a queue? Copy/paste your queue ping above to automatically jump on deck when you're called!</p>

      <h3>General</h3>

      <h5>${ app.$_toggle('is_afk', 'Currently AFK') }</h5>
      ${ app.$_string('afkstr', 'Save AFK Text') }
      <p>When you've marked yourself as AFK, it will send the AFK Text above, and it will send it again whenever you're pinged while AFK.</p>

      <h5>${ app.$_toggle('volume', 'Override Volume') }</h5>
      <p>Move the volume controls to the main header (out of the menu), and add Temporary Mute (until the next song).</p>
    </div>
  `
  const Visuals = () => `
    <div data-tab="visual" class="ts-tabbed">
      <h3>Theme/Style</h3>
      ${ app.$_select('theme') }
      ${ app.$_select('style') }

      <h3>Visual Tweaks</h3>
      <h5>${ app.$_toggle('played', 'Show Recently Played') }</h5>
      <p>Checks your playlist and highlights songs recently played in the current room.</p>
      <h5>${ app.$_toggle('stamps', 'Add Timestamps To Chat') }</h5>
      <p>Adds a timestamp to the top right of room chat messages.</p>

      <h3>Turntable</h3>
      ${ app.$_toggle('bubble', 'Show Chat Bubbles') }
      ${ app.$_toggle('people', 'Show Room Audience') }
      ${ app.$_toggle('player', 'Show Video Player') }

      <h3>Custom CSS</h3>
      ${ app.$_bigtxt('u_css', 'Save & Apply Styles!') }
      <p>Add your own custom CSS snippets to turntable!</p>
    </div>
  `
  const HBarTab = () => `
    <div data-tab="hotbar" class="ts-tabbed">
      <h3>QuickText</h3>
      <h5>${ app.$_toggle('qtbtn1', 'Enable QT 1', 'hotbar') }</h5>
      ${ app.$_string('qtbtn1', 'Save QT', 'qtbtns')}
      <h5>${ app.$_toggle('qtbtn2', 'Enable QT 2', 'hotbar') }</h5>
      ${ app.$_string('qtbtn2', 'Save QT', 'qtbtns')}
      <h5>${ app.$_toggle('qtbtn3', 'Enable QT 3', 'hotbar') }</h5>
      ${ app.$_string('qtbtn3', 'Save QT', 'qtbtns')}
      <p>Add text to your hot bar to send your most common messages at the push of a button! Add a label by splitting your message with <strong>||</strong>. Send multiple messages by splitting with <strong>;;</strong>. For example, <kbd>Hello || Hey! Welcome to the room! ;; Read the rules and have fun!</kbd></p>

      <h3>Default</h3>
      ${ app.$_toggle('is_afk', 'AFK in Hot Bar', 'hotbar') }
      ${ app.$_toggle('auto_b', 'Autobop in Hot Bar', 'hotbar') }
      ${ app.$_toggle('auto_q', 'AutoQueue in Hot Bar', 'hotbar') }
      ${ app.$_toggle('nextdj', 'Next DJ in Hot Bar', 'hotbar') }
      ${ app.$_toggle('bubble', 'Chat Bubble Toggle in Hot Bar', 'hotbar') }
      ${ app.$_toggle('people', 'Audience Toggle in Hot Bar', 'hotbar') }
      ${ app.$_toggle('player', 'Player Toggle in Hot Bar', 'hotbar') }
    </div>
  `
  const Alerts = () => `
    <div data-tab="alerts" class="ts-tabbed">
      <h3>Hot Words</h3>
      ${ app.$_string('text', 'Save Hot Words', 'notify') }
      <p>Sends Desktop Notifications/Highlights word match in chat. Use multiple words as a comma separated list.</p>

      <h3>Notify</h3>
      ${ app.$_toggle('song', 'Notify On New Songs', 'notify') }
      ${ app.$_toggle('chat', 'Notify On New DMs', 'notify') }
      ${ app.$_toggle('ding', 'Notify On Mentions', 'notify') }
      <p>Sends Desktop Notifications.</p>

      <h3>Alert</h3>
      ${ app.$_toggle('song', 'Last Song Stats', 'alerts') }
      ${ app.$_toggle('spun', 'Last DJ Stats', 'alerts') }
      ${ app.$_toggle('snag', 'For User Snags', 'alerts') }
      ${ app.$_toggle('join', 'On User Joins', 'alerts') }
      ${ app.$_toggle('left', 'On User Leave', 'alerts') }
      <p>These alerts show up in the room chat and are only visible to you, not for everyone to see.</p>
    </div>
  `
  const Support = () => `
    <div data-tab="support" class="ts-tabbed ts-about">
      <h3>Debug</h3>
      ${ app.$_toggle('logger', 'Show Logs In Room Tab') }
      ${ app.$_button('Reload turnStyles', false, false, 'reload') }
      ${ app.$_button('Reload Players', false, false, 'reloadMusic') }

      <h3>Support</h3>
      <a class="ts-button" target="_blank" href="https://discord.gg/wqmAVvgSbE">
        turnStyles Discord
      </a>
      <a class="ts-button" target="_blank" href="https://discord.gg/jnRs4WnPjM">
        turntable.fm Discord
      </a>

      <h3>Sharing</h3>
      <a class="ts-button" target="_blank" href="https://chrome.google.com/webstore/detail/turntable-tweaks/pmlkackfnbbnjfejpddpakallilkbdme">Chrome / Opera</a>
      <a class="ts-button" target="_blank" href="https://addons.mozilla.org/en-US/firefox/addon/turnstyles-for-turntable-fm/">Firefox</a>
      <a class="ts-button" target="_blank" href="https://ts.pixelcrisis.co">Bookmarklet</a>
      <a class="ts-button" target="_blank" href="https://ts.pixelcrisis.co">Beta</a>

      <h3>Author</h3>
      <em>turnStyles v${ app.config.version }<em><br />
      <strong>@crisis</strong> on Discord<br />
      <strong>@crisis</strong> on Turntable<br />
      <a target="_blank" href="https://patreon.com/pixelcrisis">patreon.com/pixelcrisis</a><br />
      <em>Request Themes & More on Patreon!</em>
    </div>
  `

  app.on('attach', app.bindPanels)

}