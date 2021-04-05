// bopper.js | autobop - always boppin

module.exports = tS => {

  tS.autoBop = function () {
    if (this.bopping) clearTimeout(this.bopping)
    if (!this.config.autobop) return

    let delay = (Math.random() * 7) * 100
    this.bopping = setTimeout(bop, delay)
  }

  tS.on('attach',  tS.autoBop)
  tS.on('newsong', tS.autoBop)

}

const bop = () => {
  $(window).focus()
  let opts = { bubbles: true, cancelable: true, view: window }
  let elem = document.querySelectorAll('.awesome-button')[0]
  let fire = new MouseEvent('click', opts)
  return !elem.dispatchEvent(fire)
}