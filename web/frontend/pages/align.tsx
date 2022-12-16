import { FC } from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'

const AlignAction: FC = () => {
  return (
    <Box>
      <Heading fontSize='24pt' color='headingText' mb='15px'>
        Align Action
      </Heading>
      <Text fontSize='13pt' color='bodyText' mb='15px'>
        The Align action changes the alignment of the text at the cursor. This accepts "left", "center", "right", and
        "justify".
      </Text>
    </Box>
  )
}

export default AlignAction
