let turnStyles = {}
// a thing by pixelcrisis

require('./script/utils/ttdata.js')(turnStyles)
require('./script/utils/events.js')(turnStyles)
require('./script/utils/logger.js')(turnStyles)
require('./script/utils/timing.js')(turnStyles)
require('./script/utils/notify.js')(turnStyles)

require('./script/state/config.js')(turnStyles)
require('./script/state/session.js')(turnStyles)
require('./script/state/storage.js')(turnStyles)

require('./script/core/themes.js')(turnStyles)
require('./script/core/volume.js')(turnStyles)
require('./script/core/profile.js')(turnStyles)
require('./script/core/playlist.js')(turnStyles)

require('./script/core/panels.js')(turnStyles)
require('./script/core/attach.js')(turnStyles)

require('./script/main/afk.js')(turnStyles)
require('./script/main/auto.js')(turnStyles)
require('./script/main/stats.js')(turnStyles)

// attach to the room
turnStyles.attach()