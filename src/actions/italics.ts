import clickEl from './clickEl'

export const toggleItalics = () => {
  const italicizeElement = document.getElementById('italicButton')
  if (!italicizeElement) {
    throw new Error('unable to italicize')
  }
  clickEl(italicizeElement)
}

export const italicize = (inverse: boolean = false) => {
  const italicizeElement = document.getElementById('italicButton')
  if (!italicizeElement) {
    throw new Error('unable to italicize')
  }
  if (inverse === italicizeElement.classList.contains('goog-toolbar-button-checked')) {
    toggleItalics()
  }
}
