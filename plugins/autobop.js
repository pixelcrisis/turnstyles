// autobop.js | automatically bopping!

module.exports = App => {

	App.autoBop = function () {
		if (this.bop) clearTimeout(this.bop)
		if (!this.config.auto_b) return

		const delay = (Math.random() * 7) * 100
		const press = () => click(".awesome-button")
		this.bop = setTimeout(press, delay)
	}

	App.on("newsong", App.autoBop)

}

const click = el => {
  $(window).focus()
  const opts = { bubbles: true, cancelable: true, view: window }
  const elem = document.querySelectorAll(el)[0]
  const fire = new MouseEvent("click", opts)
  return !elem.dispatchEvent(fire)
}