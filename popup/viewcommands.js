
const setCommands = () => {
  chrome.storage.sync.get(['commands'], ({ commands }) => {
    
    let commandContainer = document.getElementById('commands-container')
    
    commandContainer.innerHTML = Object.entries(commands).map(([key, cmd]) => (
      `<div class="command-item-container">
        <button class="command-item-button">
          <div>
            ${cmd.alias}
          </div>
          <div>
            ${cmd.actions.length} actions
          </div>
        </button>
      </div>`
    )).join('')
    let commandItemButtons = document.getElementsByClassName('command-item-button')
    Array.prototype.forEach.call(commandItemButtons, cib => {
      cib.onclick = () => console.log('clicked!')
    })
  })
}

window.onload = () => {
  setCommands()
}
