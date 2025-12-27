import { Box, Button, Typography } from '@mui/material'
import capibara from './assets/capibara-img.png'
import { useApp } from './useApp'
import { boxSize, getFill } from './utils'
import {
    AlertDialog,
    CurrentResult,
    HandButtons,
    LevelButtons,
    Timer,
} from './components'
import { GameContext } from './context'

function App() {
    const { fields, maxWidth, handleReset, count, ...rest } = useApp()

    return (
        <GameContext.Provider value={{ handleReset, count, ...rest }}>
            <AlertDialog />
            <Box
                component="header"
                sx={{ display: 'flex', position: 'relative' }}
            >
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
                    <Box
                        sx={{
                            p: '8px',
                            borderRadius: '12px',
                            border: '1px solid #333',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        }}
                    >
                        <Typography variant="h2" sx={{ fontSize: '14px' }}>
                            Poziom:
                        </Typography>
                        <LevelButtons />
                        <Typography
                            variant="h2"
                            sx={{ fontSize: '14px', mt: '16px' }}
                        >
                            Ręka:
                        </Typography>
                        <HandButtons />
                    </Box>
                </Box>
            </Box>

            <Box sx={{ flexGrow: '1', display: 'flex' }}>
                <Box
                    component="section"
                    sx={{
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
                            gridTemplateColumns: `repeat(${maxWidth}, minmax(28px, 28px))`,
                        }}
                    >
                        {fields.map(({ id, fill }) => (
                            <Box
                                key={id}
                                sx={{
                                    height: `${boxSize}px`,
                                    width: `${boxSize}px`,
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
            </Box>
        </GameContext.Provider>
    )
}

export default App
