import {colorMap} from '../colorMap'
import clickEl from './clickEl'

// todo add option to do/not do this when highlighting (along with everything else, like if bold, don't unbold)
export const unhighlight = () => {
  const unselectEl = document.getElementsByClassName(
    'goog-menuitem colormenuitems-no-color'
  )[0].children[0].children[0].children[0] as HTMLElement
  if (!unselectEl) {
    throw new Error('unable to unhighlight')
  }
  clickEl(unselectEl)
  clickEl(unselectEl)
}

export const highlightHex = (color: string, toggle: boolean) => {
  let i = 170
  let curr: HTMLElement | null = null
  while (
    (curr = document.getElementById(`docs-material-colorpalette-cell-${i}`)
      ?.firstChild as HTMLElement | null)
  ) {
    if (curr.title.includes(color)) {
      if (
        toggle &&
        curr.parentElement &&
        curr.parentElement.classList.contains(
          'docs-material-colorpalette-cell-selected'
        )
      ) {
        unhighlight()
      } else {
        clickEl(curr)
      }
      return
    }
    i++
  }

  // If it's not in the custom list
  const customElement = document.getElementById(
    `docs-material-colorpalette-cell-${i - 2}`
  )
  if (!customElement) {
    throw new Error('unable to find custom highlight button')
  }
  clickEl(customElement)

  // Enter hex value
  const hexTextBox = document.getElementsByClassName(
    'docs-material-hsv-color-picker-input'
  )
  if (!hexTextBox.length) {
    throw new Error('unable to find hex text box')
  }
  const htb = hexTextBox[0] as HTMLInputElement
  htb.value = color
  htb.dispatchEvent(new Event('keyup', {bubbles: true})) // Tell Docs that the value changed

  // Click OK
  const buttons = document.getElementsByClassName(
    'docs-material-button-content'
  )
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].innerHTML === 'OK') {
      clickEl(buttons[i] as HTMLElement)
      break
    }
  }
}

export const highlight = (color: string, toggle: boolean = false) => {
  let dropdownElement = document.getElementById('bgColorButton')
  if (!dropdownElement) {
    throw new Error('unable to highlight')
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
  if (!colorMap.has(color.toLowerCase())) {
    throw new Error('unknown color!')
  }

  const highlightEl = document.getElementById(
    `docs-material-colorpalette-cell-${colorMap.get(color.toLowerCase())}`
  )
  if (!highlightEl) {
    throw new Error('unable to highlight')
  }
  if (
    toggle &&
    highlightEl.classList.contains('docs-material-colorpalette-cell-selected')
  ) {
    unhighlight()
  } else {
    clickEl(highlightEl)
  }
}

export const textColor = (color: string, toggle: boolean = false) => {
  let dropdownElement = document.getElementById('textColorButton')
  if (!dropdownElement) {
    throw new Error('unable to change text color: no dropdown element found')
  }
  clickEl(dropdownElement)
  if (!colorMap.has(color.toLowerCase())) {
    throw new Error('unknown color!')
  }

  const textColorEl = document.getElementById(
    `docs-material-colorpalette-cell-${
      (colorMap.get(color.toLowerCase()) ?? 90) - 90
    }`
  )
  if (!textColorEl) {
    throw new Error('unable to change text color')
  }
  if (
    toggle &&
    textColorEl.classList.contains('docs-material-colorpalette-cell-selected')
  ) {
    const blackEl = document.getElementById(
      `docs-material-colorpalette-cell-${(colorMap.get('black') ?? 90) - 90}`
    )
    if (!blackEl) {
      throw new Error('unable to reset text color')
    }

    clickEl(blackEl)
  } else {
    clickEl(textColorEl)
  }
}
