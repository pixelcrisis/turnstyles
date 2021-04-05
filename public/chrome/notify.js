chrome.runtime.onMessage.addListener(data => {
  if (data.type != "tsNotify" || !data.notification) return
  chrome.notifications.create('', {
    type: "basic",
    title: data.notification.head,
    message: data.notification.text,
    iconUrl: "/images/icon128.png"
  })
})