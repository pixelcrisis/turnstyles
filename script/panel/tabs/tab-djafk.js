export default function () { return `
  <section>
    <article class="ts-help">
      ${ this.$bool("Enable Next DJ", "dj.next") }
      <p>Auto jump up after the next DJ drops!</p>
    </article>

    <article class="ts-help">
      ${ this.$bool("Escort After Next", "dj.done") }
      <p>Auto jump down after your next track!</p>
    </article>
    
    <article class="ts-help">
      ${ this.$bool("Enable AutoQueue", "dj.auto") }
      <p>Jump on deck when pinged by a bot!</p>
      ${ this.$str("Save Queue Ping", "dj.text") }
    </article>
  </section>

  <section>
    <article class="ts-help">
      <strong>AFK Response</strong>
      <p>The message sent when Currently AFK or pinged while AFK.</p>
      ${ this.$str("Save AFK Response", "afk.text") }
    </article>

    <article class="ts-help">
      <strong>AFK Timer:</strong> 
      ${ this.$list("afk.auto", "times") }
      <p>Marks you AFK automatically based on your chat activity!</p>
    </article>

    <article>
      ${ this.$bool("Currently AFK", "afk.idle") }
      <p>When enabled, sends your AFK Response to the room chat, and again if you're pinged when away!
    </article>
  </section>
`}