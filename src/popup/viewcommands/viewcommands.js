import { editCommand } from './editcommand.js'

let commands = {}

export const refreshCommands = () => {
  return new Promise(resolve => chrome.storage.sync.get(['commands'], result => {
    console.log('commands: ' + JSON.stringify(result.commands))
    commands = result.commands
    resolve()
  }))
}

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

/**
 * @param {String} abbr 
 */
const mapActionAbbrToFull = abbr => {
  // map for actions without more details
  const map = {
    'b': 'Bold',
    'u': 'Underline',
    'h': 'Highlight',
    'i': 'Italicize'
  }
  const mapRes = map[abbr]
  if (mapRes) {
    return mapRes
  }
  if (abbr.substring(0, 2) === 'fs') {
    return `Font size: ${abbr.substring(3)}`
  }
  if (abbr.substring(0, 2) === 'ff') {
    return `Font family: ${abbr.substring(3)}`
  }
  return 'Action not found'
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


export const viewCommand = alias => {
  // clear the content on the page
  document.getElementById('main-content').remove()
  let content = document.createElement('div')
  content.setAttribute('id', 'main-content')
  
  let fullCmd
  let cmdInternalName
  for (const [intName, cmd] of Object.entries(commands)) {
    console.log(cmd)
    if (cmd.alias === alias) {
      fullCmd = commands[intName]
      console.log(fullCmd)
      cmdInternalName = intName
    }
  }
  console.log(fullCmd.actions.join(';'))
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
      <h3>${alias}</h3>
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
      <div class="cmd-actions-container">
        <button id="edit-cmd" class="btn-filled">Edit</button>
        <button id="delete-cmd" class="btn-outlined">Delete</button>
      </div>
    </div>`
  document.body.appendChild(content)
  document.getElementById('delete-cmd').addEventListener('click', () => deleteCommand(cmdInternalName), false)
  document.getElementById('edit-cmd').addEventListener('click', () => editCommand(fullCmd, cmdInternalName, alias, shortcut), false)
}

/**
 * @param {MouseEvent} e 
 */
const viewCommandWithClick = e => {
  // getting the alias from the command clicked
  const unescapedCommandAlias = e.composedPath()[0]?.children[0]?.innerHTML
  const commandAlias = unescapeHtml(unescapedCommandAlias ?? '')
  console.log(commandAlias)
  if (!commandAlias) {
    console.warn('Command alias should be truthy; unescaped: ' + unescapedCommandAlias)
    console.log(e.composedPath())
    return
  }
  viewCommand(commandAlias)
}

const setCommands = () => {
  let commandContainer = document.getElementById('commands-container')

  commandContainer.innerHTML = Object.entries(commands).map(([key, cmd]) => (
    `<div class="command-item-container">
      <button class="command-item-button">
        <div>${escapeHtml(cmd.alias)}</div>
        <div>${cmd.actions.length} action${cmd.actions.length !== 1 ? 's' : ''}</div>
      </button>
    </div>`
  )).join('')

  let commandItemButtons = document.getElementsByClassName('command-item-button')
  Array.prototype.forEach.call(commandItemButtons, cib => {
    cib.addEventListener('click', viewCommandWithClick, false)
  })
}

window.onload = () => {
  console.log('onload')
  refreshCommands().then(setCommands)
  document.getElementsByClassName('title')[0].addEventListener('click', () => window.location.href = '../popup.html', false)
}
