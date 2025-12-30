import { Box, Button, Paper, Typography } from '@mui/material'
import capibara from './assets/capibara-img.png'
import { useApp } from './useApp'
import { getFill } from './utils'
import {
    AlertDialog,
    CurrentResult,
    HandButtons,
    LevelButtons,
    ScreenGameButtons,
    Timer,
} from './components'
import { GameContext } from './context'

function App() {
    const {
        fields,
        maxWidth,
        handleReset,
        count,
        customBoxHeight,
        customBoxWidth,
        ...rest
    } = useApp()

    return (
        <GameContext.Provider value={{ handleReset, count, ...rest }}>
            <AlertDialog />
            <Box
                component="header"
                className="js-header"
                sx={{
                    display: 'flex',
                    position: 'relative',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                >
                    <Box>
                        <Typography
                            variant="h1"
                            sx={{ fontSize: { xs: 18, sm: 22 } }}
                        >
                            Kapibary-głodomory
                        </Typography>
                        <Typography>
                            Nakarm głodną kapibarę i&nbsp;pomóż jej urosnąć
                        </Typography>
                        <Button onClick={handleReset}>
                            Zacznijmy od początku
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', height: 'fit-content' }}>
                        <Box
                            component="img"
                            src={capibara}
                            sx={{ width: { xs: 60, sm: 80 }, height: 'auto' }}
                            alt=""
                        />

                        <CurrentResult />
                    </Box>
                </Box>

                <Paper
                    elevation={1}
                    sx={{
                        p: '8px',
                        borderRadius: '12px',
                        position: { xs: 'static', md: 'absolute' },
                        top: 0,
                        right: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'fit-content',
                    }}
                >
                    <Timer />
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: '14px',
                            display: { xs: 'none', md: 'block' },
                        }}
                    >
                        Poziom:
                    </Typography>
                    <LevelButtons />
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: '14px',
                            mt: '16px',
                            display: { xs: 'none', md: 'block' },
                        }}
                    >
                        Ręka:
                    </Typography>
                    <HandButtons />
                </Paper>
            </Box>

            <Box
                sx={{
                    flexGrow: '1',
                    display: 'flex',
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                }}
            >
                <Paper
                    elevation={1}
                    component="section"
                    sx={{
                        position: 'relative',
                        width: 'fit-content',
                        height: 'fit-content',
                        backgroundColor: '#020024',
                        backgroundImage:
                            'linear-gradient(90deg, rgba(2, 0, 36, 0.39) 0%, rgba(223, 223, 230, 1) 35%, rgba(171, 204, 183, 1) 100%)',
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${maxWidth}, minmax(${customBoxWidth}px, ${customBoxWidth}px))`,
                        }}
                    >
                        {fields.map(({ id, fill }) => (
                            <Box
                                key={id}
                                sx={{
                                    height: `${customBoxHeight}px`,
                                    width: `${customBoxWidth}px`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                }}
                            >
                                {getFill(
                                    count,
                                    fill,
                                    customBoxWidth,
                                    customBoxHeight
                                )}
                            </Box>
                        ))}
                    </Box>
                </Paper>
            </Box>
            <ScreenGameButtons />
        </GameContext.Provider>
    )
}

export default App
