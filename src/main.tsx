import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppThemeProvider } from './theme'
import { Box, CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <CssBaseline />
      <Box component='main'>
        <App />
      </Box>
    </AppThemeProvider>
  </StrictMode>,
)
