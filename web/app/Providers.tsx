'use client'

import theme from '@/config/theme'
import { ThemeProvider } from '@mui/material'
import { PropsWithChildren } from 'react'

const Providers = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Providers
