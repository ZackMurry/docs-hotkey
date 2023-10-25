import clickEl from './clickEl'

export const heading = (val: string) => {
  const headingButtonElement = document.getElementById('headingStyleSelect')
  if (!headingButtonElement) {
    throw new Error('unable to set as heading')
  }
  clickEl(headingButtonElement)
  const headingListContainer = document.getElementById(':l0')?.parentNode
  if (!headingListContainer) {
    throw new Error('unable to find heading list container')
  }
  for (let i = 0; i < headingListContainer.children.length; i++) {
    const headingItemContainer = headingListContainer.children[i] as HTMLElement
    const headingText = headingItemContainer.children[0]?.children[1]?.innerHTML
    if (!headingText) {
      throw new Error('unable to set heading type')
    }
    if (headingText.toLowerCase() === val.toLowerCase()) {
      clickEl(headingItemContainer)
      break
    }
  }
}

export const align = (val: string) => {
  let element: HTMLElement | null
  const alignment = val.toLowerCase()
  if (alignment === 'left') {
    element = document.getElementById('alignLeftButton')
  } else if (alignment === 'center') {
    element = document.getElementById('alignCenterButton')
  } else if (alignment === 'right') {
    element = document.getElementById('alignRightButton')
  } else if (alignment === 'justify') {
    element = document.getElementById('alignJustifyButton')
  } else {
    throw new Error('unknown alignment option: ' + val)
  }
  if (!element) {
    throw new Error('unable to align to ' + val)
  }
  clickEl(element)
}

export const clearFormatting = () => {
  const clearFormattingElement = document.getElementById('clearFormattingButton')
  if (!clearFormattingElement) {
    throw new Error('unable to clear formatting')
  }
  clickEl(clearFormattingElement)
}
