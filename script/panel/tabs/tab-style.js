export default function () { return `
  <section>
    <article class="ts-help">
      ${ this.$list("theme") }
      <p>Changes the overall appearance of turntable.</p>
    </article>
  </section>

  <section>
    <article class="ts-help">
      ${ this.$list("color") }
      <p>Changes just the gold/accent color of turntable.</p>
    </article>
  </section>

  <section class="small"><article>
    ${ this.$bool("Hide Chat Bubbles", "hide.bubble") }
    <p>Toggles speech bubbles from the audience.</p>
  </article></section>

  <section class="small"><article>
    ${ this.$bool("Hide Room Audience", "hide.people") }
    <p>Toggles the avatars on the room floor.</p>
  </article></section>
  
  <section class="small"><article>
    ${ this.$bool("Hide Video Player", "hide.player") }
    <p>Toggles the video player in the background.</p>
  </article></section>

  <section class="full">
    <article class="ts-help">
      <strong>Custom CSS</strong>
      <p>Want to add your own tweaks? Add any CSS snippet here and turnStyles will inject it into turntable for you!</p>
      ${ this.$text("Save & Apply Styles", "style") }
    </article>
  </section>`
}