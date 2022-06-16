// import our panel supports
import Panels from "./panels.js"
import Inputs from "./inputs.js"
import Hotbar from "./hotbar.js"
import Tabbed from "./tabbed.js" // imports tabs
import Window from "./window.js"

export default App => {
  App.addPlugin(Panels)
  App.addPlugin(Inputs)
  App.addPlugin(Hotbar)
  App.addPlugin(Tabbed)
  App.addPlugin(Window)
}