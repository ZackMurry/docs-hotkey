import { FC } from 'react'
import { Box, Heading, Text, Link as ChakraLink, UnorderedList, ListItem, OrderedList, Code } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

// todo: responsiveness
const IntroductionSection: FC = () => {
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
      <UnorderedList color='bodyText' fontSize='13pt' mt='5px'>
        <ListItem>Highlight in any color</ListItem>
        <ListItem>Bold</ListItem>
        <ListItem>Underline</ListItem>
        <ListItem>Italicize</ListItem>
        <ListItem>Change fonts</ListItem>
        <ListItem>Change font size</ListItem>
        <ListItem>Set heading type (e.g., Heading 1, Normal Text, Title)</ListItem>
        <ListItem>Clear all styles (and remove specific styles)</ListItem>
        <ListItem>Execute add-ons</ListItem>
      </UnorderedList>
      <Box my='10px'>
        <iframe
          width='560'
          height='315'
          src='https://www.youtube-nocookie.com/embed/XHJ9cBlmpQE?controls=0'
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </Box>
      <Heading fontSize='24pt' color='headingText' my='15px'>
        Installation
      </Heading>
      <Text fontSize='13pt' color='bodyText'>
        Docs Hotkey is published on the Chrome Web Store{' '}
        <ChakraLink
          href='https://chrome.google.com/webstore/detail/docs-hotkey/npkpplmpfeaeemeecniaikpjjfbfefhh'
          color='docsBlue'
          isExternal
        >
          here <ExternalLinkIcon fontSize='sm' mx='1px' mt='-3px' />
        </ChakraLink>{' '}
        . After installing the extension or updating a hotkey, you may need to refresh any Google Docs tabs. Docs Hotkey
        never sends any of your data out of your computer.
      </Text>
      <Heading fontSize='18pt' color='subheadingText' my='10px'>
        Building from source
      </Heading>
      <Text fontSize='13pt' color='bodyText'>
        If you'd like to build Docs Hotkey from its source code, follow these steps:
      </Text>
      <OrderedList color='bodyText' fontSize='13pt' mt='5px'>
        <ListItem>
          Clone the repository from Github with the command{' '}
          <Code bg='codeBg' color='codeText' borderRadius='3px' px='5px' py='2px'>
            git clone https://github.com/ZackMurry/docs-hotkey
          </Code>
          .
        </ListItem>
        <ListItem>
          Install{' '}
          <ChakraLink
            href='https://chrome.google.com/webstore/detail/docs-hotkey/npkpplmpfeaeemeecniaikpjjfbfefhh'
            color='docsBlue'
            isExternal
          >
            Node.js <ExternalLinkIcon fontSize='sm' mx='1px' mt='-3px' />
          </ChakraLink>
          .
        </ListItem>
        <ListItem>
          Install the project's dependencies with{' '}
          <Code bg='codeBg' color='codeText' borderRadius='3px' px='5px' py='2px'>
            npm install
          </Code>
        </ListItem>
        .
        <ListItem>
          Compile the project by executing{' '}
          <Code bg='codeBg' color='codeText' borderRadius='3px' px='5px' py='2px'>
            npm run build
          </Code>
        </ListItem>
        .
      </OrderedList>
      {/* todo: finish by showing how to zip it, enable developer mode, and add it as an extension*/}
    </Box>
  )
}

export default IntroductionSection
