export default function () { return `
  <section>
    <article>
      ${ this.$bool("Print Debug Logs In Console", "debug") }
      <p>The output of turnStyles will be printed into the browser dev console. Helpful for finding out why things aren't working.</p>
    </article>

    <article>
      ${ this.$bool("Show Logbook In Room Tab", "show.logger") }
      <p>This adds a running log of what's happened in your room and with turnStyles, printed neatly in the Room Tab.</p>
    </article>

    <article class="ts-help">
      <strong>Reload turnStyles</strong>
      <p>Removes turnStyles from the room and re-injects it. Useful for updating a bookmarklet or debugging.</p>
      ${ this.$btn("Reload turnStyles", 0, "reload") }
      <p>Reset chat/queue tabs to default sizes.</p>
      ${ this.$btn("Reset Tab Sizes", 0, "reloadTabs") }
    </article>

    <article class="ts-help">
      <strong>Reload Music Players</strong>
      <p>Disables and Re-Enabled the music players in an attempt to unstick them when broken.</p>
      ${ this.$btn("Reload Players", 0, "reloadMusic") }
    </article>
  </section>

  <section>
    <article class="ts-data ts-help">
      <strong>turnStyles Data</strong>
      <p>If something goes wrong or you need to start over, you can reset/restore/backup your data here!</p><br>
      ${ this.$btn("Backup Data", 0, "backupData") }
      <label id="tsBackup" class="ts-button">
        <input type="file"> Restore Data
      </label><br>
      ${ this.$btn("Reset To Default", 0, "resetData") }
      ${ this.$btn("Delete All Data", 0, "deleteData") }
    </article>

    <article class="ts-help">
      <strong>On Discord</strong>
      <p>You can find the author (and other active users) in the discords below.</p>
      ${ this.$a("turnStyles Discord", this.strings.tsDiscord) }
      ${ this.$a("turntable.fm Discord", this.strings.ttDiscord) }
    </article>
  </section>
`}