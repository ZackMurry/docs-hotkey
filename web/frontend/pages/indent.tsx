import { FC } from 'react'
import { Box, Heading, Text, Img } from '@chakra-ui/react'

const IndentAction: FC = () => {
  return (
    <Box>
      <Heading fontSize='24pt' color='headingText' mb='15px'>
        Indent Action
      </Heading>
      <Text fontSize='13pt' color='bodyText' mb='15px'>
        The Indent action adds or removes indentation from the selected text block. This accepts an integer argument for the
        number of times to indent. If the number is negative, then it unindents the given number of times.
      </Text>
    </Box>
  )
}

export default IndentAction
