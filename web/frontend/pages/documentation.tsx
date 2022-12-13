import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import DocumentationIntroductionSection from 'components/DocumentationIntroductionSection'
import DocumentationNavItem from 'components/DocumentationNavItem'
import { NextPage } from 'next'
import { useState } from 'react'

const DocumentationPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState('Introduction')
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
        <DocumentationNavItem title='Introduction' currentPage={currentPage} updateState={setCurrentPage} />
        <DocumentationNavItem title='Basic Hotkeys' currentPage={currentPage} updateState={setCurrentPage} />
      </Box>
      <Box m='3.5vh 15vw' p='3.5vh 10vw'>
        {currentPage === 'Introduction' && <DocumentationIntroductionSection />}
      </Box>
    </>
  )
}

export default DocumentationPage
