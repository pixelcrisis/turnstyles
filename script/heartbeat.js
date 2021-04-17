// heartbeat.js | internal loop that fires once per minute

module.exports = tS => {

  // emit 'heartbeat' event
  // with how many minutes passed
  tS.beat = function heartbeat () {
    this.config.beats = parseInt(this.config.beats) + 1
    this.emit('heartbeat', this.config.beats)
  }

  // bind the heartbeat interval on attach
  tS.on('attach', function startHeart () {
    this.heart = setInterval(tS.beat.bind(this), 60 * 1000)
  })

}