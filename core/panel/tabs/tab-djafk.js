module.exports = function () { return `
  <section>
    <article class="ts-help">
      ${ this._bool_("dj.next", "Enable Next DJ") }
      <p>Auto jump up after the next DJ drops!</p>
    </article>
    <article class="ts-help">
      ${ this._bool_("dj.done", "Escort After Next") }
      <p>Auto jump down after your next track!</p>
    </article>
    <article class="ts-help">
      ${ this._bool_("dj.auto", "Enable AutoQueue") }
      <p>Jump on deck when pinged by a bot!</p>
      ${ this._str_("dj.text", "Save Queue Ping") }
    </article>
  </section>
  <section>
    <article class="ts-help">
      <strong>AFK Response</strong>
      <p>The message sent when Currently AFK or pinged while AFK.</p>
      ${ this._str_("afk.text", "Save AFK Response") }
    </article>
    <article class="ts-help">
      <strong>AFK Timer:</strong> ${ this._list_("afk.auto", "times") }
      <p>turnStyles can detect your activity and mark you afk automatically! </p>
    </article>
    <article>
      ${ this._bool_("afk.idle", "Currently AFK") }
      <p>When enabled, sends your AFK Response to the room chat, and again when pinged while you're away!</p>
    </article>
  </section>`
}