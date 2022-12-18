import { HamburgerIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { FC, useState } from 'react'
import { Box, Flex, Collapse, useColorModeValue, IconButton, Text, Heading, Img } from '@chakra-ui/react'
import chakraTheme from 'lib/theme'
import NavItem from './NavItem'
import { useRouter } from 'next/router'

const MobileNavbar: FC = () => {
  const [isExpanded, setExpanded] = useState(false)
  const router = useRouter()
  const path = router.asPath

  return (
    <header
      style={{
        background: chakraTheme.colors['navbarBg'],
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        padding: '5px 0'
      }}
    >
      <Flex
        h='7vh'
        p='12.5px 5vw'
        justifyContent='space-between'
        alignItems='center'
        onClick={() => setExpanded(!isExpanded)}
      >
        <Flex>
          <Img src='/128.png' w='32px' h='32px' />
          <Heading fontSize='18pt'>Docs Hotkey</Heading>
        </Flex>
        <IconButton bg='transparent' aria-label='Open navigation'>
          <HamburgerIcon w='35px' h='35px' color='darkGray' />
        </IconButton>
      </Flex>
      <Collapse in={isExpanded}>
        <Box bg='navbarBg' borderBottom='2px solid #dbdde0' pt='10px'>
          <NavItem title='Introduction' path='/' currentPath={path} onClick={() => setExpanded(false)} isMobile />
          <NavItem
            title='Creating Hotkeys'
            path='/creating-hotkeys'
            currentPath={path}
            onClick={() => setExpanded(false)}
            isMobile
          />
          <Box h='2vh' />
          <NavItem title='Highlight' path='/highlight' currentPath={path} onClick={() => setExpanded(false)} isMobile />
          <NavItem title='Font' path='/font' currentPath={path} onClick={() => setExpanded(false)} isMobile />
          <NavItem title='Heading' path='/heading' currentPath={path} onClick={() => setExpanded(false)} isMobile />
          <NavItem title='Align' path='/align' currentPath={path} onClick={() => setExpanded(false)} isMobile />
          <NavItem
            title='Execute Add-on'
            path='/execute-addon'
            currentPath={path}
            onClick={() => setExpanded(false)}
            isMobile
          />
          <Box h='2vh' />
          <NavItem title='About' path='/about' currentPath={path} onClick={() => setExpanded(false)} isMobile />
        </Box>
      </Collapse>
    </header>
  )
}

export default MobileNavbar
