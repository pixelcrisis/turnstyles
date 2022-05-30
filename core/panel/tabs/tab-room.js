module.exports = function () { return `
  <section>
    <article>
      ${ this._bool_("autobop", "Autobop") }
      <p>Auto vote "awesome" when a new song starts.</p>
    </article>
    <article class="ts-help">
      ${ this._bool_("use.volume", "Move Volume") }
      <p>Moves volume to the header, adds temporary mute - unmutes after the current song.</p>
    </article>
    <article class="ts-help">
      ${ this._bool_("use.recent", "Recently Played") }
      <p>Highlights songs in your playlist that were recently played in the room.</p>
    </article>
    <article class="ts-help">
      <strong>Reminder:</strong> ${ this._list_("note.on", "times") }
      <p>Send text to the room at a selected interval. Useful for posting recurring information like rules, themes, or whatever!</p>
      ${ this._str_("note.text", "Save Reminder") }
    </article>
  </section>
  <section>
    <article class="ts-help">
      ${ this._bool_("use.emojis", "Add More Emojis") }
      <p>Adds more emojis to the :emoji: syntax. Currently sourced from Twitch and BTTV. Note: Only visible to other turnStyles users, and disables the :P emoji!</p>
    </article>
    <article class="ts-help">
      ${ this._bool_("use.stamps", "Chat Timestamps") }
      <p>We all get distracted - turnStyles will add timestamps to all user messages in chat so you know when a message was sent.</p>
    </article>
    <article>
      ${ this._bool_("hide.bubble", "Hide Chat Bubbles") }
      <p>Toggles speech bubbles from the audience.</p>
    </article>
    <article>
      ${ this._bool_("hide.people", "Hide Room Audience") }
      <p>Toggles the avatars on the room floor.</p>
    </article>
    <article>
      ${ this._bool_("hide.player", "Hide Video Player") }
      <p>Toggles the video player in the background.</p>
    </article>
  </section>`
}