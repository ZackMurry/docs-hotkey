import { FC } from 'react'
import { Box, Heading, Link, Text } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const AboutSection: FC = () => {
  return (
    <Box>
      <Heading fontSize='24pt' color='headingText' mb='15px'>
        About
      </Heading>
      <Text fontSize='13pt' color='bodyText' mb='15px'>
        This extension was created by Zack Murry. Bugs reports and feature requests can be sent to{' '}
        <Link href='mailto:zack.murry.developer@gmail.com' color='docsBlue'>
          zack.murry.developer@gmail.com
        </Link>
        .
      </Text>
      <Text fontSize='13pt' color='bodyText' mb='15px'>
        If you find this extension useful, please consider rating it on the Chrome Web Store. You can also support its
        development{' '}
        <Link href='https://ko-fi.com/zackmurry' color='docsBlue' isExternal>
          here <ExternalLinkIcon fontSize='sm' mx='1px' mt='-3px' />
        </Link>
        .
      </Text>
      <Text fontSize='13pt' color='bodyText' mb='15px'>
        This is free, open-source software licensed under the MIT License. The full license can be found{' '}
        <Link href='https://raw.githubusercontent.com/ZackMurry/docs-hotkey/main/LICENSE' color='docsBlue' isExternal>
          here <ExternalLinkIcon fontSize='sm' mx='1px' mt='-3px' />
        </Link>
        . To contribute, visit{' '}
        <Link href='https://github.com/ZackMurry/docs-hotkey' color='docsBlue' isExternal>
          https://github.com/ZackMurry/docs-hotkey <ExternalLinkIcon fontSize='sm' mx='1px' mt='-3px' />
        </Link>
        .
      </Text>
    </Box>
  )
}

export default AboutSection
