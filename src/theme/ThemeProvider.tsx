import * as React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        h1: {
            fontSize: '22px',
            fontWeight: 600,
            color: '#333',
            marginTop: 0,
            marginBottom:2,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                main: {
                    Height: '100vh',
                    padding: '16px',
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    maxWidth: 1280,
                    width: '100%',
                    margin: '0 auto'
                },
            },
        },
    },
});

export const AppThemeProvider = ({children}:{children: React.ReactNode}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}