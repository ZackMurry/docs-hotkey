import { FC } from 'react'
import { Box, Heading } from '@chakra-ui/react'

interface Props {
  title: string
  currentPage: string
  updateState: (value: string) => void
}

const DocumentationNavItem: FC<Props> = ({ title, currentPage, updateState }) => (
  <Box
    borderRadius='5px 0 0 5px'
    bg={currentPage === title ? '#d6e7ff' : undefined}
    pl='2.5vw'
    cursor='pointer'
    onClick={() => updateState(title)}
    transition='background 0.5s ease'
  >
    <Heading fontSize='14pt' fontWeight='bold' color='#5e6675' p='3px 0' mb='10px'>
      {title}
    </Heading>
  </Box>
)

export default DocumentationNavItem
