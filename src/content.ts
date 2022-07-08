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

// i literally don't care... thank god for vim
export const colorMap = new Map(
  Object.entries({
    black: 100,
    'dark gray 4': 101,
    'dark gray 3': 102,
    'dark gray 2': 103,
    'dark gray 1': 104,
    gray: 105,
    'light gray 1': 106,
    'light gray 2': 107,
    'light gray 3': 108,
    white: 109,
    'red berry': 110,
    red: 111,
    orange: 112,
    yellow: 113,
    green: 114,
    cyan: 115,
    'cornflower blue': 116,
    blue: 117,
    purple: 118,
    magenta: 119,
    'light red berry 3': 120,
    'light red 3': 121,
    'light orange 3': 122,
    'light yellow 3': 123,
    'light green 3': 124,
    'light cyan 3': 125,
    'light cornflower blue 3': 126,
    'light blue 3': 127,
    'light purple 3': 128,
    'light magenta 3': 129,
    'light red berry 2': 130,
    'light red 2': 131,
    'light orange 2': 132,
    'light yellow 2': 133,
    'light green 2': 134,
    'light cyan 2': 135,
    'light cornflower blue 2': 136,
    'light blue 2': 137,
    'light purple 2': 138,
    'light magenta 2': 139,
    'light red berry 1': 140,
    'light red 1': 141,
    'light orange 1': 142,
    'light yellow 1': 143,
    'light green 1': 144,
    'light cyan 1': 145,
    'light cornflower blue 1': 146,
    'light blue 1': 147,
    'light purple 1': 148,
    'light magenta 1': 149,
    'dark red berry 1': 150,
    'dark red 1': 151,
    'dark orange 1': 152,
    'dark yellow 1': 153,
    'dark green 1': 154,
    'dark cyan 1': 155,
    'dark cornflower blue 1': 156,
    'dark blue 1': 157,
    'dark purple 1': 158,
    'dark magenta 1': 159,
    'dark red berry 2': 160,
    'dark red 2': 161,
    'dark orange 2': 162,
    'dark yellow 2': 163,
    'dark green 2': 164,
    'dark cyan 2': 165,
    'dark cornflower blue 2': 166,
    'dark blue 2': 167,
    'dark purple 2': 168,
    'dark magenta 2': 169,
    'dark red berry 3': 170,
    'dark red 3': 171,
    'dark orange 3': 172,
    'dark yellow 3': 173,
    'dark green 3': 174,
    'dark cyan 3': 175,
    'dark cornflower blue 3': 176,
    'dark blue 3': 177,
    'dark purple 3': 178,
    'dark magenta 3': 179
  })
)

// todo: toggle highlight option
// todo: custom hex value in a future version?
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
  if (!colorMap.has(color)) {
    throw new Error('unknown color!')
  }

  // if this color is already selected, unselect it. else select it
  // if (highlightElContainer.classList.contains('docs-material-colorpalette-cell-selected')) {
  // unhighlight()
  // } else {
  const highlightEl = document.getElementById(`docs-material-colorpalette-cell-${colorMap.get(color)}`)
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
