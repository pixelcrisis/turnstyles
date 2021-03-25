// autobop.js | always boppin

module.exports = tS => {

  // called on load, new song
  tS.prototype.runAutobop = function () {
    if (this.autobop) clearTimeout(this.autobop)
    if (!this.config.autobop) return

    const bop = () => this.click('.awesome-button')
    let delay = (Math.random() * 7) * 100
    
    this.autobop = setTimeout(bop.bind(this), delay)
  }

}