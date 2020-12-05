let commands = {}

const updateCommands = () => {
  chrome.storage.sync.get(['commands'], result => {
    console.log('commands: ' + JSON.stringify(result.commands))
    commands = result.commands
  })
}

updateCommands()

let extCommands
chrome.commands.getAll(cmds => {
  extCommands = cmds
})

const escapeHtml = unsafe => (
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
)

const unescapeHtml = safe => (
  safe
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, '\'')
)

const mapActionAbbrToFull = abbr => {
  const map = {
    'b': 'Bold',
    'u': 'Underline',
    'h': 'Highlight',
    'i': 'Italicize'
  }
  return map[abbr] ?? 'Action not found'
}

const deleteCommand = internalName => {
  commands[internalName] = undefined
  console.log(commands)
  chrome.storage.sync.set({
    commands
  }, () => {
    console.log('values set')
    window.location.reload()
  })
}

/**
 * 
 * @param {MouseEvent} e 
 */
const viewCommand = e => {
  // getting the alias from the command clicked
  const commandAlias = unescapeHtml(e.composedPath()[0].children[0].innerHTML ?? '')
  console.log(commandAlias)
  if (!commandAlias) {
    return
  }

  // clear the content on the page
  document.getElementById('main-content').remove()
  let content = document.createElement('div')
  content.setAttribute('id', 'main-content')
  
  let fullCmd
  let cmdInternalName
  for (const [intName, cmd] of Object.entries(commands)) {
    console.log(cmd)
    if (cmd.alias === commandAlias) {
      fullCmd = commands[intName]
      console.log(fullCmd)
      cmdInternalName = intName
    }
  }
  console.log(fullCmd.actions.join(''))
  if (!fullCmd) {
    return
  }

  let shortcut
  for (let cmd of extCommands) {
    if (cmd.name === cmdInternalName) {
      shortcut = cmd.shortcut
      break
    }
  }
  if (shortcut === null) {
    console.log(extCommands)
    console.warn(`shortcut for ${cmdInternalName} not found`)
  }

  if (shortcut === '') {
    shortcut = 'not set'
  }

  content.innerHTML = `
    <div id="command-container">
      <h3>${commandAlias}</h3>
      <h5>Shortcut: ${shortcut}</h5>
      <h5>Slot name: ${cmdInternalName}</h5>
      <div id="actions-container">
        <h5>Actions:</h5>
        <div id="actions-list">
          ${fullCmd.actions.map(action => (
            `<div class="action-item">
              <h6>${mapActionAbbrToFull(action)}</h6>
            </div>`
          )).join('')}
        </div>
      </div>
      <div>
        <button id="delete-cmd">Delete</button>
        <button id="edit-cmd">Edit</button>
      </div>
    </div>`
  document.body.appendChild(content)
  document.getElementById('delete-cmd').addEventListener('click', () => deleteCommand(cmdInternalName), false)
  // todo editing commands
}

const setCommands = () => {
  let commandContainer = document.getElementById('commands-container')
  
  commandContainer.innerHTML = Object.entries(commands).map(([key, cmd]) => (
    `<div class="command-item-container">
      <button class="command-item-button">
        <div>${escapeHtml(cmd.alias)}</div>
        <div>${cmd.actions.length} actions</div>
      </button>
    </div>`
  )).join('')
  let commandItemButtons = document.getElementsByClassName('command-item-button')
  Array.prototype.forEach.call(commandItemButtons, cib => {
    cib.addEventListener('click', viewCommand, false)
  })
}

window.onload = () => {
  setCommands()
  document.getElementsByClassName('title')[0].addEventListener('click', () => window.location.href = 'popup.html', false)
}
