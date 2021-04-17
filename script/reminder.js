// reminder.js | send out a configurable reminder

module.exports = tS => {

  tS.on('heartbeat', function sendReminder (min) {
    let text = this.config.reminder
    let freq = parseInt(this.config.remind)

    // min divisible by freq (eg 120 every 60)
    if ((min % freq) === 0 && text) this.speak(text)
  })

}