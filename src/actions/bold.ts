import clickEl from './clickEl'

export const toggleBold = () => {
  const boldElement = document.getElementById('boldButton')
  if (!boldElement) {
    throw new Error('unable to bold')
  }
  clickEl(boldElement)
}

export const bold = (inverse: boolean = false) => {
  const boldElement = document.getElementById('boldButton')
  if (!boldElement) {
    throw new Error('unable to bold')
  }
  if (inverse === boldElement.classList.contains('goog-toolbar-button-checked')) {
    toggleBold()
  }
}
