module.exports = function () { return `
  <section>
    <article class="ts-help">
      ${ this._bool_("hb.qtbtn1", "Enable QuickText 1") }
      <p>Send messages with HotBar buttons!</p>
      ${ this._str_("qtbtn1", "Save QuickText 1") }
    </article>
    <article class="ts-help">
      ${ this._bool_("hb.qtbtn2", "Enable QuickText 2") }
      <p>Prefixing with <strong>||</strong> adds a label!</p>
      ${ this._str_("qtbtn2", "Save QuickText 2") }
    </article>
    <article class="ts-help">
      ${ this._bool_("hb.qtbtn3", "Enable QuickText 3") }
      <p>Use <strong>;;</strong> to send up to three messages!</p>
      ${ this._str_("qtbtn3", "Save QuickText 3") }
    </article>
  </section>
  <section>
    <article>
      ${ this._bool_("hb.afk.idle", "AFK Button") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.autobop", "Autobop Button") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.dj.auto", "AutoQueue Button") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.dj.next", "Next DJ Button") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.dj.done", "Escort Button") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.bubble", "Chat Bubble Toggle") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.people", "Audience Toggle") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.player", "Player Toggle") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.share", "Share turnStyles") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
  </section>`
}