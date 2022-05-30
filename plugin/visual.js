module.exports = TS => {

  TS.$on("user", function (event) {
    if ($(".profile.modal .statslink").length) return
    // force web links section to be visibe
    $(".profile.modal .section.web-links").show()
    $(".profile.modal .website").append( STAT_LINK(event.userid) )
  })

  TS.$on("loaded", function (config) {
    this.$body("ts-logger", config["show.logger"])
    this.$body("ts-no-bub", config["hide.bubble"])
    this.$body("ts-no-ppl", config["hide.people"])
    this.$body("ts-no-vid", config["hide.player"])
  })

  TS.$on("update", function (key, val) {
    if (key == "show.logger") this.$body("ts-logger", val)
    if (key == "hide.bubble") this.$body("ts-no-bub", val)
    if (key == "hide.player") this.$body("ts-no-vid", val)
    if (key == "hide.people") this.$body("ts-no-ppl", val)
  })

}

const STAT_LINK = id => `
  <a target="_blank" class="statslink" onclick="$('.modal .close-x')[0].click()"
    href="https://thompsn.com/turntable/leaderboard/thing/?id=${ id }">
    Leaderboard
  </a>
`