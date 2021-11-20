// alerts.js | sending data to chat/notifications

module.exports = app => {

  // notify on new PMs
  app.on('pmmed', function notifyPMs (e) {
    if (this.config.ping_pm) this.Notify({
      head: `New PM ${e.$from ? `from: ${e.$from}` : ''}`,
      body: e.text,
      type: 'pm_ping'
    })
  })

  // notify on new mentions
  app.on('speak', function notifyMentions (e) {
    if (this.config.ping_chat && e.$ping) this.Notify({
      head: `[${this.view().roomData.name}] @${e.name}`,
      body: e.text,
      type: 'chat_ping'
    })
  })

  // alert on snags
  app.on('snagged', function alertSnags (e) {
    if (this.config.chat_snag) this.Post({
      head: e.$name,
      body: `has snagged this track!`,
      type: 'snag'
    })
  })

  // alert on joins
  app.on('registered', function alertJoined (e) {
    if (this.config.chat_join) for (let user of e.user) this.Post({
      head: user.name,
      body: 'joined.',
      type: 'join'
    })
  })

  // alert on leave
  app.on('deregistered', function alertLeft (e) {
    if (this.config.chat_left) for (let user of e.user) this.Post({
      head: user.name,
      body: 'left.',
      type: 'left'
    })
  })

}