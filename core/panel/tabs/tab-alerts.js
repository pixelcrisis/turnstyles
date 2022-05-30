module.exports = function () { return `
  <section>
    <article class="ts-help">
      <strong>Desktop Notifications</strong>
      <p>Sends a Desktop Notification when you aren't looking at turntable, and one of the selected events occurs.</p>
      ${ this._bool_("on.pm", "On New PMs") }
      ${ this._bool_("on.mention", "On New Mentions") }
      ${ this._bool_("on.song", "On New Songs") }
    </article>
    <article class="ts-help">
      <strong>Hot Words</strong>
      <p>Mention/Notify on word/phrase match in chat. Use multiple words and phrases in a comma separated list.</p>
      ${ this._str_("on.text", "Save Hot Words") }
    </article>
  </section>
  <section>
    <article class="ts-help">
      <strong>Alerts In Chat</strong>
      <p>These are posted in chat as a fake message, only visible to you. Meant to keep you up to date on the room.</p>
      ${ this._bool_("post.join", "On User Join") }
      ${ this._bool_("post.left", "On User Leave") }
      ${ this._bool_("post.snag", "On Song Snags") }
      ${ this._bool_("post.song", "Last Song Stats") }
      ${ this._bool_("post.spun", "Last DJ's Stats") }
    </article>
  </section>`
}