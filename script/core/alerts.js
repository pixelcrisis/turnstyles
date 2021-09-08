// alerts.js | sending data to chat/notifications

module.exports = app => {

  const Alerts = {
    speak: {
      conf: 'ping_chat',
      case: '$ping',
      head: '[$room] @$name'
    },
    pmmed: {
      conf: 'ping_pm',
      head: 'New PM from: $from'
    },
    snagged: {
      conf: 'chat_snag',
      head: '$whom',
      body: 'has snagged this track!',
      post: true
    },
    registered: {
      conf: 'chat_join',
      head: '$user',
      body: 'joined.',
      post: true
    },
    deregistered: {
      conf: 'chat_left',
      head: '$user',
      body: 'left.',
      post: true
    }
  }

  // simple parser to replace default alert text
  app.Parse = function (str, e) {
    let users = [] // collect arrays of user names if exist
    for (let user of e.user) if (user.name) users.push(user.name)
    str = str.split('$whom').join(e.$name || 'Someone')
    str = str.split('$from').join(e.$from || 'Someone')
    str = str.split('$name').join(e.name || 'Someone')
    str = str.split('$room').join(this.$Room().name)
    str = str.split('$user').join(users.join(', '))
    return str
  }

  // bind our alerts to their events 
  app.on('attach', function bindAlerts () {
    // loop through our alerts
    for (let event in Alerts) {
      let data = Alerts[event]
      // bind our alert to the event
      app.on(event, function (e) {
        // check our alert conditions
        if (!this.config[data.conf]) return
        if (data.case && !e[data.case]) return
        // parse the alert text
        let head = this.Parse(data.head, e)
        let body = data.body ? this.Parse(data.body, e) : e.text
        // post or send notification
        if (!data.post) this.Notify({ head, body, type: data.conf })
        else this.Post({ head, body })
      })
    }
  })

  // bind our "hot word" notifications
  app.on('speak', function matchAlert (e) {
    let list = this.config.hot_words.split(',')
    // fake "mention" on hot word match
    for (let word of list) {
      // compare hot word to sent text
      let text = e.text.toLowerCase()
      if (text.indexOf(word.trim().toLowerCase()) > -1) {
        // add mention styling and send notification
        $('.messages .message:last-child').addClass('mention')
        return this.Notify({ 
          head: `[${this.$Room()}] Match: ${word}`,
          body: e.text, type: 'matched' 
        })
      }
    }
  })

}