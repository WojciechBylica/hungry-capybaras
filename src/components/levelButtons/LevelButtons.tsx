import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import { useGameContext } from '../../context'
import { getLevelLabel } from '../../utils'

export const LevelButtons = () => {
    const { level, setLevel, handleReset } = useGameContext()
    return (
        <Box sx={{ p: '8px', borderRadius: '12px', border: '1px solid #333' }}>
            <Typography variant="h2" sx={{ fontSize: '14px' }}>
                Poziom:
            </Typography>
            <ButtonGroup
                variant="text"
                size="small"
                aria-label="Wybór poziomu trudności"
            >
                <Button
                    disabled={level === 'easy'}
                    onClick={() => {
                        setLevel('easy')
                        handleReset()
                    }}
                >
                    {getLevelLabel('easy')}
                </Button>
                <Button
                    disabled={level === 'medium'}
                    onClick={() => {
                        setLevel('medium')
                        handleReset()
                    }}
                >
                    {getLevelLabel('medium')}
                </Button>
                <Button
                    disabled={level === 'hard'}
                    onClick={() => {
                        setLevel('hard')
                        handleReset()
                    }}
                >
                    {getLevelLabel('hard')}
                </Button>
            </ButtonGroup>
        </Box>
    )
}
