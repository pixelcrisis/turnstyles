export default function () { return `
  <section>
    <article class="ts-help">
      ${ this.$bool("Enable QuickText 1", "hb.qtbtn1") }
      <p>Send messages with HotBar buttons!</p>
      ${ this.$str("Save QuickText 1", "qtbtn1") }
    </article>

    <article class="ts-help">
      ${ this.$bool("Enable QuickText 2", "hb.qtbtn2") }
      <p>Prefixing with <strong>||</strong> adds a label!</p>
      ${ this.$str("Save QuickText 2", "qtbtn2") }
    </article>

    <article class="ts-help">
      ${ this.$bool("Enable QuickText 3", "hb.qtbtn3") }
      <p>Use <strong>;;</strong> to send up to three messages!</p>
      ${ this.$str("Save QuickText 3", "qtbtn3") }
    </article>
  </section>
  <section>
    <article>
      ${ this.$bool("AFK Button", "hb.afk.idle") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this.$bool("Autobop Button", "hb.autobop") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this.$bool("AutoQueue Button", "hb.dj.auto") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this.$bool("Next DJ Button", "hb.dj.next") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this.$bool("Escort Button", "hb.dj.done") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this.$bool("Chat Bubble Toggle", "hb.bubble") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this.$bool("Audience Toggle", "hb.people") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this.$bool("Player Toggle", "hb.player") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this.$bool("Share turnStyles", "hb.share") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
  </section>
`}