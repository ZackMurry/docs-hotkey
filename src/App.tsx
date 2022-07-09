import React, { FC, useEffect, useState } from 'react'
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
import { colorMap } from './content'

// todo: add an MD file with instructions for use and then use a MD to HTML converter to serve that and have it open on install
// todo: error messages (including when actions are invalid)
const App: FC = () => {
  const [commands, setCommands] = useState<{ [internalName: string]: Command } | null>(null)
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
    setCommands({ ...commands, [internalName]: { ...commands[internalName], actions: actionsCopy } })
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
          config !== 'Normal text' &&
          config !== 'Title' &&
          config !== 'Subtitle' &&
          !config.match(/Heading [1-6]/)
        ) {
          addActionError(alias, index, 'invalid heading type')
          hasErrors = true
        } else if ((type === 'hl' || type === 'ht') && !colorMap.has(config) && config !== 'none') {
          addActionError(alias, index, 'invalid highlight color')
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
    setErrors(e => [...e, 'Error adding command: there are already 10 commands! Please free a slot before adding another.'])
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
                        onChange={e => setCommands({ ...commands, [internalName]: { actions, alias: e.target.value } })}
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
                      onClick={() => setCommands({ ...commands, [internalName]: { actions: [...actions, ''], alias } })}
                    >
                      Add action
                    </Button>
                    <Text m='3px' color='#777' fontSize='sm'>
                      This command is in shortcut slot {internalName.substring(4)}
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
        <Link ml='15px' fontSize='14px' color='#777' isExternal href='https://zackmurry.github.io/docs-hotkey'>
          Help
        </Link>
      </Flex>
    </Flex>
  )
}

export default App
