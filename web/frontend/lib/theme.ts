import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    grayBg: '#f5f5f5',
    grayBorder: '#d7d7d7',
    docsBlue: '#1a73e8',
    docsBlueHover: '#63a0ef',
    docsBlueClick: '#6ea9f5',
    headingText: '#2a2f45',
    bodyText: '#4f566b',
    subheadingText: '#353b54',
    codeText: '#c1c9d2',
    codeBg: '#626a80'
  },
  fonts: {
    heading: "'DM Sans', Sans-Serif",
    body: "'DM Sans', Sans-Serif"
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#f0f0f0'
      },
      ':host,:root': {
        '--chakra-ui-focus-ring-color': '#41ab98'
      }
    }
  },
  shadows: {
    // This is also possible. Not sure I like inject this into
    // an existing theme section.
    // It creates a CSS variable named --chakra-shadows-focus-ring-color
    // 'focus-ring-color': 'rgba(255, 0, 125, 0.6)',
    outline: '0 0 0 3px var(--chakra-ui-focus-ring-color)'
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  }
})

export default theme
