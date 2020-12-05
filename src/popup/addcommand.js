
/**
 * remove an action input field from the add command form
 * doesn't take a number to remove because the event gives everything needed
 * (and because the click listener would have to be reset...)
 * @param {MouseEvent} e event triggered by click on button
 */
const removeAction = e => {
  e.preventDefault()
  const actionNum = e.target.id.charAt(14)
  let removedActionContainer = document.getElementById(`action-${actionNum}-container`)
  removedActionContainer.remove()

  // propagating action numbers
  // todo: eliminate some of these if they prove unnecessary
  let newActionNum = parseInt(actionNum)
  let actionContainerToUpdate = document.getElementById(`action-${newActionNum+1}-container`)
  while (actionContainerToUpdate) {
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
    </select>
    <button id="remove-action-${actionNum}-btn">Remove</button>
  `
  actionContainer.appendChild(newElement)
  document.getElementById(`remove-action-${actionNum}-btn`).addEventListener('click', removeAction, false)
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

/**
 * @param {Event} e 
 */
const handleFsValue = e => {
  let actionContainerEl = e.composedPath()[1]
  let fontSizeInput = document.createElement('input')
  fontSizeInput.setAttribute('type', 'number')
  fontSizeInput.setAttribute('class', 'font-size-input')
  fontSizeInput.setAttribute('placeholder', 'Size')
  actionContainerEl.appendChild(fontSizeInput)
}

const removeFsInput = e => {
  e.composedPath()[1].children[2].remove()
}

/**
 * todo implement
 * @param {Event} e 
 */
const handleFfValue = e => {
  let actionContainerEl = e.composedPath()[1]
  let fontFamilyInput = document.createElement('in')
}

const handleSelectChange = e => {
  console.log(e)

  const { value } = e.target

  // setting data value
  const prevValue = e.srcElement.getAttribute('data-prev-value')
  e.srcElement.setAttribute('data-prev-value', value)

  if (prevValue === 'fs') {
    removeFsInput(e)
  }

  // doing case-specific action
  if (value === 'fs') {
    handleFsValue(e)
  } else if (value === 'ff') {
    // handleFfValue(e)
  }
}

const initForm = () => {
  document.getElementById('add-action-button').addEventListener('click', addAction, false)
  document.getElementById('add-command-form').addEventListener('submit', handleSubmit)
  document.getElementById('action-1-select').addEventListener('change', handleSelectChange)
  document.getElementById('action-1-select').setAttribute('data-prev-value', 'b')
}

window.onload = () => {
  initForm()
  document.getElementsByClassName('title')[0].addEventListener('click', () => window.location.href = 'popup.html', false)
}
