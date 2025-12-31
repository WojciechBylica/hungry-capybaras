import { Box, Button, Paper, Typography } from '@mui/material'
import capybara from './assets/capybara-img.png'
import { useApp } from './useApp'
import { getFill } from './utils'
import {
    AlertDialog,
    CurrentResult,
    HandButtons,
    LevelButtons,
    ScreenGameButtons,
    Timer,
    useIsTouchDevice,
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

    const isTouchDevice = useIsTouchDevice()

    return (
        <GameContext.Provider
            value={{ handleReset, count, isTouchDevice, ...rest }}
        >
            <AlertDialog />
            <Box
                component="header"
                className="js-header"
                sx={{
                    display: 'flex',
                    position: 'relative',
                    justifyContent: 'space-between',
                    mb: 1,
                    userSelect: 'none',
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
                        <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}>
                            Nakarm głodną kapibarę i&nbsp;pomóż jej urosnąć
                        </Typography>
                        <Button onClick={handleReset}>
                            Zacznijmy od początku
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', height: 'fit-content' }}>
                        <Box
                            component="img"
                            src={capybara}
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
                            display: { xs: 'none', md: 'block' },
                        }}
                    >
                        Poziom:
                    </Typography>
                    <LevelButtons />
                    <Typography
                        variant="h2"
                        sx={{
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
                    userSelect: 'none',
                }}
            >
                <Paper
                    elevation={1}
                    component="section"
                    sx={{
                        position: 'relative',
                        userSelect: 'none',
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
                            userSelect: 'none',
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
                                    userSelect: 'none',
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
