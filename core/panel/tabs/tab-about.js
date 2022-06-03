module.exports = function () { return `
  <section>
    <article class="ts-help">
      <strong>About turnStyles</strong>
      <p>
        version: <em><strong>${ this.version }</strong></em><br />
        user id: <em><strong>${ this.$user() ? this.$user().id : "" }</strong></em>
      </p>
    </article>
    <article class="fan">
      ${ this._bool_("isfan", "Fan The Developer") }
      <p>With this option enabled, you'll automatically fan @crisis on turntable - allowing you to find him when he's online and pester him with questions!</p>
    </article>
    <article class="ts-help">
      <strong>About The Developer</strong>
      <p>turnStyles was made by pixelcrisis, who goes by <em>@crisis</em> on both Discord and turntable.fm</p>
      <p><em>I have a full time job and do this as a hobby, if you want to support turnStyles, consider joining the Patreon! By becoming a patron, you get some swag in chat visible to other turnStyles users!</em></p>
      <p>
        ${ this._a_("Support turnStyles On Patreon!", this.static.patreon, "tsGold") }
      </p>
    </article>
  </section>
  <section>
    <article class="ts-help">
      <strong>Share turnStyles</strong>
      <p>This will send a message to the room chat with a little description and a link to the turnStyles website! Use this to quickly share if someone wants to install the extension!</p>
      ${ this._btn_("Share turnStyles in chat!", 0, 0, "Share") }
    </article>
    <article class="ts-help ts-links">
      <strong>Links</strong>
      <p>These are links to the website (bookmarklets!), and other places you can install turnStyles.</p>
      ${ this._a_("turnStyles Website", this.static.website) }
      ${ this._a_("As A Firefox Addon", this.static.firefox) }
      ${ this._a_("From The Chrome Store", this.static.chrome) }
    </article>
  </section>`
}