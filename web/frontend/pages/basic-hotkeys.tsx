import { FC } from 'react'
import { Box, Heading, Text, Link as ChakraLink, UnorderedList, ListItem, OrderedList, Code } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const BasicHotkeysSection: FC = () => {
  return (
    <Box>
      {/* purpose, key terms, installation */}
      <Heading fontSize='24pt' color='headingText' mb='15px'>
        Background
      </Heading>
      <Text fontSize='13pt' color='bodyText'>
        Docs Hotkey is a free,{' '}
        <ChakraLink href='https://github.com/ZackMurry/docs-hotkey' color='docsBlue' isExternal>
          open-source <ExternalLinkIcon fontSize='sm' mx='1px' mt='-3px' />
        </ChakraLink>{' '}
        Chrome extension that allows users to create custom keyboard shortcuts for formatting in Google Docs. Originally, it
        was made solely to add a highlighting shortcut, but other formatting shortcuts have since been added. Docs Hotkey can
        currently:
      </Text>
    </Box>
  )
}

export default BasicHotkeysSection
