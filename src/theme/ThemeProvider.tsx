import * as React from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
    typography: {
        h1: {
            fontSize: '22px',
            fontWeight: 600,
            color: '#333',
            marginTop: 0,
            marginBottom: 2,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                main: {
                    minHeight: '100vh',
                    padding: '12px',
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    maxWidth: '900px',
                    width: '100%',
                    margin: '0 auto',
                },
            },
        },
    },
})

export const AppThemeProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
