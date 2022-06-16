import Visual from "./visual.js"
import Player from "./player.js"
import Volume from "./volume.js"
import Notify from "./notify.js"
import Idling from "./idling.js"
import Repeat from "./repeat.js"
import OnDeck from "./ondeck.js"
import Emojis from "./emojis.js"
import Hinted from "./hinted.js"
import Patron from "./patron.js"
import Detail from "./detail.js"
import Logger from "./logger.js"
import InChat from "./inchat.js"
import InSong from "./insong.js"

export default App => {
  App.addPlugin(Visual)
  App.addPlugin(Player)
  App.addPlugin(Volume)
  App.addPlugin(Notify)
  App.addPlugin(Idling)
  App.addPlugin(Repeat)
  App.addPlugin(OnDeck)
  App.addPlugin(Emojis)
  App.addPlugin(Hinted)
  App.addPlugin(Patron)
  App.addPlugin(Detail)
  App.addPlugin(Logger)
  App.addPlugin(InChat)
  App.addPlugin(InSong)
}