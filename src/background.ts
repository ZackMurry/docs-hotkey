import log from './util/logger'

log('Background script loaded')
chrome.commands.onCommand.addListener(command => {
  log(command)
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { command }, res => {
        log(res)
      })
    }
  })
})

export {}
