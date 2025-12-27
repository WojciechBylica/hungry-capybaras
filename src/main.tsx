import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppThemeProvider } from './theme'
import { CssBaseline, Paper } from '@mui/material'

createRoot(document.getElementById('root')!).render(
    <AppThemeProvider>
        <CssBaseline />
        <Paper component="main" elevation={3}>
            <App />
        </Paper>
    </AppThemeProvider>
)
