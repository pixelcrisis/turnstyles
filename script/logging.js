// logging.js | print logs in console and room

module.exports = tS => {

  tS.Log = function tsLog (str) {
    let date = new Date()
    let time = `[${date.toLocaleTimeString('en-us')}]`

    console.info(`${time} turnStyles :: ${str}`)
    this.logBook.push(`[tS] ${time} <span>${str}</span>`)

    this.Logged()
  }

  // update the logbook 
  // printed in room tab
  tS.Logged = function updateLogBook () {
    if (this.logBook.length > 50) this.logBook.shift()

    let logger = $('#ts_logs')[0]
    if (!logger) return

    logger.innerHTML = this.logBook.join('<br>')
    logger.scrollTop = logger.scrollHeight
  }

  tS.logBook = []

}