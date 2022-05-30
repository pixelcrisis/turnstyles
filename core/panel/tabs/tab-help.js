module.exports = function () { return `
  <section>
    <article>
      ${ this._bool_("debug", "Print Logs In Console") }
      <p>The output of turnStyles will be printed into the dev console of your browser. This is useful for finding out why things aren't working.</p>
    </article>
    <article>
      ${ this._bool_("show.logger", "Show Logbook In Room Tab") }
      <p>This adds a running log of what's happened in your room and with turnStyles, printed neatly in the Room Tab.</p>
    </article>
    <p></p>
    <article class="ts-help">
      <strong>Reload turnStyles</strong>
      <p>Removes turnStyles from the room and re-injects it. Useful for debugging or updating a bookmarklet.</p>
      ${ this._btn_("Reload turnStyles", 0, 0, "Reload") }
    </article>
    <article class="ts-help">
      <strong>Reload Music Players</strong>
      <p>Disables and Re-Enables the music players in an attempt to unstick them when broken.</p>
      ${ this._btn_("Reload Players", 0, 0, "reloadMusic") }
    </article>
  </section>
  <section>
    <article class="ts-data ts-help">
      <strong>turnStyles Data</strong>
      <p>If something goes wrong or you need to start over, you can reset/restore/backup your data here!</p><br>
      ${ this._btn_("Backup Data", 0, 0, "backupData") }
      <label id="tsBackup" class="ts-button">
        <input type="file"> Restore Data
      </label><br>
      ${ this._btn_("Reset To Default", 0, 0, "resetData") }
      ${ this._btn_("Delete All Data", 0, 0, "deleteData") }
    </article>
    <article class="ts-help">
      <strong>On Discord</strong>
      <p>You can find the author and active users in the below discords.</p>
      ${ this._a_("turnStyles Discord", this.static.tsDiscord) }
      ${ this._a_("turntable.fm Discord", this.static.ttDiscord) }
    </article>
  </section>`
}