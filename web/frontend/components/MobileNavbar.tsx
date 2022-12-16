import { HamburgerIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { FC, useState } from 'react'
import { Box, Flex, Collapse, useColorModeValue, IconButton, Text } from '@chakra-ui/react'
import chakraTheme from 'lib/theme'
import NavItem from './NavItem'
import { useRouter } from 'next/router'

const MobileNavbar: FC = () => {
  const [isExpanded, setExpanded] = useState(false)
  const router = useRouter()
  const path = router.asPath

  return (
    <header style={{ background: chakraTheme.colors['navbarBg'] }}>
      <Flex h='7vh' p='12.5px 25px' justifyContent='space-between' alignItems='center'>
        <IconButton onClick={() => setExpanded(!isExpanded)} bg='transparent' aria-label='Open navigation'>
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
