// tabbed.js | defining our window tabs

module.exports = App => {

  App.tabs = [ 
    "General",
    "Visual",
    "Hotbar",
    "Alerts",
    "Support" 
  ]

  App.tabbed = {
    General: () => tabContent("General", `
      <h3>Automate</h3>
      <h5>${ App.$toggle("auto_b", "Enable Autobop") }</h5>
      <p>Vote "Awesome" after every new song starts, automatically!</p>

      <h5>${ App.$toggle("nextdj", "Take Next DJ Spot") }</h5>
      <p>turnStyles will attempt to add you as a DJ when a spot becomes available.</p>

      <h5>${ App.$toggle("auto_q", "Enable AutoQueue") }</h5>
      <p>For bots with a queue: Paste your queue ping above to auto DJ on ping!</p>

      <h3>General</h3>
      <h5>${ App.$toggle("is_afk", "Currently AFK" ) }</h5>
      ${ App.$string("afkstr", "Save AFK Response") }
      <p>Sends the AFK Response when you go AFK, and when you're pinged while AFK.</p>

      <h5>${ App.$toggle("volume", "Overrie Volume") }</h5>
      <p>Move volume controls out of the menu, and adds Mute For One Song.</p>
    `, true),

    Visual: () => tabContent("Visual", `
      <h3>Theme/Style</h3>
      ${ App.$select("theme") }
      ${ App.$select("style") }

      <h3>Visual Tweaks</h3>
      <h5>${ App.$toggle("played", "Show Recently Played") }</h5>
      <p>Highlights songs in playlist that were recently played in the room.</p>

      <h5>${ App.$toggle("stamps", "Add Timestamps To Chat") }</h5>
      <p>Adds a timestamp to the right of room chat messages.</p>

      <h3>Turntable</h3>
      ${ App.$toggle("bubble", "Show Chat Bubbles") }
      ${ App.$toggle("people", "Show Room Audience") }
      ${ App.$toggle("player", "Show Video Player") }

      <h3>Custom CSS</h3>
      ${ App.$field("u_css", "Save & Apply Styles") }
      <p>Add your own custom CSS snippets to turntable!</p>
    `),

    Hotbar: () => tabContent("Hotbar", `
      <h3>QuickText</h3>
      <h5>${ App.$toggle("qtbtn1", "Enable QT 1", "hotbar") }</h5>
      ${ App.$string("qtbtn1", "Save QT 1", "qtbtns") }
      <p>Send your most common messages at the push of a button!</p>

      <h5>${ App.$toggle("qtbtn2", "Enable QT 2", "hotbar") }</h5>
      ${ App.$string("qtbtn2", "Save QT 2", "qtbtns") }
      <p>Prefix with <strong>label || </strong> to add a button label!</p>
      <kbd>hello || hello world!</kbd>

      <h5>${ App.$toggle("qtbtn3", "Enable QT 3", "hotbar") }</h5>
      ${ App.$string("qtbtn3", "Save QT 3", "qtbtns") }
      <p>Send multiple by adding <strong>;;</strong></p>
      <kbd>welcome || Hello! || Rules! || Gif!</kbd>

      <h3>Show In Hotbar</h3>
      ${ App.$toggle("is_afk", "AFK", "hotbar") }
      ${ App.$toggle("auto_b", "Autobop", "hotbar") }
      ${ App.$toggle("auto_q", "AutoQueue", "hotbar") }
      ${ App.$toggle("nextdj", "Next DJ", "hotbar") }
      ${ App.$toggle("bubble", "Chat Bubble Toggle", "hotbar") }
      ${ App.$toggle("people", "Audience Toggle", "hotbar") }
      ${ App.$toggle("player", "Player Toggle", "hotbar") }
    `),

    Alerts: () => tabContent("Alerts", `
      <h3>Hot Words</h3>
      ${ App.$string("text", "Save Hot Words", "notify") }
      <p>Desktop Notifications/Highlight Message on word match in chat. Use more than one in a comma separated list.</p>

      <h3>Notify</h3>
      ${ App.$toggle("chat", "On New PM", "notify") }
      ${ App.$toggle("ding", "On New Mention", "notify") }
      ${ App.$toggle("song", "On New Songs", "notify") }
      <p>Send Desktop Notifications</p>

      <h3>Alerts</h3>
      ${ App.$toggle("song", "Last Song Stats", "alerts") }
      ${ App.$toggle("spun", "Last DJ Stats", "alerts") }
      ${ App.$toggle("snag", "Song Snags", "alerts") }
      ${ App.$toggle("join", "On User Join", "alerts") }
      ${ App.$toggle("left", "On User Leave", "alerts") }
      <p>Alerts show up in room chat but are only visible to you.</p>

      <h3>Reminder</h3>
      ${ App.$select("remind", "timing") }
      ${ App.$string("text", "Save Reminder", "timing") }
      <p>Sends Reminder to room at the selected interval! Useful for themes, rules, whatever you like!</p>
    `),

    Support: () => tabContent("Support", `
      <h3>Debug</h3>
      ${ App.$toggle("logger", "Show Logs In Room Tab") }
      <div style="width: 0px;height: 10px;"></div>
      ${ App.$button("Reload turnStyles", false, false, "reload") }
      ${ App.$button("Reload Players", false, false, "reloadMusic") }
      ${ App.$button("Reset Data", false, false, "resetData") }

      <h3>Backup</h3>
      ${ App.$button("Download Backup", false, false, "backupData") }
      <label id="tsBackup" class="ts-button"><input type="file">Restore Backup</label>

      <h3>Support</h3>
      <a href="https://discord.gg/wqmAVvgSbE" class="ts-button" target="_blank">turnStyles Discord</a>
      <a href="https://discord.gg/jnRs4WnPjM" class="ts-button" target="_blank">turntable.fm Discord</a>

      <h3>Sharing</h3>
      <a href="https://chrome.google.com/webstore/detail/turntable-tweaks/pmlkackfnbbnjfejpddpakallilkbdme" class="ts-button" target="_blank">Chrome / Opera</a>
      <a href="https://addons.mozilla.org/en-US/firefox/addon/turnstyles-for-turntable-fm/" class="ts-button" target="_blank">Firefox</a>
      <a href="https://ts.pixelcrisis.co" class="ts-button" target="_blank">Bookmarklet</a>
      <a href="https://ts.pixelcrisis.co" class="ts-button" target="_blank">Beta</a>

      <h3>Author</h3>
      <em>turnStyles v${ App.config.version }<em><br />
      <strong>@crisis</strong> on Discord<br />
      <strong>@crisis</strong> on Turntable<br />
      <a target="_blank" href="https://patreon.com/pixelcrisis">patreon.com/pixelcrisis</a><br />
      <em>Request Themes & More on Patreon!</em>
    `)
  }

}

const tabContent = (name, content, active) => `
  <div class="ts-tabbed ${ active ? "active" : "" }" 
    data-tab="${ name }">${ content }</div>
`