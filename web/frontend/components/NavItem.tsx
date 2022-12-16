import { FC } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface Props {
  title: string
  path: string
  currentPath: string
  onClick?: () => void
  isMobile?: boolean
}

const NavItem: FC<Props> = ({ title, path, currentPath, onClick, isMobile }) => {
  const router = useRouter()
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
    router.push(path)
  }
  return (
    <Box
      borderRadius='5px 0 0 5px'
      bg={currentPath === path ? '#d6e7ff' : undefined}
      pl={isMobile ? '7.5vw' : '2.5vw'}
      cursor='pointer'
      onClick={handleClick}
      transition='background 0.5s ease'
    >
      <Heading fontSize='14pt' fontWeight='bold' color='navbarText' p='3px 0' mb='10px'>
        {title}
      </Heading>
    </Box>
  )
}

export default NavItem
