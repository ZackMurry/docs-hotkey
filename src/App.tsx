import React, { FC, useEffect, useMemo, useState } from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Link,
  Text
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { Command } from './types'
import ActionDisplay, { getActionConfig, getActionType } from './ActionDisplay'
import { colorMap } from './colorMap'

const getSlotNumber = (input: string): string | null => {
  const match = input.match(/^slot9?(\d+)$/)
  return match ? match[1] : null
}

const commandShortcuts: { [internalName: string]: string } = {}
chrome.commands.getAll(commands => {
  commands.forEach(c => {
    if (c.name && c.shortcut) {
      commandShortcuts[c.name] = c.shortcut
    }
  })
})

// todo: change save button text to a checkmark after click
// todo: error messages (including when actions are invalid)
const App: FC = () => {
  const [commands, setCommands] = useState<{
    [internalName: string]: Command
  } | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  const onActionChange = (value: string, internalName: string, alias: string, actions: string[], index: number) => {
    const actionsCopy = actions.slice(0)
    actionsCopy[index] = value
    setCommands(c => ({ ...c, [internalName]: { alias, actions: actionsCopy } }))
  }

  const onDeleteAction = (internalName: string, index: number) => {
    if (commands === null) {
      setErrors(e => [
        ...e,
        `Error deleting action ${index + 1} in ${internalName}: commands haven't loaded yet, please try again`
      ])
      return
    }
    const actionsCopy = commands[internalName].actions.slice(0)
    actionsCopy.splice(index, 1)
    setCommands({
      ...commands,
      [internalName]: { ...commands[internalName], actions: actionsCopy }
    })
  }

  const onDeleteCommand = (internalName: string) => {
    if (commands === null) {
      setErrors(e => [...e, `Error deleting command in ${internalName}: commands haven't loaded yet, please try again`])
      return
    }
    const { [internalName]: removed, ...others } = commands
    setCommands(others)
  }

  const addActionError = (alias: string, index: number, message: string) => {
    setErrors(e => [...e, `Error in action ${index + 1} of ${alias}: ${message}`])
  }

  const onSave = () => {
    // Validate actions
    if (commands === null) {
      console.error('Unable to save')
      return
    }

    setErrors([])
    let hasErrors = false
    Object.entries(commands).forEach(([internalName, { alias, actions }]) => {
      actions.forEach((action, index) => {
        const type = getActionType(action)
        const config = getActionConfig(action).toLowerCase()
        if (type === 'al' && config !== 'left' && config !== 'center' && config !== 'right' && config !== 'justify') {
          addActionError(alias, index, 'the configuration for align must be one of `left`, `center`, `right`, or `justify`')
          hasErrors = true
        } else if ((type === 'cl' || type === 'ub' || type === 'uu' || type === 'ui') && config !== '') {
          addActionError(alias, index, 'this action type cannot have a configuration')
          hasErrors = true
        } else if (
          type === 'hd' &&
          config !== 'normal text' &&
          config !== 'title' &&
          config !== 'subtitle' &&
          !config.match(/heading [1-6]/)
        ) {
          console.log(config)
          addActionError(alias, index, 'invalid heading type')
          hasErrors = true
        } else if (
          (type === 'hl' || type === 'ht') &&
          !colorMap.has(config) &&
          config !== 'none' &&
          !config.startsWith('#')
        ) {
          addActionError(alias, index, 'invalid highlight color')
          hasErrors = true
        } else if ((type === 'tc' || type === 'tt') && !colorMap.has(config) && config !== 'none') {
          addActionError(alias, index, 'invalid text color')
          hasErrors = true
        } else if ((type === 'b' || type === 'u' || type === 'i') && config !== '' && config !== 'toggle') {
          addActionError(alias, index, 'unknown configuration')
        }
      })
    })
    if (!hasErrors) {
      chrome.storage.sync.set({ commands })
    }
  }

  const findOpenCommandSlot = (): string => {
    if (!commands) {
      setErrors(e => [...e, "Error adding command: commands haven't loaded yet, please try again"])
      return ''
    }
    for (let i = 1; i < 10; i++) {
      if (commands[`slot${i}`] === undefined) {
        return `slot${i}`
      }
    }
    // Terrible way of handling things, but we need slot ids to be
    // in alphabetical order without modifying the first 9 slots... (to not break old hotkeys)
    // so the first 9 are slot1, slot2, ..., slot9. The next are slot910, slot911, ...
    for (let i = 10; i <= 15; i++) {
      if (commands[`slot9${i}`] === undefined) {
        return `slot9${i}`
      }
    }
    setErrors(e => [...e, 'Error adding command: there are already 15 commands! Please free a slot before adding another.'])
    return ''
  }

  const onAddCommand = () => {
    const slot = findOpenCommandSlot()
    if (slot !== '') {
      setCommands({
        ...commands,
        [slot]: { alias: 'New Command', actions: [''] }
      })
    }
  }

  useEffect(() => {
    chrome.storage.sync.get(['commands'], result => {
      console.log('commands: ' + JSON.stringify(result.commands))
      setCommands(result.commands ?? {})
    })
  }, [])

  return (
    <Flex flexDir='column' justifyContent='space-between' w={325} h={400}>
      <Box>
        <Box bg='docsBlue' p='5px'>
          <Heading color='white' ml='5px'>
            Docs Hotkey
          </Heading>
        </Box>
        {commands && (
          <>
            <Accordion allowMultiple>
              {Object.entries(commands).map(([internalName, { actions, alias }]) => (
                <AccordionItem key={internalName}>
                  <AccordionButton>
                    <Heading as='h6' fontSize='14px'>
                      {alias}
                    </Heading>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <Flex alignItems='center'>
                      <FormLabel pt='8px' fontSize='14px'>
                        Name:
                      </FormLabel>
                      <Input
                        size='sm'
                        value={alias}
                        onChange={e =>
                          setCommands({
                            ...commands,
                            [internalName]: { actions, alias: e.target.value }
                          })
                        }
                        my='5px'
                      />
                      <IconButton
                        ml='3px'
                        bg='transparent'
                        size='sm'
                        icon={<DeleteIcon fontSize='sm' color='red.400' />}
                        aria-label='Delete command'
                        onClick={() => onDeleteCommand(internalName)}
                      />
                    </Flex>
                    <Heading as='h6' fontSize='14px' mt='5px'>
                      Actions
                    </Heading>
                    <Box>
                      {actions.map((action, index) => (
                        // I'm using the index as a key, fight me (bc the order won't change and adding an id would increase complexity)
                        <Box key={`action-${index}`}>
                          <ActionDisplay
                            value={action}
                            onChange={v => onActionChange(v, internalName, alias, actions, index)}
                            onDelete={() => onDeleteAction(internalName, index)}
                          />
                        </Box>
                      ))}
                    </Box>
                    <Button
                      fontWeight='normal'
                      textDecor='underline'
                      m='3px'
                      color='#777'
                      size='sm'
                      variant='link'
                      onClick={() =>
                        setCommands({
                          ...commands,
                          [internalName]: { actions: [...actions, ''], alias }
                        })
                      }
                    >
                      Add action
                    </Button>
                    <Text m='3px' color='#777' fontSize='sm'>
                      Shortcut slot {getSlotNumber(internalName)}
                      {commandShortcuts[internalName] && `: ${commandShortcuts[internalName]}`}
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            <Button
              fontWeight='normal'
              textDecor='underline'
              m='5px'
              ml='15px'
              mt='10px'
              color='#777'
              size='sm'
              variant='link'
              onClick={onAddCommand}
            >
              Add command
            </Button>
          </>
        )}
        <Box>
          <Button
            color='#fff'
            mt='10px'
            ml='15px'
            mb='10px'
            borderRadius='3px'
            size='sm'
            variant='filled'
            bg='docsBlue'
            _hover={{ bg: 'docsBlueHover' }}
            _active={{ bg: 'docsBlueClick' }}
            onClick={onSave}
          >
            Save All
          </Button>
        </Box>
        <Box pb='20px' ml='15px' mr='20px'>
          {errors.map(e => (
            <Text fontWeight='bold' color='red.400' size='sm' mt='5px'>
              {e}
            </Text>
          ))}
        </Box>
      </Box>
      <Flex w='100%' justifyContent='center' mb='10px'>
        <Link ml='15px' fontSize='14px' color='#777' isExternal href='https://docs-hotkey.zackmurry.com'>
          Help
        </Link>
        <Link ml='15px' fontSize='14px' color='#777' isExternal href='https://ko-fi.com/zackmurry'>
          Donate
        </Link>
      </Flex>
    </Flex>
  )
}

export default App
