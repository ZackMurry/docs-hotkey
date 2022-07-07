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
  Text
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { Command } from './types'
import ActionDisplay from './ActionDisplay'

// todo: add an MD file with instructions for use and then use a MD to HTML converter to serve that and have it open on install
// todo: error messages (including when actions are invalid)
const App: FC = () => {
  const [commands, setCommands] = useState<{ [internalName: string]: Command } | null>(null)

  const onActionChange = (value: string, internalName: string, alias: string, actions: string[], index: number) => {
    const actionsCopy = actions.slice(0)
    actionsCopy[index] = value
    setCommands(c => ({ ...c, [internalName]: { alias, actions: actionsCopy } }))
  }

  const onDeleteAction = (internalName: string, index: number) => {
    if (commands === null) {
      console.error('Unable to delete action because commands is null')
      return
    }
    const actionsCopy = commands[internalName].actions.slice(0)
    actionsCopy.splice(index, 1)
    setCommands({ ...commands, [internalName]: { ...commands[internalName], actions: actionsCopy } })
  }

  const onDeleteCommand = (internalName: string) => {
    if (commands === null) {
      console.error('Unable to delete command because commands is null')
      return
    }
    const { [internalName]: removed, ...others } = commands
    setCommands(others)
  }

  const onSave = () => {
    chrome.storage.sync.set({ commands })
  }

  const findOpenCommandSlot = (): string => {
    if (!commands) {
      throw new Error('Unable to add command because commands is null')
    }
    for (let i = 1; i < 10; i++) {
      if (commands[`slot${i}`] === undefined) {
        return `slot${i}`
      }
    }
    // todo: show error message, because this could actually happen bc if the user already has 10 commands
    throw new Error('Unable to add command because there are already 10 commands!')
  }

  useEffect(() => {
    chrome.storage.sync.get(['commands'], result => {
      console.log('commands: ' + JSON.stringify(result.commands))
      setCommands(result.commands ?? {})
    })
  }, [])

  return (
    <Box w={300} h={400}>
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
                      <Box key={`action-${action}-${index}`}>
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
            onClick={() =>
              setCommands({
                ...commands,
                [findOpenCommandSlot()]: { alias: 'New Command', actions: [''] }
              })
            }
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
          mb='20px'
          borderRadius='3px'
          size='sm'
          variant='filled'
          bg='docsBlue'
          _hover={{ bg: 'docsBlueHover' }}
          onClick={onSave}
        >
          Save All
        </Button>
      </Box>
    </Box>
  )
}

export default App
