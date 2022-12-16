import { FC } from 'react'
import { Box, Heading, Text, Link, Img, Stack } from '@chakra-ui/react'

const HeadingAction: FC = () => {
  return (
    <Box>
      <Heading fontSize='24pt' color='headingText' mb='15px'>
        Heading Action
      </Heading>
      <Text fontSize='13pt' color='bodyText' mb='15px'>
        The Heading action changes the heading style of the text at the cursor.
      </Text>
      <Img
        src='/docs_heading_selection.png'
        alt='Screenshot of the Google Docs font selection menu.'
        width={{ base: '300px', md: '350px', lg: '375px' }}
        height={{ base: '250px', md: '300px', lg: '325px' }}
      />
      <Text fontSize='13pt' color='bodyText' mb='15px' mt='15px'>
        The available options for this command are all of the options on this menu — "Normal text", "Subtitle", "Heading 1",
        "Heading 2", and "Heading 3". In addition, Headings 4-6 can be accessed if they are first used manually, after which
        they appear on the menu.
      </Text>
      <Text fontSize='13pt' color='bodyText' mb='15px'>
        Note: this action is particularly unstable. Random changes to the Google Docs UI could break this.
      </Text>
    </Box>
  )
}

export default HeadingAction
