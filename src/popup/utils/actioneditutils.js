export const handleFsVal = (actionContainerEl, initialValue = null) => {
  console.log('fs val')
  let fontSizeInput = document.createElement('input')
  fontSizeInput.setAttribute('type', 'number')
  fontSizeInput.setAttribute('class', 'font-size-input')
  fontSizeInput.setAttribute('placeholder', 'Size')
  fontSizeInput.value = initialValue
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

const handleFfValue = (containerEl, initialValue = null) => {
  console.log('ff')
  let fontFamilyInput = document.createElement('input')
  fontFamilyInput.setAttribute('type', 'text')
  fontFamilyInput.setAttribute('class', 'font-family-input')
  fontFamilyInput.setAttribute('placeholder', 'Font')
  fontFamilyInput.value = initialValue
  containerEl.insertBefore(fontFamilyInput, containerEl.children[2])
}

const removeFfInput = e => {
  e.composedPath()[1].children[2].remove()
}

export const handleSelectInit = (value, containerEl) => {
  const sub = value.substring(0, 2)
  const initialValue = value.substring(3)
  // doing case-specific action
  if (sub === 'fs') {
    handleFsVal(containerEl, initialValue)
  } else if (sub === 'ff') {
    handleFfValue(containerEl, initialValue)
  }
}

const handleSelectValue = (value, e) => {
  const containerEl = e.composedPath()[1]
  handleSelectInit(value, containerEl)
}

export const handleSelectChange = e => {
  console.log(e)

  const { value } = e.target

  // setting data value
  const prevValue = e.srcElement.getAttribute('data-prev-value') ?? 'b'
  console.log(prevValue)
  e.srcElement.setAttribute('data-prev-value', value)

  if (prevValue === 'fs') {
    removeFsInput(e)
  } else if (prevValue === 'ff') {
    removeFfInput(e)
  }

  handleSelectValue(value, e)
}
