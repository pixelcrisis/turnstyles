// tabbed.js | defining our window tabs

module.exports = App => {

  App.tabs = [
    {
      name: "General",
      body: () => `
        <section>
          <article>
            ${ App.$toggle("auto_b", "Enable Autobop") }
            <p>Do you forget to vote when a new song starts? turnStyles will attempt to vote "awesome" for you, after every new song starts. It will only happen once, so feel free to change your vote!</p>
          </article>
          <article>
            ${ App.$toggle("is_afk", "Currently AFK") }
            <p>Do you need to step away for a second? When you enable AFK, it will send your AFK Response to the room chat, and will send it again to remind anyone who pings you while you're away!</p>
            ${ App.$string("afkstr", "Save AFK Response") }
          </article>
          <article>
            ${ App.$toggle("idling", "Auto-AFK Timer") }
            <p>Sometimes we get distracted and sit idle in the background, confusing members who think you're still there! turnStyles can detect your activity and mark you afk automatically! </p>
            ${ App.$select("afkmax", false, "Idle Timer Duration") }
          </article>
          <article>
            ${ App.$toggle("volume", "Override Volume") }
            <p>Let turnStyles take control of the volume settings. Moves the slider to the main header, and adds temporary mute - automatically unmutes after the current song is over!</p>
          </article>
        </section>
        <section>
          <article>
            ${ App.$toggle("nextdj", "Enable Next DJ") }
            <p>Don't want to miss your chance to hop on deck? When you enable Next DJ, turnStyles will attempt to grab the next available spot - as soon as a DJ drops, it will attempt to jump you up!</p>
          </article>
          <article>
          ${ App.$toggle("escort", "Escort After Next") }
            <p>Gotta run but need to play your next track? No worries, turnStyles can take care of you! With this enabled, you'll automatically jump down when your next track finishes!</p>
          </article>
          <article class="ts-help">
            ${ App.$toggle("auto_q", "Enable AutoQueue") }
            <p>Does your room have a bot, and does that bot have a queue? When it's your turn, turnStyles can check for your bot's ping message and attempt to throw you on deck!</p>
            ${ App.$string("q_text", "Save Queue Ping") }
          </article>
        </section>
        <section class="full" style="margin-top: 10px">
          <article class="ts-help">
            <strong>Room Reminder:</strong>
            ${ App.$select("post", "timing", "Don't Remind") }
            <p>Frequently send the same message over and over? Use a reminder! Send your text to the room and your selected interval! Useful for posting recurring information like rules, themes, or whatever!</p>
            ${ App.$string("text", "Save Reminder", "timing") }
          </article>
        </section>
      `
    },{
      name: "Visual",
      body: () => `
        <section>
          <article>
            <strong>Theme:</strong>
            ${ App.$select("theme") }
            <p>Changes the overall appearance of turntable.</p>
          </article>
          <article>
            ${ App.$toggle("played", "Show Recently Played") }
            <p>No one wants to be a repeat - this will highlight songs in your playlist that were recently played in the room.</p>
          </article>
          <article>
            ${ App.$toggle("stamps", "Add Chat Timestamps") }
            <p>We all get distracted - turnStyles will add timestamps to all user messages in chat so you know when a message was sent.</p>
          </article>
          <article>
            ${ App.$toggle("emojis", "Enable Twitch/BTTV Emojis") }
            <p>Adds more emojis to the :emoji: syntax. Note: Only visible to other turnStyles users, and disables the :P emoji!</p>
          </article>
        </section>
        <section>
          <article>
            <strong>Style:</strong>
            ${ App.$select("style") }
            <p>Changes just the gold/accent color of turntable.</p>
          </article>
          <article>
            ${ App.$toggle("bubble", "Show Chat Bubbles") }
            <p>Toggles speech bubbles from the audience.</p>
          </article>
          <article>
            ${ App.$toggle("people", "Show Room Audience") }
            <p>Toggles the avatars on the room floor.</p>
          </article>
          <article>
            ${ App.$toggle("player", "Show Video Player") }
            <p>Toggles the video player in the background.</p>
          </article>
        </section>
        <section class="full">
          <article class="ts-help">
            <strong>Custom CSS</strong>
            <p>Want to add your own tweaks? Add any CSS snippet here and turnStyles will inject it into turntable for you!</p>
            ${ App.$field("u_css", "Save & Apply Styles") }
          </article>
        </section>
      `
    },{
      name: "Hotbar",
      body: () => `
        <section>
          <article class="ts-help">
            ${ App.$toggle("qtbtn1", "Enable QuickText 1", "hotbar") }
            <p>Send a message often? QuickText Buttons get added to the HotBar, and allow you to send messages at the press of a button!</p>
            ${ App.$string("qtbtn1", "Save QuickText 1", "qtbtns") }
          </article>
          <article class="ts-help">
            ${ App.$toggle("qtbtn2", "Enable QuickText 2", "hotbar") }
            <p>Add a label by prefixing the text: <strong>Label || Text</strong></p>
            ${ App.$string("qtbtn2", "Save QuickText 2", "qtbtns") }
          </article>
          <article class="ts-help">
            ${ App.$toggle("qtbtn3", "Enable QuickText 3", "hotbar") }
            <p>Split to send up to three messages: <strong>Text A ;; Text B</strong></p>
            ${ App.$string("qtbtn3", "Save QuickText 3", "qtbtns") }
          </article>
        </section>
        <section>
          <article>
            ${ App.$toggle("is_afk", "AFK Button", "hotbar") }
            <p>Toggles button visibility in the HotBar.</p>
          </article>
          <article>
            ${ App.$toggle("auto_b", "Autobop Button", "hotbar") }
            <p>Toggles button visibility in the HotBar.</p>
          </article>
          <article>
            ${ App.$toggle("auto_q", "AutoQueue Button", "hotbar") }
            <p>Toggles button visibility in the HotBar.</p>
          </article>
          <article>
            ${ App.$toggle("nextdj", "Next DJ Button", "hotbar") }
            <p>Toggles button visibility in the HotBar.</p>
          </article>
          <article>
            ${ App.$toggle("escort", "Escort Button", "hotbar") }
            <p>Toggles button visibility in the HotBar.</p>
          </article>
          <article>
            ${ App.$toggle("bubble", "Chat Bubble Toggle", "hotbar") }
            <p>Toggles button visibility in the HotBar.</p>
          </article>
          <article>
            ${ App.$toggle("people", "Audience Toggle", "hotbar") }
            <p>Toggles button visibility in the HotBar.</p>
          </article>
          <article>
            ${ App.$toggle("player", "Player Toggle", "hotbar") }
            <p>Toggles button visibility in the HotBar.</p>
          </article>
          <article>
            ${ App.$toggle("shared", "Share turnStyles", "hotbar") }
            <p>Toggles button visibility in the HotBar.</p>
          </article>
        </section>
      `
    },{
      name: "Alerts",
      body: () => `
        <section>
          <h4>Desktop Notifications</h4>
          <article>
            ${ App.$toggle("chat", "On New PMs", "notify") }
            <p>Sends a Notification when you get a new PM and aren't looking at turntable.</p>
          </article>
          <article>
            ${ App.$toggle("ding", "On New Mentions", "notify") }
          </article>
          <article>
            ${ App.$toggle("song", "On New Songs", "notify") }
          </article>
          <article class="ts-help">
            <strong>Hot Words</strong>
            <p>Mention/Notify on word/phrase match in chat. Use multiple words and phrases in a comma separated list</p>
            ${ App.$string("text", "Save Hot Words", "notify") }
          </article>
        </section>
        <section>
          <h4>Subtle Alerts In Chat</h4>
          <article>
            ${ App.$toggle("song", "Last Song Stats", "alerts") }
          </article>
          <article>
            ${ App.$toggle("spun", "Last DJ's Stats", "alerts") }
          </article>
          <article>
            ${ App.$toggle("snag", "On Song Snags", "alerts") }
          </article>
          <article>
            ${ App.$toggle("join", "On User Join", "alerts") }
          </article>
          <article>
            ${ App.$toggle("left", "On User Leave", "alerts") }
          </article>
        </section>
      `
    },{
      name: "Help",
      body: () => `
        <section>
          <article>
            ${ App.$toggle("debug", "Print Logs In Console") }
            <p>The output of turnStyles will be printed into the dev console of your browser. This is useful for finding out why things aren't working.</p>
          </article>
          <article>
            ${ App.$toggle("logger", "Show Logbook In Room Tab") }
            <p>This adds a running log of what's happened in your room and with turnStyles, printed neatly in the Room Tab.</p>
          </article>
          <p></p>
          <article class="ts-help">
            <strong>Reload turnStyles</strong>
            <p>Removes turnStyles from the room and re-injects it. Useful for debugging or updating a bookmarklet.</p>
            ${ App.$button("Reload turnStyles", 0, 0, "Reload") }
          </article>
          <article class="ts-help">
            <strong>Reload Music Players</strong>
            <p>Disables and Re-Enables the music players in an attempt to unstick them when broken.</p>
            ${ App.$button("Reload Players", 0, 0, "reloadMusic") }
          </article>
        </section>
        <section>
          <article class="ts-data ts-help">
            <strong>turnStyles Data</strong>
            <p>If something goes wrong or you need to start over, you can reset/restore/backup your data here!</p><br>
            ${ App.$button("Backup Data", 0, 0, "backupData") }
            <label id="tsBackup" class="ts-button">
              <input type="file"> Restore Data
            </label><br>
            ${ App.$button("Reset To Default", 0, 0, "resetData") }
            ${ App.$button("Delete All Data", 0, 0, "deleteData") }
          </article>
          <article class="ts-help">
            <strong>Getting Help via Discords</strong>
            <p>You can find the author and active users in the below discords.</p>
            ${ App.$linkto("turnStyles Discord", App.lang.tsDiscord) }
            ${ App.$linkto("turntable.fm Discord", App.lang.ttDiscord) }
          </article>
        </section>
      `
    },{
      name: "About",
      body: () => `
        <section class="full">
          <article class="ts-help">
            <strong>turnStyles</strong>
            <p><strong>version: </strong>${ App.version }</p>
            <p><strong>user id: </strong>${ App.User().id }</p>
          </article>
        </section>
        <section>
          <article class="ts-help">
            <strong>The Author</strong>
            <p>turnStyles was made by pixelcrisis, who goes by <em>@crisis</em> on both Discord and turntable.fm</p>
            <p><em>I have a full time job and do this as a hobby, if you want to support turnStyles, consider joining the Patreon! By becoming a patron, you get some swag in chat visible to other turnStyles users!</em></p>
            ${ App.$linkto("Patreon", App.lang.patreon) }
          </article>
        </section>
        <section>
          <article class="ts-help">
            <strong>Links</strong>
            <p>These are links to the website, and other places you can install turnStyles.</p>
            ${ App.$linkto("Website", App.lang.website) }
            ${ App.$linkto("Firefox Addon", App.lang.firefox) }
            ${ App.$linkto("Chrome Store / Opera", App.lang.chrome) }
          </article>
        </section>
        <section class="full">
          <article class="ts-help">
            <strong>Share turnStyles</strong>
            <p>This will send a message to the room chat with a little description and a link to the turnStyles website! Use this to quickly share if someone wants to install the extension!</p>
            ${ App.$button("Share turnStyles in chat!", 0, 0, "Share") }
          </article>
        </section>
      `
    }
  ]

}