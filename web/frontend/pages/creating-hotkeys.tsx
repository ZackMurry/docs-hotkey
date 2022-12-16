import { FC } from 'react'
import { Box, Heading, Text, Link, Img, Stack } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'

const CreatingHotkeysSection: FC = () => {
  return (
    <Box>
      <Heading fontSize='24pt' color='headingText' mb='15px'>
        Create a command
      </Heading>
      <Stack direction={{ base: 'column', lg: 'row' }}>
        <Box>
          <Text fontSize='13pt' color='bodyText' mb='15px'>
            Docs Hotkey works by linking keyboard shortcuts to a list of operations to perform, known as a command. To create
            your first command, click on the Docs Hotkey extension and click "Add command". Then, click on the new command to
            open a dropdown. Edit the name field to give your command a name.
          </Text>
          <Heading fontSize='24pt' color='headingText' mb='15px'>
            Create actions
          </Heading>
          <Text fontSize='13pt' color='bodyText' mb='10px'>
            Next, each action that the command needs to perform needs to be added. In this example, we'll make a command that
            highlights the selected text. Under the label "Actions", click "Select action type". A field for changing the
            color will appear. By default, the Highlight action uses yellow.{' '}
            <Link href='/highlight' color='docsBlue'>
              Here
            </Link>{' '}
            is a page with all of the available colors. To learn about other advanced actions, use the navigation menu.
          </Text>
          <Text fontSize='13pt' color='bodyText' mb='10px'>
            You may see a checkbox on the right side of your action with the title "toggle". When this is checked, the action
            will, for example, unhighlight the selected text if it is already highlighted. In general, it does the opposite
            of the action if it is already done. Note: not all commands have this option.
          </Text>
          <Text fontSize='13pt' color='bodyText' mb='15px'>
            If you would like a command to perform multiple actions in a row, simply click the "Add action" button and create
            your next actions. Once you are finished, click "Save all".
          </Text>
        </Box>
        <Img
          src='/highlight_command.png'
          alt='Screenshot of a command that toggles highlight yellow on the selected text.'
          width={{ base: '225px', md: '250px', lg: '275px' }}
          height={{ base: '270px', md: '300px', lg: '350px' }}
        />
      </Stack>
      <Heading fontSize='24pt' color='headingText' mb='15px'>
        Create a shortcut
      </Heading>
      <Text fontSize='13pt' color='bodyText' mb='10px'>
        The final step is to link a keyboard shortcut to the command. Visit{' '}
        <Link color='bodyText' onClick={() => navigator.clipboard.writeText('chrome://extensions/shortcuts')}>
          chrome://extensions/shortcuts <CopyIcon fontSize='sm' mx='1px' mt='-3px' />
        </Link>
        and find Docs Hotkey. Find which shortcut slot your command is in through the extensions. For example, the command in
        the screenshot is in shortcut slot 1. Click the edit button for "Slot 1" and enter the keyboard shortcut you would
        like to use for the hotkey. Your hotkey is now set up! You may need to refresh your Google Docs tabs for your changes
        take effect.
      </Text>
    </Box>
  )
}

export default CreatingHotkeysSection
