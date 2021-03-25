// old bookmarklet support
let s = document.createElement("script")
s.src = "https://ts.pixelcrisis.co/dist/turnStyles.js?" + Math.random()
s.type = "text/javascript"
document.body.appendChild(s)

setTimeout(() => {
  let head = `Alert!`
  let link = `<a href="https://ts.pixelcrisis.co" target="blank">here</a>`
  let text = `Your bookmarklet is out of date, please update ${link}.`
  window.$tS.sendToChat(head, text, 'action')
}, 5 * 1000)