export default function () { return `
  <section>
    <article class="ts-help">
      <strong>Desktop Notifications</strong>
      <p>Sends a Desktop Notification when you aren't looking at turntable, and one of the selected events occurs.</p>
      ${ this.$bool("On New PMs", "on.pm") }
      ${ this.$bool("On Mentions", "on.mention") }
      ${ this.$bool("On New Songs", "on.song") }
    </article>

    <article class="ts-help">
      <strong>Hot Words</strong>
      <p>Mention/Notify on word/phrase match in chat. Use multiple words and phrases in a comma separated list.</p>
      ${ this.$str("Save Hot Words", "on.text") }
    </article>
  </section>

  <section>
    <article class="ts-help">
      <strong>Alerts In Chat</strong>
      <p>These are posted in chat as a fake message, only visible to you. Meant to keep you up to date on the room.</p>
      ${ this.$bool("On User Join", "post.join") }
      ${ this.$bool("On User Leave", "post.left") }
      ${ this.$bool("On Song Snags", "post.snag") }
      ${ this.$bool("Last Song Stats", "post.song") }
      ${ this.$bool("Last DJ's Stats", "post.spun") }
    </article>

    <article class="ts-help">
      ${ this.$bool("Enable Hot Word Exact Match", "on.exact") }
      <p>Enabled: "heyy" will not trigger "hey".</p>
      <p>Disabled: "heyy" will trigger "hey".</p>
    </article>
  </section>
`}