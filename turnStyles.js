const tS = function () {
	this.loadConfig()
	this.loadThemes()
	this.attachRoom()
}

require('./scripts/_utils.js')(tS)
require('./scripts/config.js')(tS)
require('./scripts/cache.js')(tS)
require('./scripts/events.js')(tS)

require('./scripts/themes.js')(tS)

require('./scripts/attach.js')(tS)
require('./scripts/layout.js')(tS)
require('./scripts/volume.js')(tS)

require('./scripts/autobop.js')(tS)
require('./scripts/nextdj.js')(tS)
require('./scripts/notify.js')(tS)

window.$tS = new tS()