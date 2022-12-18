import { Box, Flex, Heading, Img, useBreakpointValue } from '@chakra-ui/react'
import NavItem from 'components/NavItem'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import MobileNavbar from './MobileNavbar'

interface Props {
  children: ReactNode
}

const DocumentationPage: FC<Props> = ({ children }) => {
  const router = useRouter()
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const path = router.asPath
  return (
    <>
      {isDesktop ? (
        <Box position='fixed' top='0' left='0' w='20vw' borderRight='2px solid #dbdde0' h='100vh' bg='navbarBg'>
          <Flex height='7vh' mb='3vh' pr='1vw' pt='1vh' justifyContent='right' alignItems='center' color='headingText'>
            <Img src='/128.png' w='48px' h='48px' />
            <Heading ml='7px'>Docs Hotkey</Heading>
          </Flex>
          <Box pl={{ base: '1vw', xl: '7.5vw' }}>
            <NavItem title='Introduction' path='/' currentPath={path} />
            <NavItem title='Creating Hotkeys' path='/creating-hotkeys' currentPath={path} />
            <Box h='2vh' />
            <NavItem title='Highlight' path='/highlight' currentPath={path} />
            <NavItem title='Font' path='/font' currentPath={path} />
            <NavItem title='Heading' path='/heading' currentPath={path} />
            <NavItem title='Align' path='/align' currentPath={path} />
            <NavItem title='Execute Add-on' path='/execute-addon' currentPath={path} />
            <Box h='2vh' />
            <NavItem title='About' path='/about' currentPath={path} />
          </Box>
        </Box>
      ) : (
        <MobileNavbar />
      )}
      <Box my='3.5vh' mx={isDesktop ? '15vw' : '7vh'} py={isDesktop ? '3.5vh' : '10vh'} px={isDesktop ? '10vw' : '3vw'}>
        {children}
      </Box>
    </>
  )
}

export default DocumentationPage
