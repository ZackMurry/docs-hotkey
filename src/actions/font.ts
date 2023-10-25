import clickEl, { dispatchMouseEvent } from './clickEl'

export const fontFamily = (val: string) => {
  const fontFamilyElement = document.getElementById('docs-font-family')
  if (!fontFamilyElement) {
    throw new Error('unable to change font family')
  }
  clickEl(fontFamilyElement)
  let allFontContainer = document.getElementsByClassName('docs-fontmenu-fonts')[0]
  for (let i = 0; i < allFontContainer.children.length; i++) {
    const fontElement = allFontContainer.children[i] as HTMLElement
    const fontText = fontElement.children[0].children[1].innerHTML
    if (fontText.toLowerCase() === val.toLowerCase()) {
      clickEl(fontElement)
      break
    }
  }
}

export const fontWeight = async (val: string) => {
  const fontFamilyElement = document.getElementById('docs-font-family')
  if (!fontFamilyElement) {
    throw new Error('unable to change font family')
  }
  clickEl(fontFamilyElement)
  const fontMenu = document.getElementsByClassName('docs-fontmenu')[0]
  if (!fontMenu) {
    throw new Error('unable to find font menu')
  }
  ;(fontMenu as HTMLElement).style.display = 'none' // Genius: turn off font menu display so that user's cursor doesn't interfere
  let currentFont: HTMLElement | null = null
  let currentFontString: string | undefined = undefined
  for (let i = 3; i < fontMenu.children.length; i++) {
    if (fontMenu.children[i].classList.contains('goog-option-selected')) {
      currentFont = fontMenu.children[i] as HTMLElement
      currentFontString = fontMenu.children[i].textContent?.replaceAll('►', '').trim()
    }
  }
  // console.log(currentFontString)
  if (!currentFont) {
    throw new Error('unable to find current font button')
  }
  if (!currentFontString) {
    throw new Error('unable to determine current font')
  }
  dispatchMouseEvent(currentFont, 'mouseover')

  const fontWeightMenu = await new Promise<HTMLElement | null>(resolve =>
    setTimeout(() => {
      const fontWeightMenuQuery = document.querySelectorAll('div[role="menu"]:not([display="none"])')
      // console.log(fontWeightMenuQuery)
      const fontWeightMenusFiltered: HTMLElement[] = []
      let resolved = false
      fontWeightMenuQuery.forEach(val => {
        if (!resolved && val.classList.length === 2) {
          // console.log('2 class length', val)
          const textGrandChild = val.children[0]?.children[0]?.children[1] as HTMLElement | null
          if (textGrandChild !== null) {
            // console.log(textGrandChild)
            // console.log(
            //   'text grandchild font family',
            //   textGrandChild.style.fontFamily
            // )
            if (
              textGrandChild.style.fontFamily === currentFontString ||
              textGrandChild.style.fontFamily === `docs-${currentFontString}`
            ) {
              fontWeightMenusFiltered.push(val as HTMLElement)
              // console.log('resolving with val', val)
              resolve(val as HTMLElement)
              resolved = true
              return
            }
          }
        }
      })
      if (!resolved) resolve(null)
    }, 0)
  )
  // console.log(fontWeightMenu)
  if (!fontWeightMenu) {
    clickEl(currentFont) // Close menu
    // console.error('unable to find font weight menu')
    return
  }
  dispatchMouseEvent(fontWeightMenu as HTMLElement, 'mouseover')
  let i = 0
  for (; i < fontWeightMenu.children.length; i++) {
    // console.log(fontWeightMenu.children[i].textContent)
    if (fontWeightMenu.children[i].textContent === val) {
      // console.log('Clicking child ' + i)
      // console.log(fontWeightMenu.children[i])
      dispatchMouseEvent(fontWeightMenu as HTMLElement, 'mouseover')
      clickEl(fontWeightMenu.children[i] as HTMLElement)
      break
    }
  }
}

export const fontSize = async (val: string) => {
  const fontSizeInputElement = document.getElementById('fontSizeSelect')?.children[0].children[0].children[0]
    .children[0] as HTMLInputElement | null
  if (!fontSizeInputElement) {
    console.log('fontSize not found')
    return
  }
  clickEl(fontSizeInputElement)
  fontSizeInputElement.value = val

  // hitting tab to submit the input (not enter because it just doesn't work smh)
  const ke = new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    keyCode: 9
  })
  // https://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
  await new Promise<void>(resolve =>
    setTimeout(() => {
      fontSizeInputElement.dispatchEvent(ke)
      resolve()
    }, 0)
  )
  return
}
