import { createTheme } from '@mui/material'
import { blue, green, red } from '@mui/material/colors'

const theme = createTheme({
  defaultColorScheme: 'dark',
  colorSchemes: {
    dark: {
      palette: {
        mode: 'dark',
        primary: red,
        secondary: blue,
        success: green,
      },
    },
  },
})

export default theme
