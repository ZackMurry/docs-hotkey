import { Box, useBreakpointValue } from '@chakra-ui/react'
import NavItem from 'components/NavItem'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const DocumentationPage: FC<Props> = ({ children }) => {
  const router = useRouter()
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const path = router.asPath
  return (
    <>
      {isDesktop && (
        <Box
          position='fixed'
          top='0'
          left='0'
          w='20vw'
          borderRight='2px solid #dbdde0'
          pl='7.5vw'
          pt='7vh'
          h='100vh'
          bg='#f5f5f5'
        >
          {/* todo: add Docs Hotkey in top left */}
          <NavItem title='Introduction' path='/' currentPath={path} />
          <NavItem title='Creating Hotkeys' path='/creating-hotkeys' currentPath={path} />
        </Box>
      )}
      <Box my='3.5vh' mx={{ base: '5vw', lg: '15vw' }} py='3.5vh' px={{ base: '5vw', lg: '10vw' }}>
        {children}
      </Box>
    </>
  )
}

export default DocumentationPage
