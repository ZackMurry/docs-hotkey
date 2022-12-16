import { FC } from 'react'
import { Box, Heading, Img, Text } from '@chakra-ui/react'
import { CodeBlock } from 'react-code-blocks'

const ExecuteAddonAction: FC = () => {
  const code = `
function onOpen() {
  DocumentApp.getUi().createAddonMenu().addItem('Shrink', 'shrink').addToUi()
}


function shrink() {
  const doc = DocumentApp.getActiveDocument()
  if (!doc.getSelection()) {
    return
  }
  const elements = doc.getSelection().getRangeElements()
  for (let element of elements) {
    if (!element.getElement().asText) {
      continue
    }
    const text = element.getElement().asText()
    const indices = text.getTextAttributeIndices()
    indices.push(text.getText().length)
    for (let i = 0; i < indices.length - 1; i++) {
      if (!text.isBold(indices[i]) && !text.getBackgroundColor(indices[i])) {
        text.setFontSize(indices[i], indices[i+1] - 1, 8)
      }
    }
  }
}
  `
  return (
    <Box>
      <Heading fontSize='24pt' color='headingText' mb='15px'>
        Execute Add-on Action
      </Heading>
      <Text fontSize='13pt' color='bodyText' mb='15px'>
        The Execute Add-on action runs a Google Docs Add-on from the Extensions menu. In the customizable field, enter the
        name of the add-on, then a period, and then the name of the utility. For example, in order to execute the Shrink
        utility of the Debate Format add-on, enter "Debate Format.Shrink".
      </Text>
      <Img
        src='/docs_addon.png'
        alt='Screenshot of the Debate Format add-on.'
        width={{ base: '300px', md: '350px', lg: '375px' }}
        height={{ base: '150px', md: '250px', lg: '200px' }}
      />
      <Heading fontSize='24pt' color='headingText' mb='15px' mt='15px'>
        Custom Add-ons
      </Heading>
      <Text fontSize='13pt' color='bodyText' mb='15px'>
        An example of how a custom add-on should be structured to allow Docs Hotkey to access it can be found below. This
        add-on shrinks any unbolded and unhighlighted text.
      </Text>
      <CodeBlock text={code} language='javascript' />
    </Box>
  )
}

export default ExecuteAddonAction
