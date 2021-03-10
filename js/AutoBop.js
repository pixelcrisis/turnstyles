const AutoBop = () => {
  let options = { bubbles: true, cancelable: true, view: window }
  let awesome = document.getElementsByClassName('awesome-button')[0]
  if (awesome.classList.contains('selected')) return

  let clicked = new MouseEvent('click', options)
  return !awesome.dispatchEvent(clicked)
}