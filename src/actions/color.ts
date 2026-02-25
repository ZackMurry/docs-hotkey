import { getColorMapValue, isSlides } from '../colorMap'
import clickEl from './clickEl'

export const unhighlight = () => {
  const unselectEl = document.getElementsByClassName('goog-menuitem colormenuitems-no-color')[0].children[0].children[0]
    .children[0] as HTMLElement
  if (!unselectEl) {
    throw new Error('unable to unhighlight')
  }
  clickEl(unselectEl)
  clickEl(unselectEl)
}

// Helper to discriminate between text (low) and highlight (high) elements
const getElementWithMaxTrailingNumber = <T extends HTMLElement>(elements: NodeListOf<T>): T | null => {
  if (elements.length === 1) {
    return elements[0]
  }
  let maxElement: T | null = null
  let maxValue = -Infinity

  elements.forEach(el => {
    if (!el.id) return

    const lastPart = el.id.split('-').pop()
    const num = Number(lastPart)

    if (!Number.isNaN(num) && num > maxValue) {
      maxValue = num
      maxElement = el
    }
  })

  return maxElement
}

export const highlightHex = (color: string, toggle: boolean) => {
  // Check whether this hex color already exists
  const existingCustomColorButtons: NodeListOf<HTMLElement> = document.querySelectorAll(
    `td[aria-label^="Custom Color ${color}"]`
  )
  const existingCustomColor = getElementWithMaxTrailingNumber(existingCustomColorButtons)

  if (existingCustomColor) {
    if (toggle && existingCustomColor.classList.contains('docs-material-colorpalette-cell-selected')) {
      unhighlight()
    } else {
      clickEl(existingCustomColor as HTMLElement)
    }
    return
  }

  // If it doesn't exist, create it as a new custom color
  const addCustomColor = document.querySelector('td[aria-label="Add a custom color"]')
  if (!addCustomColor) {
    throw new Error('unable to find custom color highlight button')
  }
  clickEl(addCustomColor as HTMLElement)

  // Enter hex value
  const hexTextBox = document.getElementsByClassName('docs-material-hsv-color-picker-input')
  if (!hexTextBox.length) {
    throw new Error('unable to find hex text box')
  }
  const htb = hexTextBox[0] as HTMLInputElement
  htb.value = color
  htb.dispatchEvent(new Event('keyup', { bubbles: true })) // Tell Docs that the value changed

  // Click OK
  const buttons = document.getElementsByClassName('docs-material-button-content')
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].innerHTML === 'OK') {
      clickEl(buttons[i] as HTMLElement)
      break
    }
  }
}

const highlightSlides = (color: string, toggle: boolean) => {
  let dropdownElement = document.getElementById('bgColorButton')
  if (!dropdownElement) {
    throw new Error('unable to highlight: could not find dropdown')
  }
  clickEl(dropdownElement)
  if (color.toLowerCase() === 'none') {
    unhighlight()
    return
  }
  if (color.startsWith('#')) {
    // highlightHex(color, toggle)
    return
  }
  const highlightNumber = getColorMapValue(color, 'highlight')
  for (const offset of [132, 232, 332, 432, 295, 395, 495]) {
    // console.log({ offset })
    const highlightEl = document.getElementById(`docs-material-colorpalette-cell-${offset + highlightNumber}`)
    if (!highlightEl) {
      // console.log('not found')
      continue
    }
    const table = highlightEl.parentNode?.parentNode?.parentNode?.parentNode?.parentNode as HTMLElement | null
    if (highlightEl.ariaLabel !== color.toLowerCase()) continue
    if (!table || table.style.visibility !== 'visible' || table.style.display === 'none') continue
    if (toggle && highlightEl.classList.contains('docs-material-colorpalette-cell-selected')) {
      unhighlight()
    } else {
      clickEl(highlightEl)
    }
    break
  }
  return
}

function simulateKeypress(key: string, target: Element | null = document.activeElement) {
  const down = new KeyboardEvent('keydown', { key, bubbles: true })
  const press = new KeyboardEvent('keypress', { key, bubbles: true })
  const up = new KeyboardEvent('keyup', { key, bubbles: true })

  console.log(target)
  if (target) {
    target.dispatchEvent(down)
    target.dispatchEvent(press)
    target.dispatchEvent(up)
  }
}

export const highlight = (color: string, toggle: boolean = false) => {
  if (isSlides()) {
    highlightSlides(color, toggle)
    return
  }

  simulateKeypress('ArrowDown')
  let dropdownElement = document.getElementById('bgColorButton')
  if (!dropdownElement) {
    throw new Error('unable to highlight: could not find dropdown')
  }
  clickEl(dropdownElement)
  if (color.toLowerCase() === 'none') {
    unhighlight()
    return
  }
  if (color.startsWith('#')) {
    highlightHex(color, toggle)
    return
  }
  const highlightNumber = getColorMapValue(color, 'highlight')
  const highlightEl = document.getElementById(`docs-material-colorpalette-cell-${highlightNumber}`)
  if (!highlightEl) {
    throw new Error('unable to highlight')
  }
  if (toggle && highlightEl.classList.contains('docs-material-colorpalette-cell-selected')) {
    unhighlight()
  } else {
    clickEl(highlightEl)
  }
}

const textColorSlides = (color: string, toggle: boolean) => {
  let dropdownElement = document.getElementById('textColorButton')
  if (!dropdownElement) {
    throw new Error('unable to change text color: no dropdown element found')
  }
  clickEl(dropdownElement)
  const colorNumber = getColorMapValue(color, 'text')
  // Iterate over different possible black= values because it depends on the order in which the menus have been opened
  // The menu with display !== none is the right one
  for (const offset of [132, 232, 332, 432, 295, 395, 495]) {
    // console.log({ offset })
    const textColorEl = document.getElementById(`docs-material-colorpalette-cell-${offset + colorNumber}`)
    if (!textColorEl) {
      // console.log('not found')
      continue
    }
    const table = textColorEl.parentNode?.parentNode?.parentNode?.parentNode?.parentNode as HTMLElement | null
    if (!table || table.style.visibility !== 'visible' || table.style.display === 'none') continue
    if (toggle && textColorEl.classList.contains('docs-material-colorpalette-cell-selected')) {
      const blackEl = document.getElementById(
        `docs-material-colorpalette-cell-${offset + getColorMapValue('black', 'text')}`
      )
      if (!blackEl) {
        throw new Error('unable to reset text color')
      }

      clickEl(blackEl)
    } else {
      clickEl(textColorEl)
    }
    break
  }
  return
}

export const textColor = (color: string, toggle: boolean = false) => {
  if (isSlides()) {
    textColorSlides(color, toggle)
    return
  }
  let dropdownElement = document.getElementById('textColorButton')
  if (!dropdownElement) {
    throw new Error('unable to change text color: no dropdown element found')
  }
  clickEl(dropdownElement)
  const colorNumber = getColorMapValue(color, 'text')
  // console.log(`color number: ${colorNumber}`)
  const textColorEl = document.getElementById(`docs-material-colorpalette-cell-${colorNumber}`)
  if (!textColorEl) {
    throw new Error('unable to change text color')
  }
  if (toggle && textColorEl.classList.contains('docs-material-colorpalette-cell-selected')) {
    const blackEl = document.getElementById(`docs-material-colorpalette-cell-${getColorMapValue('black', 'text')}`)
    if (!blackEl) {
      throw new Error('unable to reset text color')
    }

    clickEl(blackEl)
  } else {
    clickEl(textColorEl)
  }
}
