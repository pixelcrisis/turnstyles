// autobop.js | always boppin

module.exports = tS => {

  // fire our autobop at a random interval
  tS.autoBop = function autoBop () {
    if (this.bopping) clearTimeout(this.bopping)
    if (!this.config.autobop) return

    let delay = (Math.random() * 7) * 100
    this.bopping = setTimeout(bop, delay)
  }

  // fire autobop on load, new song
  tS.on('attach',  tS.autoBop)
  tS.on('newsong', tS.autoBop)

}

// "click" the awesome button
const bop = () => {
  $(window).focus()
  let opts = { bubbles: true, cancelable: true, view: window }
  let elem = document.querySelectorAll('.awesome-button')[0]
  let fire = new MouseEvent('click', opts)
  return !elem.dispatchEvent(fire)
}