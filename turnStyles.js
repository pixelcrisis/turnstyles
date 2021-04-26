// turnStyles.js 
// by pixelcrisis

const tS = {} // define our object

// import our utilities
require('./script/config.js')(tS)
require('./script/events.js')(tS)
require('./script/room.js')(tS)
require('./script/cache.js')(tS)
require('./script/attach.js')(tS)
require('./script/storage.js')(tS)
require('./script/logging.js')(tS)
require('./script/suspend.js')(tS)
require('./script/heartbeat.js')(tS)

// attach our hotbar 
require('./script/hotbar.js')(tS)

// import our UI features
require('./script/themes.js')(tS)
require('./script/modify.js')(tS)
require('./script/volume.js')(tS)

// import functionalities
require('./script/afk.js')(tS)
require('./script/stats.js')(tS)
require('./script/nextdj.js')(tS)
require('./script/notify.js')(tS)
require('./script/alerts.js')(tS)
require('./script/autobop.js')(tS)
require('./script/reminder.js')(tS)

window.$tS = tS
window.$tS.init() // attach.js