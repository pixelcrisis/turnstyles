const addTweaks = () => {
  // add the autobop loop
  window.bopper = setInterval(AutoBop, 5000)
  // add our dark mode
  DarkMode()
}

addTweaks()