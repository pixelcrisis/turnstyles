module.exports = function () { return `
  <section>
    <article class="ts-help">
      <strong>turnStyles</strong>
      <p><em>version: </em>${ this.version }</p>
      <p><em>user id: </em>${ this.$user() ? this.$user().id : "" }</p>
    </article>
    <article class="ts-help">
      <strong>The Author</strong>
      <p>turnStyles was made by pixelcrisis, who goes by <em>@crisis</em> on both Discord and turntable.fm</p>
      <p><em>I have a full time job and do this as a hobby, if you want to support turnStyles, consider joining the Patreon! By becoming a patron, you get some swag in chat visible to other turnStyles users!</em></p>
      ${ this._a_("Patreon", this.static.patreon) }
    </article>
  </section>
  <section>
    <article class="ts-help">
      <strong>Share turnStyles</strong>
      <p>This will send a message to the room chat with a little description and a link to the turnStyles website! Use this to quickly share if someone wants to install the extension!</p>
      ${ this._btn_("Share turnStyles in chat!", 0, 0, "Share") }
    </article>
    <article class="ts-help">
      <strong>Links</strong>
      <p>These are links to the website, and other places you can install turnStyles.</p>
      ${ this._a_("Website", this.static.website) }
      ${ this._a_("Firefox Addon", this.static.firefox) }
      ${ this._a_("Chrome Store / Opera", this.static.chrome) }
    </article>
  </section>`
}