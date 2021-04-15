// turnStyles.js 
// by pixelcrisis

const tS = {} // define our object

// import our utilities
require('./script/_tools.js')(tS)
require('./script/events.js')(tS)
require('./script/config.js')(tS)
require('./script/cached.js')(tS)
require('./script/attach.js')(tS)

// attach our options window
require('./script/window.js')(tS)

// import our UI features
require('./script/themes.js')(tS)
require('./script/modify.js')(tS)
require('./script/volume.js')(tS)

// import functionalities
require('./script/bopper.js')(tS)
require('./script/nextdj.js')(tS)
require('./script/notify.js')(tS)
require('./script/alerts.js')(tS)

window.$tS = tS
window.$tS.init() // attach.js