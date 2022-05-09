// autobop.js | automatically bopping!

module.exports = App => {

	App.Bop = function () {
		if (this.autobop) clearTimeout(this.autobop)
		if (!this.config.auto_b) return false
		// manually click the button after delay
		const press = () => click(".awesome-button")
		const delay = Math.floor((Math.random() * 7) * 100)
		this.Log(`[autobop] in ${ delay / 100 } seconds`)
		this.autobop = setTimeout(press, delay)
	}

	App.bindBop = function () {
		this.Bop()
		this.Bind("newsong", this.Bop)
	}

}

const click = el => {
  $(window).focus()
  const opts = { bubbles: true, cancelable: true, view: window }
  const elem = document.querySelectorAll(el)[0]
  const fire = new MouseEvent("click", opts)
  return !elem.dispatchEvent(fire)
}