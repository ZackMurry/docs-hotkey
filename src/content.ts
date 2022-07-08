// todo: unbold, ununderline, unitalicize (maybe through remove checkbox)

import { getActionType } from './ActionDisplay'

interface Command {
  actions: string[]
  alias: string
}

let commands: { [internalName: string]: Command } = {}

chrome.storage.sync.get(['commands'], result => {
  console.log('commands: ' + JSON.stringify(result.commands))
  commands = result.commands
})

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes['commands'] !== null) {
    commands = changes['commands'].newValue
    console.log('new commands: ' + JSON.stringify(commands))
  }
})

const dispatchMouseEvent = (target: HTMLElement, event: string) => {
  if (!target) {
    return false
  }
  var e = document.createEvent('MouseEvents')
  e.initEvent.apply(e, [event, true, true])
  target.dispatchEvent(e)
  return true
}

const clickEl = (el: HTMLElement) => {
  dispatchMouseEvent(el, 'mouseover')
  dispatchMouseEvent(el, 'mousedown')
  dispatchMouseEvent(el, 'click')
  dispatchMouseEvent(el, 'mouseup')
}

const toggleBold = () => {
  const boldElement = document.getElementById('boldButton')
  if (!boldElement) {
    throw new Error('unable to bold')
  }
  clickEl(boldElement)
}

const bold = (inverse: boolean = false) => {
  const boldElement = document.getElementById('boldButton')
  if (!boldElement) {
    throw new Error('unable to bold')
  }
  if (inverse === boldElement.classList.contains('goog-toolbar-button-checked')) {
    toggleBold()
  }
}

const toggleUnderline = () => {
  const underlineElement = document.getElementById('underlineButton')
  if (!underlineElement) {
    throw new Error('unable to underline')
  }
  clickEl(underlineElement)
}

const underline = (inverse: boolean = false) => {
  const underlineElement = document.getElementById('underlineButton')
  if (!underlineElement) {
    throw new Error('unable to underline')
  }
  if (inverse === underlineElement.classList.contains('goog-toolbar-button-checked')) {
    toggleUnderline()
  }
}

const toggleItalics = () => {
  const italicizeElement = document.getElementById('italicButton')
  if (!italicizeElement) {
    throw new Error('unable to italicize')
  }
  clickEl(italicizeElement)
}

const italicize = (inverse: boolean = false) => {
  const italicizeElement = document.getElementById('italicButton')
  if (!italicizeElement) {
    throw new Error('unable to italicize')
  }
  if (inverse === italicizeElement.classList.contains('goog-toolbar-button-checked')) {
    toggleItalics()
  }
}

const fontFamily = (val: string) => {
  const fontFamilyElement = document.getElementById('docs-font-family')
  if (!fontFamilyElement) {
    throw new Error('unable to change font family')
  }
  clickEl(fontFamilyElement)
  let allFontContainer = document.getElementsByClassName('docs-fontmenu-fonts')[0]
  for (let i = 0; i < allFontContainer.children.length; i++) {
    const fontElement = allFontContainer.children[i] as HTMLElement
    const fontText = fontElement.children[0].children[1].innerHTML
    if (fontText === val) {
      clickEl(fontElement)
      break
    }
  }
}

// todo add option to do/not do this when highlighting (along with everything else, like if bold, don't unbold)
const unhighlight = () => {
  const unselectEl = document.getElementsByClassName('goog-menuitem colormenuitems-no-color')[0].children[0].children[0]
    .children[0] as HTMLElement
  if (!unselectEl) {
    throw new Error('unable to unhighlight')
  }
  clickEl(unselectEl)
  clickEl(unselectEl)
}

const highlight = (color: string) => {
  let dropdownElement = document.getElementById('bgColorButton')
  if (!dropdownElement) {
    throw new Error('unable to highlight')
  }
  clickEl(dropdownElement)
  if (color === 'none') {
    unhighlight()
    return
  }
  if (color !== 'yellow') {
    throw new Error('unknown color!')
  }
  const highlightElContainer = document.getElementById('docs-material-colorpalette-cell-103')
  if (!highlightElContainer) {
    throw new Error('unable to highlight')
  }

  // if this color is already selected, unselect it. else select it
  // if (highlightElContainer.classList.contains('docs-material-colorpalette-cell-selected')) {
  // unhighlight()
  // } else {
  const highlightEl = document.getElementsByClassName('docs-material-colorpalette-colorswatch')[13] as HTMLElement
  if (!highlightEl) {
    throw new Error('unable to highlight')
  }
  clickEl(highlightEl)
  // }
}

const fontSize = async (val: string) => {
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

const heading = (val: string) => {
  const headingButtonElement = document.getElementById('headingStyleSelect')
  if (!headingButtonElement) {
    throw new Error('unable to set as heading')
  }
  clickEl(headingButtonElement)
  const headingListContainer = document.getElementsByClassName(
    'goog-menuitem goog-option-selected goog-option goog-submenu docs-halfhovermenuitem docs-submenuitem apps-menuitem goog-menuitem-highlight'
  )[0].parentNode as HTMLElement
  for (let i = 0; i < headingListContainer.children.length; i++) {
    const headingItemContainer = headingListContainer.children[i] as HTMLElement
    const headingText = headingItemContainer.children[0].children[1].innerHTML
    console.log(headingText)
    if (headingText === val) {
      clickEl(headingItemContainer)
      break
    }
  }
}

const align = (val: string) => {
  let element: HTMLElement | null
  if (val === 'left') {
    element = document.getElementById('alignLeftButton')
  } else if (val === 'center') {
    element = document.getElementById('alignCenterButton')
  } else if (val === 'right') {
    element = document.getElementById('alignRightButton')
  } else if (val === 'justify') {
    element = document.getElementById('alignJustifyButton')
  } else {
    throw new Error('unknown alignment option: ' + val)
  }
  if (!element) {
    throw new Error('unable to align to ' + val)
  }
  clickEl(element)
}

const clearFormatting = () => {
  const clearFormattingElement = document.getElementById('clearFormattingButton')
  if (!clearFormattingElement) {
    throw new Error('unable to clear formatting')
  }
  clickEl(clearFormattingElement)
}

const runActionsFromArray = async (input: string[]) => {
  for (const commandString of input) {
    const actionType = getActionType(commandString)
    const config = commandString.substring(commandString.indexOf('#') + 1)
    switch (actionType) {
      case 'b': {
        if (config === 'toggle') {
          toggleBold()
        } else {
          bold()
        }
        break
      }
      case 'u': {
        if (config === 'toggle') {
          toggleUnderline()
        } else {
          underline()
        }
        break
      }
      case 'i': {
        if (config === 'toggle') {
          toggleItalics()
        } else {
          italicize()
        }
        break
      }
      case 'hl': {
        highlight(config)
        break
      }
      case 'fs': {
        await fontSize(config)
        break
      }
      case 'ff': {
        fontFamily(config)
        break
      }
      case 'hd': {
        heading(config)
        break
      }
      case 'cl': {
        clearFormatting()
        break
      }
      case 'al': {
        align(config)
        break
      }
      case 'ub': {
        bold(true)
        break
      }
      case 'uu': {
        underline(true)
        break
      }
      case 'ui': {
        italicize(true)
        break
      }
      default: {
        console.error('unknown command: ', commandString)
      }
    }
  }
}

chrome.runtime.onMessage.addListener(async (req, sender, sendRes) => {
  // console.log('received: ' + req.command)
  const command = commands[req.command]
  if (!command) {
    throw new Error('unknown command ' + command)
  }
  // console.log('actions: ' + JSON.stringify(command.actions))
  try {
    await runActionsFromArray(command.actions)
    sendRes('1')
  } catch (e) {
    sendRes('0')
  }
})

export {}
