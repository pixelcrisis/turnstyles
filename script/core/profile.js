// profile.js | modifying the user profile

module.exports = app => {

  // add ttstats link to user profiles
  app.on('profile', function linkUserStats(id) {
    if ($('.profile.modal .statslink').length) return
    // force the web links section to be visible
    $('.profile.modal .section.web-links').show()
    $('.profile.modal .website').append(`
      <a target="_blank"
        class="statslink"
        onclick="$('.modal .close-x')[0].click()"
        href="https://thompsn.com/turntable/leaderboard/thing/?id=${id}">
        Leaderboard
      </a>
    `)
  })

}