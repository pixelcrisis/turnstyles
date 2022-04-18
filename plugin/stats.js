// stats.js | tracking and posting song/dj stats

module.exports = App => {

  App.songStats = function (stat) {
    let last = this.last_played
    if (this.config.alerts.song && stat) this.Post({
      head: stat,
      body: `${last.song} by ${last.artist}`,
      type: "stat"
    })
  }

  App.djStats = function (name, stat) {
    if (this.config.alerts.spun) this.Post({
      head: `${name} - ${stat}`,
      body: ` - is done spinning!`,
      type: "stat"
    })
  }

  App.userStats = function (id) {  
    if ($(".profile.modal .statslink").length) return
    // force the web links section to be visible
    $(".profile.modal .section.web-links").show()
    $(".profile.modal .website").append(statLink(id))
  }

  App.bindStats = function () {
    this.Bind("tracked", this.songStats)
    this.Bind("dropped", this.djStats)
    this.Bind("profile", this.userStats)
  }

}

const statLink = id => `
  <a target="_blank" class="statslink" onclick="$('.modal .close-x')[0].click()"
    href="https://thompsn.com/turntable/leaderboard/thing/?id=${ id }">
    Leaderboard
  </a>
`