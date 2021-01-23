import { handleSelectChange } from '../utils/actioneditutils.js'

// todo require non-empty cmd name

/**
 * remove an action input field from the add command form
 * doesn't take a number to remove because the event gives everything needed
 * (and because the click listener would have to be reset...)
 * @param {MouseEvent} e event triggered by click on button
 */
const removeAction = e => {
  e.preventDefault()
  const actionNum = e.target.id.charAt(14) // todo: this would limit to 9 actions
  let removedActionContainer = document.getElementById(`action-${actionNum}-container`)
  removedActionContainer.remove()

  // propagating action numbers
  // todo: eliminate some of these if they prove unnecessary
  let newActionNum = parseInt(actionNum)
  let actionContainerToUpdate = document.getElementById(`action-${newActionNum+1}-container`)
  while (actionContainerToUpdate) {
    // todo: don't think this will work with actions with another field (like font size)
    actionContainerToUpdate.id = `action-${newActionNum}-container`

    // updating label id, for, and text
    actionContainerToUpdate.children[0].id = `action-${newActionNum}`
    actionContainerToUpdate.children[0].setAttribute('for', `action-${newActionNum}`)
    actionContainerToUpdate.children[0].innerHTML = `Action ${newActionNum}`

    // updating select id and name
    actionContainerToUpdate.children[1].id = `action-${newActionNum}-select`
    actionContainerToUpdate.children[1].setAttribute('name', `action-${newActionNum}`)

    // updating button id
    actionContainerToUpdate.children[2].id = `remove-action-${newActionNum}-btn`

    // updating variables for next loop
    newActionNum++
    actionContainerToUpdate = document.getElementById(`action-${newActionNum+1}-container`)
  }
}

const addAction = e => {
  e.preventDefault()
  console.log('addAction')
  let actionContainer = document.getElementById('actions-container')
  console.log(actionContainer)

  const actionNum = actionContainer.children.length + 1
  let newElement = document.createElement('div')
  newElement.id = `action-${actionNum}-container`
  newElement.innerHTML = `
    <label for="action-${actionNum}" class="action-label">Action ${actionNum}</label>
    <select name="action-${actionNum}" class="action-select" id="action-${actionNum}-select">
      <option value="b">Bold</option>
      <option value="u">Underline</option>
      <option value="i">Italicize</option>
      <option value="h">Highlight</option>
      <option value="fs">Font size</option>
      <option value="ff">Font family</option>
    </select>
    <button class="remove-action-btn" type="button" id="remove-action-${actionNum}-btn">\u00d7</button>
  `
  actionContainer.appendChild(newElement)
  document.getElementById(`remove-action-${actionNum}-btn`).addEventListener('click', removeAction, false)
  initAction(actionNum)
}

const addCommand = (currentCommands, internalName, alias, actions) => {
  chrome.storage.sync.set({
    commands: {
      ...currentCommands,
      [internalName]: {
        actions,
        alias
      }
    }
  }, () => {
    console.log('values set')
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.executeScript(tabs[0].id, { code: 'window.location.reload()' })
    })
    window.close()
  })
}

// todo validation
const handleSubmit = e => {
  e.preventDefault()
  console.log(e)
  const commandAlias = e.target[0].value
  let actions = []
  for (let i = 1, actionData = e.target[i]; actionData; i++, actionData = e.target[i]) {
    const { value } = actionData
    // excluding buttons
    if (value) {
      if (value === 'fs') {
        if (!e.target[i+1].value) {
          console.error('ERROR: invalid font size.')
          return
        }
        actions.push('fs#' + e.target[++i].value)
      } else if (value === 'ff') {
        if (!e.target[i + 1].value) {
          console.error('ERROR: invalid font family')
          return
        }
        actions.push('ff#' + e.target[++i].value)
      } else {
        // todo other multi-entry actions
        actions.push(value)
      }
    }
  }
  console.log(actions)
  chrome.storage.sync.get(['commands'], result => {
    console.log(result)
    let internalNameNumber = 1
    // finding a free slot. using an if first, because at first, there won't be any commands
    if (result.commands) {
      while (`slot${internalNameNumber}` in result.commands) {
        internalNameNumber++
      }
    }
    if (internalNameNumber > 10) {
      // todo find out how to programmatically add shortcut?
      console.log('too many shortcuts. not enough shortcut spaces')
      return
    }
    addCommand(result.commands, 'slot' + internalNameNumber, commandAlias, actions)
  })
}

const initForm = () => {
  document.getElementById('add-action-button').addEventListener('click', addAction, false)
  document.getElementById('add-command-form').addEventListener('submit', handleSubmit)
  initAction(1)
}

const initAction = num => {
  document.getElementById(`action-${num}-select`).addEventListener('change', handleSelectChange)
  document.getElementById(`action-${num}-select`).setAttribute('data-prev-value', 'b')
}

window.onload = () => {
  initForm()
  document.getElementsByClassName('title')[0].addEventListener('click', () => window.location.href = '../popup.html', false)
}
