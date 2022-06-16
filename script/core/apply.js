// start by grabbing our confs
import details from "../../package.json"
import configs from "../conf/default.json"
import options from "../conf/options.json"
import patrons from "../conf/patrons.json"
import strings from "../conf/strings.json"
import emojids from "../conf/emojids.json"

// and our other core files
import Utility from "./utility.js"
import Theming from "./theming.js"

export default App => {
  // apply our confs
  App.default = configs
  App.version = details.version
  App.bttvMap = new Map(emojids.bttv)
  App.twitMap = new Map(emojids.twit)
  const tools = { options, patrons, strings }
  App.addPlugin({ tools })

  // and apply our core files
  App.addPlugin(Utility)
  App.addPlugin(Theming)
}