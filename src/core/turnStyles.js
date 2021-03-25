// turnStyles

const tS = function () {
	this.loadConfig()
	this.loadThemes()
	this.attachRoom()
}

require('./_utils.js')(tS)
require('./config.js')(tS)
require('./events.js')(tS)

require('./themes.js')(tS)

require('./attach.js')(tS)
require('./layout.js')(tS)
require('./volume.js')(tS)

require('./autobop.js')(tS)
require('./nextdj.js')(tS)
require('./notify.js')(tS)

window.$ts = new tS()