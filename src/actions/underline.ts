import clickEl from './clickEl'

export const toggleUnderline = () => {
  const underlineElement = document.getElementById('underlineButton')
  if (!underlineElement) {
    throw new Error('unable to underline')
  }
  clickEl(underlineElement)
}

export const underline = (inverse: boolean = false) => {
  const underlineElement = document.getElementById('underlineButton')
  if (!underlineElement) {
    throw new Error('unable to underline')
  }
  if (inverse === underlineElement.classList.contains('goog-toolbar-button-checked')) {
    toggleUnderline()
  }
}
