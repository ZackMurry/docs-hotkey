import { FC } from 'react'
import { Box, Heading, Text, Img } from '@chakra-ui/react'

const HighlightAction: FC = () => {
  return (
    <Box>
      <Heading fontSize='24pt' color='headingText' mb='15px'>
        Highlight Action
      </Heading>
      <Text fontSize='13pt' color='bodyText' mb='15px'>
        The Highlight action highlights the selected text with a customizable color. This action accepts any of the 80 colors
        on the Google Docs color palette.
      </Text>
      <Img
        src='/docs_color_palette.png'
        alt='Screenshot of the Google Docs color palette.'
        width={{ base: '225px', md: '250px', lg: '275px' }}
        height={{ base: '225px', md: '250px', lg: '275px' }}
      />
      <Text fontSize='13pt' color='bodyText' mb='15px' mt='15px'>
        In order to find the name of a color, simply open the highlight menu and hover over it. Type this name into the color
        field exactly to highlight with it. The same technique can be used for actions that change the text color.
      </Text>
      <Text fontSize='13pt' color='bodyText' mb='15px' mt='15px'>
        This action has a "toggle" checkbox. When this box is checked, it will unhighlight your selection if it is all
        highlighted in this color.
      </Text>
    </Box>
  )
}

export default HighlightAction
