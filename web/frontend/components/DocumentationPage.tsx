import { Box } from '@chakra-ui/react'
import NavItem from 'components/NavItem'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const DocumentationPage: FC<Props> = ({ children }) => {
  const router = useRouter()
  const path = router.asPath
  return (
    <>
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
        <NavItem title='Basic Hotkeys' path='/basic-hotkeys' currentPath={path} />
      </Box>
      <Box m='3.5vh 15vw' p='3.5vh 10vw'>
        {children}
      </Box>
    </>
  )
}

export default DocumentationPage
