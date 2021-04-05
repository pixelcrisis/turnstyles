// turnStyles.js 
// by pixelcrisis

const tS = {} // define our object

// import our utilities
require('./scripts/_tools.js')(tS)
require('./scripts/events.js')(tS)
require('./scripts/config.js')(tS)
require('./scripts/cached.js')(tS)
require('./scripts/attach.js')(tS)

// attach our options window
require('./scripts/window.js')(tS)

// import our UI features
require('./scripts/themes.js')(tS)
require('./scripts/modify.js')(tS)
require('./scripts/volume.js')(tS)

// import functionalities
require('./scripts/bopper.js')(tS)
require('./scripts/nextdj.js')(tS)
require('./scripts/notify.js')(tS)
require('./scripts/alerts.js')(tS)

window.$tS = tS
window.$tS.init() // attach.js