import { executeAddon } from './actions/addon'
import { bold, toggleBold } from './actions/bold'
import { highlight, textColor } from './actions/color'
import { fontFamily, fontSize, fontWeight } from './actions/font'
import { italicize, toggleItalics } from './actions/italics'
import { align, clearFormatting, heading, indent } from './actions/page'
import { toggleUnderline, underline } from './actions/underline'

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
  | 'in'
  | 'ub'
  | 'uu'
  | 'ui'
  | 'ht'
  | 'tt'
  | 'ex'
const getActionType = (s: string): ActionType => (s.indexOf('#') === -1 ? s : s.substring(0, s.indexOf('#'))) as ActionType
const getActionConfig = (s: string): string => (s.indexOf('#') !== -1 ? s.substring(s.indexOf('#') + 1) : '')

console.log('LOADED')

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
      case 'in': {
        indent(config)
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
