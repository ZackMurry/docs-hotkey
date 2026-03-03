import { getColorMapValue, isSlides } from '../colorMap'
import log from '../util/logger'
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

const extractTrailingNumber = (str: string) => {
  const lastPart = str.split('-').pop()
  const num = Number(lastPart)
  return Number.isNaN(num) ? null : num
}

// Helper to discriminate between text (low) and highlight (high) elements
const getElementWithExtremeTrailingNumber = <T extends HTMLElement>(elements: NodeListOf<T>, isMax: boolean): T | null => {
  if (elements.length === 1) {
    return elements[0]
  }
  let extremeElement: T | null = null
  let extremeValue = isMax ? -Infinity : Infinity

  elements.forEach(el => {
    if (!el.id) return

    const lastPart = el.id.split('-').pop()
    const num = Number(lastPart)

    if (!Number.isNaN(num) && ((isMax && num > extremeValue) || (!isMax && num < extremeValue))) {
      extremeValue = num
      extremeElement = el
    }
  })

  return extremeElement
}

const highlightHex = (color: string, toggle: boolean) => {
  // Check whether this hex color already exists
  const existingCustomColorButtons: NodeListOf<HTMLElement> = document.querySelectorAll(
    `td[aria-label^="Custom Color ${color}"]`
  )
  const existingCustomColor = getElementWithExtremeTrailingNumber(existingCustomColorButtons, true)

  if (existingCustomColor) {
    if (toggle && existingCustomColor.classList.contains('docs-material-colorpalette-cell-selected')) {
      unhighlight()
    } else {
      clickEl(existingCustomColor as HTMLElement)
    }
    return
  }

  // If it doesn't exist, create it as a new custom color
  const addCustomColorButtons: NodeListOf<HTMLElement> = document.querySelectorAll('td[aria-label="Add a custom color"]')
  const addCustomColor = getElementWithExtremeTrailingNumber(addCustomColorButtons, true)
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

const unhighlightSlides = (table: HTMLElement) => {
  // Unhighlight
  const transparentBtns = table.querySelectorAll('.colormenuitems-no-color')
  const transparentBtn = transparentBtns[transparentBtns.length - 1] ?? null
  if (!transparentBtn) {
    throw new Error('unable to find transparent button!')
  }
  clickEl(transparentBtn as HTMLElement)
}

const highlightSlides = (color: string, toggle: boolean) => {
  let dropdownElement = document.getElementById('bgColorButton')
  if (!dropdownElement) {
    throw new Error('unable to highlight: could not find dropdown')
  }
  clickEl(dropdownElement)
  if (color.startsWith('#')) {
    throw new Error('Highlighting with a hex code is not supported on Slides!')
  }
  const tables = document.querySelectorAll('.colormenuitems-ob-order:not([style*="display: none"])')
  if (!tables.length) {
    throw new Error('No tables found!')
  }
  const table = tables[0]
  if (color.toLowerCase() === 'none') {
    unhighlightSlides(table as HTMLElement)
    return
  }
  const palettes = table.querySelectorAll('.docs-material-colorpalette')
  const palette = palettes[palettes.length - 1] ?? null

  if (!palette) {
    throw new Error('No child with class .docs-material-colorpalette found')
  }
  const firstSwatch = palette.children[0]?.children[0]?.children[0]?.children[0]
  if (!firstSwatch) {
    throw new Error('Could not find first swatch')
  }
  const firstOffset = extractTrailingNumber(firstSwatch.id)
  if (!firstOffset) {
    throw new Error('Could not find first offset ' + firstSwatch.id)
  }
  const highlightNumber = firstOffset + getColorMapValue(color, 'highlight')
  const highlightEl = document.getElementById(`docs-material-colorpalette-cell-${highlightNumber}`)
  if (!highlightEl) {
    throw new Error('unable to highlight')
  }
  if (toggle && highlightEl.classList.contains('docs-material-colorpalette-cell-selected')) {
    unhighlightSlides(table as HTMLElement)
  } else {
    clickEl(highlightEl)
  }
}

function simulateKeypress(key: string, target: Element | null = document.activeElement) {
  const down = new KeyboardEvent('keydown', { key, bubbles: true })
  const press = new KeyboardEvent('keypress', { key, bubbles: true })
  const up = new KeyboardEvent('keyup', { key, bubbles: true })

  log(`Keypress target: ${target}`, 'debug')
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
  const dropdownElement = document.getElementById('textColorButton')
  if (!dropdownElement) {
    throw new Error('unable to set text color: could not find dropdown button')
  }
  clickEl(dropdownElement)
  if (color.startsWith('#')) {
    throw new Error('Highlighting with a hex code is not supported on Slides!')
  }
  const tables = document.querySelectorAll('.colormenuitems-ob-order:not([style*="display: none"])')
  if (!tables.length) {
    throw new Error('No tables found!')
  }
  const table = tables[0]
  const palettes = table.querySelectorAll('.docs-material-colorpalette')
  const palette = palettes[palettes.length - 1] ?? null

  if (!palette) {
    throw new Error('No child with class .docs-material-colorpalette found')
  }
  const firstSwatch = palette.children[0]?.children[0]?.children[0]?.children[0]
  if (!firstSwatch) {
    throw new Error('Could not find first swatch')
  }
  const firstOffset = extractTrailingNumber(firstSwatch.id)
  if (!firstOffset) {
    throw new Error('Could not find first offset ' + firstSwatch.id)
  }
  const colorNumber = firstOffset + getColorMapValue(color, 'text')
  const colorEl = document.getElementById(`docs-material-colorpalette-cell-${colorNumber}`)
  if (!colorEl) {
    throw new Error('unable to set text color: could not find matching swatch')
  }
  if (toggle && colorEl.classList.contains('docs-material-colorpalette-cell-selected')) {
    // Set color to black for toggle
    clickEl(firstSwatch as HTMLElement) // First swatch is black
  } else {
    clickEl(colorEl)
  }
}

// Choose black text color
const textColorBlack = () => {
  const blackEl = document.getElementById(`docs-material-colorpalette-cell-${getColorMapValue('black', 'text')}`)
  if (!blackEl) {
    throw new Error('unable to reset text color')
  }
  clickEl(blackEl)
}

const textColorHex = (color: string, toggle: boolean) => {
  // Check whether this hex color already exists
  const existingCustomColorButtons: NodeListOf<HTMLElement> = document.querySelectorAll(
    `td[aria-label^="Custom Color ${color}"]`
  )
  const existingCustomColor = getElementWithExtremeTrailingNumber(existingCustomColorButtons, false)

  if (existingCustomColor) {
    if (toggle && existingCustomColor.classList.contains('docs-material-colorpalette-cell-selected')) {
      textColorBlack()
    } else {
      clickEl(existingCustomColor as HTMLElement)
    }
    return
  }

  // If it doesn't exist, create it as a new custom color
  const addCustomColorButtons: NodeListOf<HTMLElement> = document.querySelectorAll('td[aria-label="Add a custom color"]')
  const addCustomColor = getElementWithExtremeTrailingNumber(addCustomColorButtons, false)
  if (!addCustomColor) {
    throw new Error('unable to find custom text color button')
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
  if (color.startsWith('#')) {
    textColorHex(color, toggle)
    return
  }
  const colorNumber = getColorMapValue(color, 'text')
  const textColorEl = document.getElementById(`docs-material-colorpalette-cell-${colorNumber}`)
  if (!textColorEl) {
    throw new Error('unable to change text color')
  }
  if (toggle && textColorEl.classList.contains('docs-material-colorpalette-cell-selected')) {
    textColorBlack()
  } else {
    clickEl(textColorEl)
  }
}
