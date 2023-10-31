import { FC } from 'react'
import { Box, Heading, Text, Link, UnorderedList, ListItem, OrderedList, Code } from '@chakra-ui/react'
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'

const IntroductionSection: FC = () => {
  return (
    <Box>
      <Heading fontSize='24pt' color='headingText' mb='15px'>
        Background
      </Heading>
      <Text fontSize='13pt' color='bodyText'>
        Docs Hotkey is a free,{' '}
        <Link href='https://github.com/ZackMurry/docs-hotkey' color='docsBlue' isExternal>
          open-source <ExternalLinkIcon fontSize='sm' mx='1px' mt='-3px' />
        </Link>{' '}
        Chrome extension that allows users to create custom keyboard shortcuts for formatting in Google Docs. Originally, it
        was made solely to add a highlighting shortcut, but other formatting shortcuts have since been added. Docs Hotkey can
        currently:
      </Text>
      <UnorderedList color='bodyText' fontSize='13pt' mt='5px'>
        <ListItem>Highlight in any color</ListItem>
        <ListItem>Bold</ListItem>
        <ListItem>Underline</ListItem>
        <ListItem>Italicize</ListItem>
        <ListItem>Change text color</ListItem>
        <ListItem>Change fonts</ListItem>
        <ListItem>Change font size</ListItem>
        <ListItem>Set heading type (e.g., Heading 1, Normal Text, Title)</ListItem>
        <ListItem>Clear all styles (and remove specific styles)</ListItem>
        <ListItem>Execute add-ons</ListItem>
      </UnorderedList>
      <Box
        w={{ base: '250px', sm: '300px', md: '350px', lg: '450px' }}
        h={{ base: '150px', sm: '175px', md: '200px', lg: '250px' }}
        maxW='80vw'
        my='10px'
      >
        <iframe
          style={{ display: 'block' }}
          width='100%'
          height='100%'
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
        <Link
          href='https://chrome.google.com/webstore/detail/docs-hotkey/npkpplmpfeaeemeecniaikpjjfbfefhh'
          color='docsBlue'
          isExternal
        >
          here <ExternalLinkIcon fontSize='sm' mx='1px' mt='-3px' />
        </Link>{' '}
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
        </ListItem>
        <ListItem>
          Install{' '}
          <Link
            href='https://chrome.google.com/webstore/detail/docs-hotkey/npkpplmpfeaeemeecniaikpjjfbfefhh'
            color='docsBlue'
            isExternal
          >
            Node.js <ExternalLinkIcon fontSize='sm' mx='1px' mt='-3px' />
          </Link>
          .
        </ListItem>
        <ListItem>
          Install the project's dependencies with{' '}
          <Code bg='codeBg' color='codeText' borderRadius='3px' px='5px' py='2px'>
            npm install
          </Code>
        </ListItem>
        <ListItem>
          Compile the project by executing{' '}
          <Code bg='codeBg' color='codeText' borderRadius='3px' px='5px' py='2px'>
            npm run build
          </Code>
        </ListItem>
        <ListItem>
          Go to{' '}
          <Link color='bodyText' onClick={() => navigator.clipboard.writeText('chrome://extensions')}>
            chrome://extensions <CopyIcon fontSize='sm' mx='1px' mt='-3px' />
          </Link>
          .
        </ListItem>
        <ListItem>Click "Load unpacked" and select the "build" folder in the Docs Hotkey directory.</ListItem>
      </OrderedList>
      {/* todo: finish by showing how to zip it, enable developer mode, and add it as an extension*/}
    </Box>
  )
}

export default IntroductionSection
