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
    if (fontText.toLowerCase() === val.toLowerCase()) {
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
    black: 90,
    'dark gray 4': 91,
    'dark gray 3': 92,
    'dark gray 2': 93,
    'dark gray 1': 94,
    gray: 95,
    'light gray 1': 96,
    'light gray 2': 97,
    'light gray 3': 98,
    white: 99,
    'red berry': 100,
    red: 101,
    orange: 102,
    yellow: 103,
    green: 104,
    cyan: 105,
    'cornflower blue': 106,
    blue: 107,
    purple: 108,
    magenta: 109,
    'light red berry 3': 110,
    'light red 3': 111,
    'light orange 3': 112,
    'light yellow 3': 113,
    'light green 3': 114,
    'light cyan 3': 115,
    'light cornflower blue 3': 116,
    'light blue 3': 117,
    'light purple 3': 118,
    'light magenta 3': 119,
    'light red berry 2': 120,
    'light red 2': 121,
    'light orange 2': 122,
    'light yellow 2': 123,
    'light green 2': 124,
    'light cyan 2': 125,
    'light cornflower blue 2': 126,
    'light blue 2': 127,
    'light purple 2': 128,
    'light magenta 2': 129,
    'light red berry 1': 130,
    'light red 1': 131,
    'light orange 1': 132,
    'light yellow 1': 133,
    'light green 1': 134,
    'light cyan 1': 135,
    'light cornflower blue 1': 136,
    'light blue 1': 137,
    'light purple 1': 138,
    'light magenta 1': 139,
    'dark red berry 1': 140,
    'dark red 1': 141,
    'dark orange 1': 142,
    'dark yellow 1': 143,
    'dark green 1': 144,
    'dark cyan 1': 145,
    'dark cornflower blue 1': 146,
    'dark blue 1': 147,
    'dark purple 1': 148,
    'dark magenta 1': 149,
    'dark red berry 2': 150,
    'dark red 2': 151,
    'dark orange 2': 152,
    'dark yellow 2': 153,
    'dark green 2': 154,
    'dark cyan 2': 155,
    'dark cornflower blue 2': 156,
    'dark blue 2': 157,
    'dark purple 2': 158,
    'dark magenta 2': 159,
    'dark red berry 3': 160,
    'dark red 3': 161,
    'dark orange 3': 162,
    'dark yellow 3': 163,
    'dark green 3': 164,
    'dark cyan 3': 165,
    'dark cornflower blue 3': 166,
    'dark blue 3': 167,
    'dark purple 3': 168,
    'dark magenta 3': 169
  })
)

// todo: custom hex value in a future version?
const highlight = (color: string, toggle: boolean = false) => {
  let dropdownElement = document.getElementById('bgColorButton')
  if (!dropdownElement) {
    throw new Error('unable to highlight')
  }
  clickEl(dropdownElement)
  if (color.toLowerCase() === 'none') {
    unhighlight()
    return
  }
  if (!colorMap.has(color.toLowerCase())) {
    throw new Error('unknown color!')
  }

  const highlightEl = document.getElementById(`docs-material-colorpalette-cell-${colorMap.get(color.toLowerCase())}`)
  if (!highlightEl) {
    throw new Error('unable to highlight')
  }
  if (toggle && highlightEl.classList.contains('docs-material-colorpalette-cell-selected')) {
    unhighlight()
  } else {
    clickEl(highlightEl)
  }
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

const align = (val: string) => {
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

const clearFormatting = () => {
  const clearFormattingElement = document.getElementById('clearFormattingButton')
  if (!clearFormattingElement) {
    throw new Error('unable to clear formatting')
  }
  clickEl(clearFormattingElement)
}

const executeAddon = async (config: string) => {
  const menubarElement = document.getElementById('docs-menubar')
  if (!menubarElement) {
    throw new Error('unable to execute add-on')
  }
  const parts = config.split('.')
  if (parts.length !== 2) {
    throw new Error('invalid add-on protocol')
  }
  let addon: HTMLCollection | null = null
  for (let i = 0; i < menubarElement.children.length; i++) {
    const menu = menubarElement.children[i] as HTMLElement
    if (menu.innerHTML === 'Extensions') {
      clickEl(menu)
      addon = document.getElementsByClassName('docs-menu-attached-button-above')[0]?.children as HTMLCollection
      break
    }
  }
  if (!addon) {
    throw new Error('unable to execute add-on')
  }
  for (let j = 0; j < addon.length; j++) {
    if ((addon[j]?.children[0] as HTMLElement)?.innerText === parts[0] + '\n►') {
      clickEl(addon[j].children[0] as HTMLElement)
      await new Promise<void>(resolve => {
        var interval = setInterval(() => {
          const popups = document.getElementsByClassName(
            'goog-menu goog-menu-vertical docs-material ia-menu apps-menu-hide-mnemonics'
          )
          outer: for (let k = 0; k < popups.length; k++) {
            if (window.getComputedStyle(popups[k]).display === 'block') {
              for (let l = 0; l < popups[k].children.length; l++) {
                if ((popups[k]?.children[l]?.children[0] as HTMLElement | null)?.innerText === parts[1]) {
                  console.log(popups[k].children[l])
                  clearInterval(interval)
                  clickEl(popups[k].children[l] as HTMLElement)
                  break outer
                }
              }
            }
          }
          resolve()
        }, 50)
      })
      break
    }
  }
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
      case 'ht': {
        highlight(config, true)
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
      case 'ex': {
        await executeAddon(config)
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
    console.error(e)
    sendRes('0')
  }
})

export {}
