import { executeAddon } from './actions/addon'
import { bold, toggleBold } from './actions/bold'
import clickEl from './actions/clickEl'
import { highlight, textColor } from './actions/color'
import { reactWithEmoji } from './actions/comment'
import { fontFamily, fontSize, fontWeight } from './actions/font'
import { italicize, toggleItalics } from './actions/italics'
import { align, bulletList, clearFormatting, heading, indent, spaceList } from './actions/page'
import { searchMenu } from './actions/search'
import { toggleUnderline, underline, strikethrough, capitalize } from './actions/format'
import { isSlides } from './colorMap'

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
  | 'st'
  | 'cp'
  | 'er'
  | 'bl'
  | 'ls'
  | 'ub'
  | 'uu'
  | 'ui'
  | 'ht'
  | 'tt'
  | 'lst'
  | 'ex'
  | 'sm'
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

// todo: catch errors so that later actions can still run
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
        await fontWeight(config)
        break
      }
      case 'hd': {
        await heading(config)
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
      case 'st': {
        await strikethrough()
        break
      }
      case 'in': {
        await indent(config)
        break
      }
      case 'cp': {
        await capitalize(config)
        break
      }
      case 'er': {
        reactWithEmoji(config)
        break
      }
      case 'bl': {
        bulletList(config)
        break
      }
      case 'ls': {
        spaceList(config, false)
        break
      }
      case 'lst': {
        spaceList(config, true)
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
      case 'sm': {
        await searchMenu(config)
        break
      }
      default: {
        console.error('unknown command: ', commandString, actionType, config)
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
