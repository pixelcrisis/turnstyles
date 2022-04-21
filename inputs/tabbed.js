// tabbed.js | defining our window tabs

module.exports = App => {

  App.tabs = [
    {
      name: "General",
      body: () => `
        <section class="full">
          <h3>${ App.$toggle("auto_b", "Enable Autobop") }</h3>
          <p>Do you forget to vote when a new song starts? turnStyles will attempt to vote "awesome" for you, after every new song starts. It will only happen once, so feel free to change your vote!</p>
        </section>
        <section>
          <h3>${ App.$toggle("nextdj", "Enable Next DJ") }</h3>
          <p>Don't want to miss your chance to hop on deck? When you enable Next DJ, turnStyles will attempt to grab the next available spot - as soon as a DJ drops, it will attempt to jump you up!</p>
        </section>
        <section>
          <h3>${ App.$toggle("escort", "Escort After Next") }</h3>
          <p>Gotta run but need to play your next track? No worries, turnStyles can take care of you! With this enabled, you'll automatically jump down when your next track finishes!</p>
        </section>
        <section>
          <h3>${ App.$toggle("is_afk", "Currently AFK") }</h3>
          <p>Do you need to step away for a second? When you enable AFK, it will send your AFK Response to the room chat, and will send it again to remind anyone who pings you while you're away!</p>
          ${ App.$string("afkstr", "Save AFK Response") }
        </section>
        <section>
          <h3>${ App.$toggle("idling", "Auto-AFK Timer") }</h3>
          <p>Sometimes we get distracted and sit idle in the background, confusing members who think you're still there! turnStyles can detect your activity and mark you afk automatically! </p>
          ${ App.$select("afkmax", false, "Idle Timer Duration") }
        </section>
        <section>
          <h3>${ App.$toggle("auto_q", "Enable AutoQueue") }</h3>
          <p>Does your room have a bot, and does that bot have a queue? When it's your turn, turnStyles can check for your bot's ping message and attempt to throw you on deck!</p>
          ${ App.$string("q_text", "Save Queue Ping") }
        </section>
        <section>
          <h3>${ App.$toggle("volume", "Override Volume") }</h3>
          <p>Let turnStyles take control of the volume settings. Moves the slider to the main header, and adds temporary mute - automatically unmutes after the current song is over!</p>
        </section>
      `
    },{
      name: "Visual",
      body: () => `
        <section> <h3>Active Theme</h3> ${ App.$select("theme") } </section>
        <section> <h3>Active Color Scheme</h3> ${ App.$select("style") } </section>
        <section>
          <h3>UI Modifications</h3>
          ${ App.$toggle("played", "Show Recently Played") }
          <p>No one wants to be a repeat - this will highlight songs in your playlist that were recently played in the room.</p>
          ${ App.$toggle("stamps", "Add Chat Timestamps") }
          <p>We all get distracted - turnStyles will add timestamps to all user messages in chat so you know when a message was sent.</p>
          ${ App.$toggle("emojis", "Enable Twitch/BTTV Emojis") }
          <p>Adds more emojis to the :emoji: syntax. Note: Only visible to other turnStyles users, and disables the :P emoji!</p>
        </section>
        <section>
          <h3>Visibility Options</h3>
          <p>The following options have the <em>tiniest potential</em> to reduce the load on your PC, arguably speeding up turntable.</p>
          ${ App.$toggle("bubble", "Show Chat Bubbles") }
          <p>Toggles speech bubbles from the audience.</p>
          ${ App.$toggle("people", "Show Room Audience") }
          <p>Toggles the avatars on the room floor.</p>
          ${ App.$toggle("player", "Show Video Player") }
          <p>Toggles the video player in the background.</p>
        </section>
        <section class="full">
          <h3>Custom CSS</h3>
          ${ App.$field("u_css", "Save & Apply Styles") }
        </section>
      `
    },{
      name: "Hotbar",
      body: () => `
        <section>
          <h3>QuickText Buttons</h3>
          <p>Send a message often? Do it with a button on the HotBar (under the turntable logo)!</p>
          ${ App.$toggle("qtbtn1", "Enable QT1 Button", "hotbar") }
          ${ App.$string("qtbtn1", "Save QT1 Text", "qtbtns") }
          <p>QuickText Buttons send to chat automatically!</p>
          ${ App.$toggle("qtbtn2", "Enable QT2 Button", "hotbar") }
          ${ App.$string("qtbtn2", "Save QT2 Text", "qtbtns") }
          <p>Tip: Add a label with the prefix: <kbd>label || </kbd></p>
          ${ App.$toggle("qtbtn3", "Enable QT3 Button", "hotbar") }
          ${ App.$string("qtbtn3", "Save QT3 Text", "qtbtns") }
          <p>Tip: Send up to 3 messages by separating them with <kbd> ;; </kbd></p>
        </section>
        <section>
          <h3>HotBar Buttons</h3>
          <p>Control which buttons show up in the HotBar when you hover over the turntable header.</p>
          ${ App.$toggle("is_afk", "AFK Button", "hotbar") }
          ${ App.$toggle("auto_b", "Autobop Button", "hotbar") }
          ${ App.$toggle("auto_q", "AutoQueue Button", "hotbar") }
          ${ App.$toggle("nextdj", "Next DJ Button", "hotbar") }
          ${ App.$toggle("escort", "Escort Button", "hotbar") }
          ${ App.$toggle("bubble", "Chat Bubble Toggle", "hotbar") }
          ${ App.$toggle("people", "Audience Toggle", "hotbar") }
          ${ App.$toggle("player", "Player Toggle", "hotbar") }
          ${ App.$toggle("shared", "Share turnStyles", "hotbar") }
        </section>
      `
    },{
      name: "Alerts",
      body: () => `
        <section>
          <h3>Desktop Notifications</h3>
          ${ App.$toggle("chat", "On New PMs", "notify") }
          ${ App.$toggle("ding", "On New Mentions", "notify") }
          ${ App.$toggle("song", "On New Songs", "notify") }
        </section>
        <section>
          <h3>Hot Words</h3>
          <p>Mention/Notify on word/phrase match in chat. Use multiple phrases in a <kbd>,</kbd> separated list</p>
          ${ App.$string("text", "Save Hot Words", "notify") }
        </section>
        <section>
          <h3>Alerts In Chat</h3>
          <p>Shown in chat, but only visible to you.</p>
          ${ App.$toggle("song", "Last Song Stats", "alerts") }
          ${ App.$toggle("spun", "Last DJ's Stats", "alerts") }
          ${ App.$toggle("snag", "On Song Snags", "alerts") }
          ${ App.$toggle("join", "On User Join", "alerts") }
          ${ App.$toggle("left", "On User Leave", "alerts") }
        </section>
        <section>
          <h3>Room Reminder</h3>
          <p>Frequently send the same message over and over? Use a reminder! Send your text to the room and your selected interval!</p>
          ${ App.$select("post", "timing", "Don't Remind") }
          ${ App.$string("text", "Save Reminder", "timing") }
          <p>Useful for posting recurring information like rules, themes, or whatever!</p>
        </section>
      `
    },{
      name: "Support",
      body: () => `
        <section>
          <h3>Debugging</h3>
          ${ App.$toggle("debug", "Print Logs In Console") }
          ${ App.$toggle("logger", "Show Logbook In Room Tab") }
          <p></p>
          ${ App.$button("Reload turnStyles", 0, 0, "Reload") }
          ${ App.$button("Reload Players", 0, 0, "reloadMusic") }
        </section>
        <section>
          <h3>turnStyles Data</h3>
          ${ App.$button("Backup Data", 0, 0, "backupData") }
          <label id="tsBackup" class="ts-button">
            <input type="file"> Restore Data
          </label>
          ${ App.$button("Reset To Default", 0, 0, "resetData") }
          ${ App.$button("Delete All Data", 0, 0, "deleteData") }
        </section>
        <section>
          <h3>Getting Help</h3>
          ${ App.$linkto("turnStyles Discord", App.static.tsDiscord) }
          ${ App.$linkto("turntable.fm Discord", App.static.ttDiscord) }
          <p>You can find the author and active users in the above discords.</p>
        </section>
        <section>
          <h3>The Author</h3>
          <p>Goes by <strong>@crisis</strong> on Discords and turntable.fm.</p>
          ${ App.$linkto("Patreon", App.static.patreon) }
          <p><em>I have a full time job and do this as a hobby, if you want to support turnStyles, consider joining the Patreon!</em></p>
        </section>
      `
    },{
      name: "Share",
      body: () => `
        <section>
          <h3>Install Links</h3>
          ${ App.$linkto("Install via Bookmarklet", App.static.website) }
          ${ App.$linkto("Install For Firefox", App.static.firefox) }
          ${ App.$linkto("Install For Chrome / Opera", App.static.chrome) }
        </section>
        <section>
          <h3>Share turnStyles <small>v${ App.config.version }</small></h3>
          <p>This will send a message to the room chat with a little description and a link to the turnStyles website! Use this to quickly share if someone wants to install the extension!</p>
          ${ App.$button("Share turnStyles in chat!", 0, 0, "Share") }
        </section>
      `
    }
  ]

}