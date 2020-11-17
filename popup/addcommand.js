
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
  let actionContainer = document.getElementById('action-container')
  console.log(actionContainer)

  const actionNum = actionContainer.children.length + 1
  let newElement = document.createElement('div')
  newElement.id = `action-${actionNum}-container`
  newElement.innerHTML = `
    <label for="action-${actionNum}">Action ${actionNum}</label>
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
  })
}

// todo validation
const handleSubmit = e => {
  e.preventDefault()
  console.log(e)
  const commandAlias = e.target[0].value
  let actions = []
  for (let i = 1, actionData = e.target[i]; actionData; i++, actionData = e.target[i]) {
    // excluding buttons
    if (actionData.value) {
      actions.push(actionData.value)
    }
  }
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
}

window.onload = () => {
  initForm()
}
