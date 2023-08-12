import { FC } from 'react'
import { Box, Heading, Text, Img } from '@chakra-ui/react'

const FontAction: FC = () => {
  return (
    <Box>
      <Heading fontSize='24pt' color='headingText' mb='15px'>
        Font Action
      </Heading>
      <Text fontSize='13pt' color='bodyText' mb='15px'>
        The Font action changes the font family of the selected text using the font selection menu.
      </Text>
      <Img
        src='/docs_font_selection.png'
        alt='Screenshot of the Google Docs font selection menu.'
        width={{ base: '225px', md: '250px', lg: '275px' }}
        height={{ base: '225px', md: '250px', lg: '275px' }}
      />
      <Text fontSize='13pt' color='bodyText' mb='15px' mt='15px'>
        In order for this command to work, you need to make sure the font is on the font selection menu (either in the short
        list of recent fonts or in the longer list below it). The "More fonts" screen allows you to configure which fonts
        appear on the menu. Once your font is on the menu, simply type its name into the configuration box.
      </Text>
      <Heading fontSize='24pt' color='headingText' mb='15px'>
        Font Weight
      </Heading>
      <Text fontSize='13pt' color='bodyText' mb='15px'>
        Additionally, the Font Weight action can be used to change the weight of the currently selected font.
      </Text>
      <Img
        src='/docs_font_weight_selection.png'
        alt='Screenshot of the Google Docs font weight selection menu.'
        width={{ base: '225px', md: '250px', lg: '275px' }}
        height={{ base: '225px', md: '250px', lg: '275px' }}
      />
    </Box>
  )
}

export default FontAction
