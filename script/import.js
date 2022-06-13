import details from "../package.json"
import configs from "./conf/default.json"
import options from "./conf/options.json"
import patrons from "./conf/patrons.json"
import strings from "./conf/strings.json"
import emoji from "./conf/emoji.json"

import apply_tools from "./core/tools.js"
import apply_theme from "./core/theme.js"
import apply_store from "./core/store.js"
import apply_panel from "./core/panel.js"

const import_core = app => {
  app.default = configs
  app.version = details.version
  app.bttvMap = new Map(emoji.bttv)
  app.twitMap = new Map(emoji.twit)
  Object.assign(app, { options, patrons, strings })

  apply_tools(app)
  apply_theme(app)
  apply_store(app)
  apply_panel(app)
}

import apply_ui from "./plugin/ui.js"
import apply_play from "./plugin/play.js"
import apply_sound from "./plugin/sound.js"
import apply_alert from "./plugin/alert.js"
import apply_idle from "./plugin/idle.js"
import apply_auto from "./plugin/auto.js"
import apply_jump from "./plugin/jump.js"
import apply_emoji from "./plugin/emoji.js"
import apply_guess from "./plugin/guess.js"
import apply_patron from "./plugin/patron.js"
import apply_stats from "./plugin/stats.js"
import apply_logs from "./plugin/logs.js"
import apply_chat from "./plugin/chat.js"
import apply_song from "./plugin/song.js"

const import_plugin = app => {
  apply_ui(app)
  apply_play(app)
  apply_sound(app)
  apply_alert(app)
  apply_idle(app)
  apply_auto(app)
  apply_jump(app)
  apply_emoji(app)
  apply_guess(app)
  apply_patron(app)
  apply_stats(app)
  apply_logs(app)
  apply_chat(app)
  apply_song(app)
}

export default app => {
  import_core(app)
  import_plugin(app)
}