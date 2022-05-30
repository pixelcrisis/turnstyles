module.exports = TS => {

  // import our config
  TS.default = require("./confs/default.json")
  TS.options = require("./confs/options.json")
  // and our other jsons
  TS.static = require("./confs/static.json")
  TS.patrons = require("./confs/patrons.json")
  // convert some to maps
  const emoji = require("./confs/emoji.json")
  TS.twitchMap = new Map(emoji.twitch)
  TS.bttvMap = new Map(emoji.bttv)

  // import our core scripts
  require("./utility.js")(TS)
  require("./theming.js")(TS)
  require("./storage.js")(TS)
  require("./backups.js")(TS)
  require("./migrate.js")(TS)

  // import our panel scripts
  require("./panel/panel.js")(TS)
  require("./panel/inputs.js")(TS)
  require("./panel/hotbar.js")(TS)
  require("./panel/tabbed.js")(TS)
  require("./panel/window.js")(TS)

}