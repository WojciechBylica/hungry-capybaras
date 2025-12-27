import { Box, Button, Typography } from '@mui/material'
import capibara from './assets/capibara-img.png'
import { useApp } from './useApp'
import { getFill } from './utils'
import { AlertDialog, CurrentResult, LevelButtons, Timer } from './components'
import { GameContext } from './context'

function App() {
    const { fields, maxWidth, handleReset, count, ...rest } = useApp()

    return (
        <GameContext.Provider value={{ handleReset, count, ...rest }}>
            <AlertDialog />
            <Box component="header" sx={{ display: 'flex' }}>
                <Box>
                    <Typography variant="h1">Kapibary-głodomory </Typography>
                    <Typography>
                        Nakarm głodną kapibarę i pomóż jej urosnąć
                    </Typography>
                    <Button onClick={handleReset}>Zacznijmy od początku</Button>
                </Box>

                <Box
                    component="img"
                    src={capibara}
                    sx={{ width: '80px', height: 'auto' }}
                    alt=""
                />

                <CurrentResult />
                <Box sx={{ display: 'flex', height: 'fit-content' }}>
                    <Timer />
                    <LevelButtons />
                </Box>
            </Box>

            <Box
                component="section"
                sx={{
                    flexGrow: '1',
                    border: '1px solid gray',
                    width: 'fit-content',
                    backgroundColor: '#020024',
                    backgroundImage:
                        'linear-gradient(90deg, rgba(2, 0, 36, 0.39) 0%, rgba(223, 223, 230, 1) 35%, rgba(171, 204, 183, 1) 100%)',
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${maxWidth}, minmax(30px, 30px))`,
                    }}
                >
                    {fields.map(({ id, fill }) => (
                        <Box
                            key={id}
                            sx={{
                                height: '30px',
                                width: '30px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                            }}
                        >
                            {getFill(count, fill)}
                        </Box>
                    ))}
                </Box>
            </Box>
        </GameContext.Provider>
    )
}

export default App
