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

export const indent = async (num_string: string) => {
  let num: number = parseInt(num_string)
  if (num === 0) return // Do nothing

  const menubarElement = document.getElementById('docs-menubar')
  if (!menubarElement) {
    throw new Error('unable to change indentation')
  }
  let formatMenu: HTMLCollection | null = null
  for (let i = 0; i < menubarElement.children.length; i++) {
    const menu = menubarElement.children[i] as HTMLElement
    if (menu.innerHTML === 'Format') {
      clickEl(menu)
      formatMenu = document.getElementsByClassName('docs-menu-attached-button-above')[0]?.children as HTMLCollection
      break
    }
  }

  if (formatMenu === null) {
    throw new Error('unable to change indentation')
  }

  const alignIndentButton = formatMenu[5] as HTMLDivElement
  if (alignIndentButton.innerText !== 'Align & indent') {
    throw new Error('unable to change indentation - assertion failed!')
  }
  clickEl(alignIndentButton)
  await new Promise<void>(resolve => {
    let numTries = 0
    var interval = setInterval(() => {
      const popups = document.getElementsByClassName(
        'goog-menu goog-menu-vertical docs-material ia-menu apps-menu-hide-mnemonics'
      )
      numTries++
      console.log(numTries + ' tries')
      console.log(popups.length)
      console.log(popups)
      let popup: HTMLDivElement | null = null
      for (let i = 0; i < popups.length; i++) {
        if (window.getComputedStyle(popups[i]).display === 'block' && i > 2) {
          console.log(popups[i])
          const increaseButton = popups[i].children[5] as HTMLElement
          const decreaseButton = popups[i].children[6] as HTMLElement
          if (num > 0 && (!increaseButton || increaseButton.innerText !== 'Increase indent\nCtrl+]')) {
            throw new Error('unable to change indentation - increase button not found!')
          }
          if (num < 0 && (!decreaseButton || decreaseButton.innerText !== 'Decrease indent\nCtrl+[')) {
            throw new Error('unable to change indentation - decrease button not found!')
          }
          while (num > 0) {
            clickEl(increaseButton)
            num--
          }
          while (num < 0) {
            clickEl(decreaseButton)
            num++
          }
          clearInterval(interval)
          break
        }
      }
      if (numTries > 10) {
        clearInterval(interval)
        throw new Error('unable to change indentation - 10 attempts, no success :(')
      }
      console.log(popup)
      resolve()
    }, 50)
  })
}
