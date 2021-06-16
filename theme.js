import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = {
  body: 'system-ui, sans-serif',
  heading: 'Georgia, serif',
  mono: 'Menlo, monospace'
}

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em'
})

const theme = extendTheme({
  colors: {
    bright: {
      white: '#e1e1e1',
      gray: '#7e7e7e',
      black: '#252525'
    },
    dark: {
      white: '#ffffff',
      light: '#e1e1e1',
      gray: '#7e7e7e'
    }
  },
  fonts,
  breakpoints
})

export default theme
