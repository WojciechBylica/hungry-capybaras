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
                    padding: '16px',
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '1000px',
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
