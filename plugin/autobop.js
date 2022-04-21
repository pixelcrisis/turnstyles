// autobop.js | automatically bopping!

module.exports = App => {

	App.autoBop = function () {
		if (this.bop) clearTimeout(this.bop)
		if (!this.config.auto_b) return false
		// manually click the button after delay
		const press = () => click(".awesome-button")
		const delay = Math.floor((Math.random() * 7) * 100)
		this.Log(`[autobop] in ${ delay / 100 } seconds`)
		this.bop = setTimeout(press, delay)
	}

	App.bindAutobop = function () {
		this.autoBop()
		this.Bind("newsong", this.autoBop)
	}

}

const click = el => {
  $(window).focus()
  const opts = { bubbles: true, cancelable: true, view: window }
  const elem = document.querySelectorAll(el)[0]
  const fire = new MouseEvent("click", opts)
  return !elem.dispatchEvent(fire)
}