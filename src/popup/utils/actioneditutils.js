export const handleFsVal = actionContainerEl => {
  let fontSizeInput = document.createElement('input')
  fontSizeInput.setAttribute('type', 'number')
  fontSizeInput.setAttribute('class', 'font-size-input')
  fontSizeInput.setAttribute('placeholder', 'Size')
  // this also works for the first action because a null second argument will add it as the last item
  actionContainerEl.insertBefore(fontSizeInput, actionContainerEl.children[2])
  return fontSizeInput
}

/**
 * @param {Event} e 
 */
const handleFsValue = e => {
  let actionContainerEl = e.composedPath()[1]
  handleFsVal(actionContainerEl)
}

const removeFsInput = e => {
  e.composedPath()[1].children[2].remove()
}

/**
 * @param {Event} e 
 */
const handleFfValue = e => {
  let actionContainerEl = e.composedPath()[1]
  let fontFamilyInput = document.createElement('input')
  fontFamilyInput.setAttribute('type', 'text')
  fontFamilyInput.setAttribute('class', 'font-family-input')
  fontFamilyInput.setAttribute('placeholder', 'Font')
  actionContainerEl.insertBefore(fontFamilyInput, actionContainerEl.children[2])
}

const removeFfInput = e => {
  e.composedPath()[1].children[2].remove()
}

export const handleSelectChange = e => {
  console.log(e)

  const { value } = e.target

  // setting data value
  const prevValue = e.srcElement.getAttribute('data-prev-value')
  console.log(prevValue)
  e.srcElement.setAttribute('data-prev-value', value)

  if (prevValue === 'fs') {
    removeFsInput(e)
  } else if (prevValue === 'ff') {
    removeFfInput(e)
  }

  // doing case-specific action
  if (value === 'fs') {
    handleFsValue(e)
  } else if (value === 'ff') {
    handleFfValue(e)
  }
}
