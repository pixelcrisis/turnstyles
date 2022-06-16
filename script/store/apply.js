// import our storage files
import Storage from "./storage.js"
import Backups from "./backups.js"
import Migrate from "./migrate.js"

export default App => {
  App.addPlugin(Storage)
  App.addPlugin(Backups)
  App.addPlugin(Migrate)
}