import {colorMap} from './colorMap'

type ActionType =
  | 'b'
  | 'u'
  | 'hl'
  | 'i'
  | 'tc'
  | 'ff'
  | 'fs'
  | 'fw'
  | 'hd'
  | 'cl'
  | 'al'
  | 'ub'
  | 'uu'
  | 'ui'
  | 'ht'
  | 'tt'
  | 'ex'
const getActionType = (s: string): ActionType =>
  (s.indexOf('#') === -1 ? s : s.substring(0, s.indexOf('#'))) as ActionType
const getActionConfig = (s: string): string =>
  s.indexOf('#') !== -1 ? s.substring(s.indexOf('#') + 1) : ''

console.log('LOADED')

interface Command {
  actions: string[]
  alias: string
}

let commands: {[internalName: string]: Command} = {}

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
/*
const dispatchMouseEvent = (target, event) => {
  if (!target) {
    return false
  }
  var e = document.createEvent('MouseEvents')
  e.initEvent.apply(e, [event, true, true])
  target.dispatchEvent(e)
  return true
}

const clickEl = (el) => {
  dispatchMouseEvent(el, 'mouseover')
  dispatchMouseEvent(el, 'mousedown')
  dispatchMouseEvent(el, 'click')
  dispatchMouseEvent(el, 'mouseup')
}
*/

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
  if (
    inverse === boldElement.classList.contains('goog-toolbar-button-checked')
  ) {
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
  if (
    inverse ===
    underlineElement.classList.contains('goog-toolbar-button-checked')
  ) {
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
  if (
    inverse ===
    italicizeElement.classList.contains('goog-toolbar-button-checked')
  ) {
    toggleItalics()
  }
}

const fontFamily = (val: string) => {
  const fontFamilyElement = document.getElementById('docs-font-family')
  if (!fontFamilyElement) {
    throw new Error('unable to change font family')
  }
  clickEl(fontFamilyElement)
  let allFontContainer = document.getElementsByClassName(
    'docs-fontmenu-fonts'
  )[0]
  for (let i = 0; i < allFontContainer.children.length; i++) {
    const fontElement = allFontContainer.children[i] as HTMLElement
    const fontText = fontElement.children[0].children[1].innerHTML
    if (fontText.toLowerCase() === val.toLowerCase()) {
      clickEl(fontElement)
      break
    }
  }
}

const fontWeight = async (val: string) => {
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
      currentFontString = fontMenu.children[i].textContent
        ?.replaceAll('►', '')
        .trim()
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
      const fontWeightMenuQuery = document.querySelectorAll(
        'div[role="menu"]:not([display="none"])'
      )
      // console.log(fontWeightMenuQuery)
      const fontWeightMenusFiltered: HTMLElement[] = []
      let resolved = false
      fontWeightMenuQuery.forEach(val => {
        if (!resolved && val.classList.length === 2) {
          // console.log('2 class length', val)
          const textGrandChild = val.children[0]?.children[0]
            ?.children[1] as HTMLElement | null
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

// todo add option to do/not do this when highlighting (along with everything else, like if bold, don't unbold)
const unhighlight = () => {
  const unselectEl = document.getElementsByClassName(
    'goog-menuitem colormenuitems-no-color'
  )[0].children[0].children[0].children[0] as HTMLElement
  if (!unselectEl) {
    throw new Error('unable to unhighlight')
  }
  clickEl(unselectEl)
  clickEl(unselectEl)
}

const highlightHex = (color: string, toggle: boolean) => {
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

const textColor = (color: string, toggle: boolean = false) => {
  let dropdownElement = document.getElementById('textColorButton')
  if (!dropdownElement) {
    throw new Error('unable to change text color: no dropdown element found')
  }
  clickEl(dropdownElement)
  if (color.toLowerCase() === 'none') {
    unhighlight()
    return
  }
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

const fontSize = async (val: string) => {
  const fontSizeInputElement = document.getElementById('fontSizeSelect')
    ?.children[0].children[0].children[0].children[0] as HTMLInputElement | null
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
    keyCode: 9,
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
  const clearFormattingElement = document.getElementById(
    'clearFormattingButton'
  )
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
      addon = document.getElementsByClassName(
        'docs-menu-attached-button-above'
      )[0]?.children as HTMLCollection
      break
    }
  }
  if (!addon) {
    throw new Error('unable to execute add-on')
  }
  for (let j = 0; j < addon.length; j++) {
    if ((addon[j]?.children[0] as HTMLElement)?.innerText === parts[0]) {
      clickEl(addon[j].children[0] as HTMLElement)
      await new Promise<void>(resolve => {
        var interval = setInterval(() => {
          const popups = document.getElementsByClassName(
            'goog-menu goog-menu-vertical docs-material ia-menu apps-menu-hide-mnemonics'
          )
          outer: for (let k = 0; k < popups.length; k++) {
            if (window.getComputedStyle(popups[k]).display === 'block') {
              for (let l = 0; l < popups[k].children.length; l++) {
                if (
                  (popups[k]?.children[l]?.children[0] as HTMLElement | null)
                    ?.innerText === parts[1]
                ) {
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
      case 'tc': {
        textColor(config)
        break
      }
      case 'tt': {
        textColor(config, true)
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
      case 'fw': {
        fontWeight(config)
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
  console.log('received: ' + req.command)
  if (new URL(document.location.href).host !== 'docs.google.com') {
    sendRes('0')
    return
  }
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
