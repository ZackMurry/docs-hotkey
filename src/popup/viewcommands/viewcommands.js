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
 * @param {MouseEvent} e 
 * @param {String} internalName
 */
const handleEditSubmit = (e, internalName) => {
  e.preventDefault()
  console.log(e)

  const newAlias = e.target[0].value
  let actions = []

  const s = 'test'

  // todo would need to change if other options above this get added
  for (let i = 1, currentActionEl = e.target[i];
    currentActionEl.getAttribute('id')?.match(/action-.+select/);currentActionEl = e.target[++i]) {
    console.log(currentActionEl.value)
  }


}

const editCommand = (commandContent, internalName, alias, shortcut) => {
  let mainContent = document.getElementById('main-content')
  if (!mainContent) {
    console.warn('Main content div not found.')
  } else {
    mainContent.remove()
  }

  // draw editing to screen
  // todo editing font size and stuff doesn't work
  let content = document.createElement('div')
  content.setAttribute('id', 'main-content')
  console.log(commandContent.actions)
  // todo figure out which ids are actually necessary in the action mapping
  content.innerHTML = `
    <form id="edit-cmd-form">
      <div id="change-alias-container">
        <label for="change-alias" class="change-alias-label edit-cmd-label">Name</label>
        <input type="text" value="${alias}" />
      </div>
      <h5>Shortcut: ${shortcut}</h5> ${/* todo need to show how to change shortcuts somewhere */''}
      <h5>Slot name: ${internalName}</h5>
      <div id="edit-actions-container">
        <h5>Actions:</h5>
        <div id="edit-actions-list">
          ${commandContent.actions.map((action, index) => (
            `<div id="action-${index + 1}-edit-container">
              <label for="action-${index + 1}" class="action-label">Action ${index + 1}</label>
              <select name="action-${index + 1}" class="action-select" id="action-${index + 1}-select">
                <option value="b" ${action === 'b' && 'selected'}>Bold</option>
                <option value="u" ${action === 'u' && 'selected'}>Underline</option>
                <option value="i" ${action === 'i' && 'selected'}>Italicize</option>
                <option value="h" ${action === 'h' && 'selected'}>Highlight</option>
                <option value="fs">Font size</option>
                <option value="ff">Font family</option>
              </select>
            </div>`
          )).join('')}
        </div>
      </div>
      <button type="submit">Done</button>
      <button id="cancel-edit-button">Cancel</button>
    </form>
  `

  document.body.appendChild(content)
  document.getElementById('edit-cmd-form').addEventListener('submit', e => handleEditSubmit(e, internalName))
  document.getElementById('cancel-edit-button').addEventListener('click', () => viewCommand(alias), false)
}

const viewCommand = alias => {
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
        <button id="delete-cmd">Delete</button>
        <button id="edit-cmd">Edit</button>
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
  const commandAlias = unescapeHtml(e.composedPath()[0].children[0].innerHTML ?? '')
  console.log(commandAlias)
  if (!commandAlias) {
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
        <div>${cmd.actions.length} actions</div>
      </button>
    </div>`
  )).join('')
  let commandItemButtons = document.getElementsByClassName('command-item-button')
  Array.prototype.forEach.call(commandItemButtons, cib => {
    cib.addEventListener('click', viewCommandWithClick, false)
  })
}

window.onload = () => {
  setCommands()
  document.getElementsByClassName('title')[0].addEventListener('click', () => window.location.href = '../popup.html', false)
}
