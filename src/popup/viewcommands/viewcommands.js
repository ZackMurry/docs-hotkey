let commands = {}

const refreshCommands = () => {
  return new Promise(resolve => chrome.storage.sync.get(['commands'], result => {
    console.log('commands: ' + JSON.stringify(result.commands))
    commands = result.commands
    resolve()
  }))
}

refreshCommands()

let extCommands
chrome.commands.getAll(cmds => {
  extCommands = cmds
})

/**
 * @param {String} internalName slot name of command
 * @param {Object} val new value of command
 * @returns {Promise}
 */
const updateCommand = (internalName, val) => {
  return new Promise(resolve => {
    chrome.storage.sync.get(['commands'], result => {
      chrome.storage.sync.set({
        commands: {
          ...(result && result.commands),
          [internalName]: val
        }
      }, () => {
        resolve()
      })
    })
  })
  
}

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
  const actions = []

  // see addcommand.handleSubmit()
  for (let i = 1, actionData = e.target[i]; actionData; i++, actionData = e.target[i]) {
    const { value } = actionData

    if (value) { // excluding buttons
      if (value === 'fs') {
        if (!e.target[i+1].value) {
          console.error('ERROR: invalid font size.')
          return
        }
        actions.push('fs#' + e.target[++i].value)
      } else {
        // todo other multi-input actions
        actions.push(value)
      }
    }
  }

  console.log(actions)

  updateCommand(internalName, {
    alias: newAlias,
    actions
  }).then(refreshCommands)
    .then(() => viewCommand(newAlias))

}

const removeActionInEditPage = e => {
  let actionButtonId = e.composedPath()[0].id.substring(14)
  let actionNumber = ''
  for (let i = 0, currentNum = actionButtonId.charAt(i); +currentNum; currentNum = actionButtonId.charAt(++i)) {
    actionNumber += currentNum
  }
  actionNumber = +actionNumber
  console.log('removing action ' + actionNumber)
  
  // remove action
  document.getElementById(`action-${actionNumber}-edit-container`).remove()

  // update other action numbers

  const numActions = document.getElementById('edit-actions-list').children.length

  for (let i = actionNumber + 1; i <= numActions + 1; i++) {
    console.log(i)
    // have to use ids to ensure that we're not editing an extra field or something (like a font size modifier)

    // changing container
    document.getElementById(`action-${i}-edit-container`).id = `action-${i-1}-edit-container`

    // changing label
    const label = document.getElementById(`action-${i}-label`)
    label.id = `action-${i-1}-label`
    label.setAttribute('for', `action-${i-1}`)
    label.innerHTML = `Action ${i-1}`

    // changing select
    const select = document.getElementById(`action-${i}-select`)
    select.setAttribute('name', `action${i-1}`)
    select.id = `action-${i-1}-select`

    // changing remove button
    document.getElementById(`remove-action-${i}-button`).id = `remove-action-${i-1}-button`

    // todo need to implement stuff for font size and such
  }

}

const addActionInEditPage = () => {
  console.log('add action')
  let newActionField = document.createElement('div')
  let actionsList = document.getElementById('edit-actions-list')

  const newActionIndex = actionsList.children.length + 1
  newActionField.setAttribute('id', `action-${newActionIndex}-edit-container`)

  // todo don't think the name for select is needed
  newActionField.innerHTML = `
    <label id="action-${newActionIndex}-label" for="action-${newActionIndex}" class="action-label">Action ${newActionIndex}</label>
    <select name="action-${newActionIndex}" class="action-select" id="action-${newActionIndex}-select">
      <option value="b" selected>Bold</option>
      <option value="u">Underline</option>
      <option value="i">Italicize</option>
      <option value="h">Highlight</option>
      <option value="fs">Font size</option>
      <option value="ff">Font family</option>
    </select>
    <button type="button" id="remove-action-${newActionIndex}-button">Remove</button>`

  actionsList.appendChild(newActionField)
  document.getElementById(`remove-action-${newActionIndex}-button`).addEventListener('click', removeActionInEditPage, false)
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
              <label id="action-${index + 1}-label" for="action-${index + 1}" class="action-label">Action ${index + 1}</label>
              <select name="action-${index + 1}" class="action-select" id="action-${index + 1}-select">
                <option value="b" ${action === 'b' && 'selected'}>Bold</option>
                <option value="u" ${action === 'u' && 'selected'}>Underline</option>
                <option value="i" ${action === 'i' && 'selected'}>Italicize</option>
                <option value="h" ${action === 'h' && 'selected'}>Highlight</option>
                <option value="fs">Font size</option>
                <option value="ff">Font family</option>
              </select>
              <button type="button" id="remove-action-${index + 1}-button">Remove</button>
            </div>`
          )).join('')}
        </div>
      </div>
      <div id="add-action-container">
        <button type="button" id="add-action-button" class="add-action-button form-button">Add action</button>
      </div>
      <button type="submit" class="form-done-button form-button">Done</button>
      <button type="button" id="cancel-edit-button" class="form-cancel-button form-button">Cancel</button>
    </form>
  `

  document.body.appendChild(content)
  document.getElementById('edit-cmd-form').addEventListener('submit', e => handleEditSubmit(e, internalName))
  document.getElementById('cancel-edit-button').addEventListener('click', () => viewCommand(alias), false)
  document.getElementById('add-action-button').addEventListener('click', addActionInEditPage, false)
  const numActions = document.getElementById('edit-actions-list').children.length
  for (let i = 1; i <= numActions; i++) {
    document.getElementById(`remove-action-${i}-button`).addEventListener('click', removeActionInEditPage, false)
  }
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
