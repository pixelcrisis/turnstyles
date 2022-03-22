// quicktext.js | sending rapid messages

module.exports = App => {

	App.qtbtns = function (i) {
		let text = this.config.qtbtns[`qtbtn${ i }`]
		if (!text) return

		// remove the label
		if (text.indexOf("||") > -1) text = text.split("||")[1].trim()
		this.Batch(text)
	}

	// easy inline onlick access
	App.qtbtn1 = function () { this.qtbtns('1') }
	App.qtbtn2 = function () { this.qtbtns('2') }
	App.qtbtn3 = function () { this.qtbtns('3') }

}