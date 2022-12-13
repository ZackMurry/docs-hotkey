import { FC } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface Props {
  title: string
  path: string
  currentPath: string
}

const NavItem: FC<Props> = ({ title, path, currentPath }) => {
  const router = useRouter()
  return (
    <Box
      borderRadius='5px 0 0 5px'
      bg={currentPath === path ? '#d6e7ff' : undefined}
      pl='2.5vw'
      cursor='pointer'
      onClick={() => router.push(path)}
      transition='background 0.5s ease'
    >
      <Heading fontSize='14pt' fontWeight='bold' color='#5e6675' p='3px 0' mb='10px'>
        {title}
      </Heading>
    </Box>
  )
}

export default NavItem
