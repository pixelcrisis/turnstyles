let turnStyles = window.$tS = {}
// a thing by pixelcrisis

require('./data/config.js')(turnStyles)

require('./core/global.js')(turnStyles)
require('./core/layout.js')(turnStyles)
require('./core/ttlink.js')(turnStyles)
require('./core/events.js')(turnStyles)
require('./core/logger.js')(turnStyles)
require('./core/timing.js')(turnStyles)
require('./core/notify.js')(turnStyles)

require('./data/session.js')(turnStyles)
require('./data/storage.js')(turnStyles)
require('./data/updates.js')(turnStyles)
require('./data/backups.js')(turnStyles)

require('./main/themes.js')(turnStyles)
require('./main/volume.js')(turnStyles)
require('./main/profile.js')(turnStyles)
require('./main/chatbox.js')(turnStyles)
require('./main/playlist.js')(turnStyles)

require('./core/panels.js')(turnStyles)
require('./core/attach.js')(turnStyles)

require('./main/afk.js')(turnStyles)
require('./main/auto.js')(turnStyles)
require('./main/stats.js')(turnStyles)
require('./main/alerts.js')(turnStyles)

// attach to the room
turnStyles.attach()