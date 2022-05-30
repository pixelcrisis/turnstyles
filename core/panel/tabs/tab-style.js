module.exports = function () { return `
  <section>
    <article class="ts-help">
      ${ this._list_("theme") }
      <p>Changes the overall appearance of turntable.</p>
    </article>
  </section>
  <section>
    <article class="ts-help">
      ${ this._list_("color") }
      <p>Changes just the gold/accent color of turntable.</p>
    </article>
  </section>
  <section class="full">
    <article class="ts-help">
      <strong>Custom CSS</strong>
      <p>Want to add your own tweaks? Add any CSS snippet here and turnStyles will inject it into turntable for you!</p>
      ${ this._text_("style", "Save & Apply Styles") }
    </article>
  </section>`
}