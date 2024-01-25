import clickEl from './clickEl'

export const reactWithEmoji = (color: string, toggle: boolean) => {
  const bubbleButtonContainer = document.getElementById('docs-instant-bubble')
  if (!bubbleButtonContainer) {
    throw new Error('unable to find emoji react button!')
  }
  /*
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
  */
}
