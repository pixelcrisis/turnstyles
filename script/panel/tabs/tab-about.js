export default function () { return `
  <section>
    <article class="ts-help">
      <strong>About turnStyles</strong>
      <p>
        version: ${ this.version }<br>
        user id: ${ this.user ? this.user.id : "" }
      </p>
    </article>

    <article class="fan">
      ${ this.$bool("Fan The Developer", "isfan") }
      <p>With this enabled, you'll automatically fan @crisis on turntable - allowing you to track him down when he's online and pester him with questions!</p>
    </article>

    <article class="ts-help">
      <strong>About The Developer</strong>
      <p>turnStyles was made by pixelcrisis, who goes by <em>@crisis</em> on both Discord and turntable.fm</p>
      <p><em>I have a full time job and do this as a hobby - if you want to support turnStyles, consider joining the Patreon! By becoming a patron, you get some swag in chat visible to other turnStyles users!</em></p>
      <p>${ this.$a("Support turnStyles On Patreon!", this.strings.patreon, "tsGold") }</p>
    </article>
  </section>
  
  <section>
    <article class="ts-help">
      <strong>Share turnStyles</strong>
      <p>This will send a message to the room chat with a little description and a link to the turnStyles website! Use this to quickly share if someone wants to install the extension!</p>
      ${ this.$btn("Share turnStyles In Chat!", 0, "share") }
    </article>

    <article class="ts-help ts-links">
      <strong>Links</strong>
      <p>These are links to the website (bookmarklets!) and other places you can get turnStyles.</p>
      ${ this.$a("turnStyles Website", this.strings.website) }
      ${ this.$a("As A Firefox Addon", this.strings.firefox) }
      ${ this.$a("In The Chrome Store", this.strings.chrome) }
    </artice>
  </section>
`}