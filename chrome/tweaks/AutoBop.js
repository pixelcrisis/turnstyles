const AutoBop = () => {
  window.bopper = setInterval(Bop, 5000)  
  console.info(`turnstyles :: loaded autobop`)
}

const Bop = () => {
  if (!window.autobop) return false

  let options = { bubbles: true, cancelable: true, view: window }

  // make sure the button exists and isn't already pressed
  let awesome = document.getElementsByClassName('awesome-button')[0]
  if (!awesome || awesome.classList.contains('selected')) return

  // make sure that there's a song playing
  let playing = document.getElementsByClassName('room-view-board')[0]
  if (!playing || !playing.classList.contains('song-playing')) return

  console.info(`turnstyles :: fired autobop`)
  let clicked = new MouseEvent('click', options)
  return !awesome.dispatchEvent(clicked)
}

AutoBop()