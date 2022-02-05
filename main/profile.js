// profile.js | modifying the user profile

module.exports = app => {

  // add ttstats link to user profiles
  app.linkUserStats = function (id) {  
    if ($('.profile.modal .statslink').length) return
    // force the web links section to be visible
    $('.profile.modal .section.web-links').show()
    $('.profile.modal .website').append(this.$_userLink(id))
  }

  app.on('profile', app.linkUserStats)

}