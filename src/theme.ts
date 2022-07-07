import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    docsBlue: '#1a73e8',
    docsBlueHover: '#63a0ef'
  },
  fonts: {
    heading: "Roboto, 'Noto Sans', Sans-Serif",
    body: "Roboto, 'Noto Sans', Sans-Serif"
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#f5f5f5'
      },
      ':host,:root': {
        '--chakra-ui-focus-ring-color': '#63a0ef'
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
