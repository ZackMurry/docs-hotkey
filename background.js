document.addEventListener('click', e => {
  console.log('clicked!')
})
console.log('activated')

chrome.runtime.onInstalled.addListener(() => {
  console.log('the sky is blue!!!')
})

chrome.commands.onCommand.addListener(command => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { command }, res => {
      console.log(res)
    })
  })
})
