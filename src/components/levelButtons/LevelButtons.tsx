import { Button, ButtonGroup, useMediaQuery, useTheme } from '@mui/material'
import { useGameContext } from '../../context'
import { getLevelLabel } from '../../utils'

export const LevelButtons = () => {
    const { level, setLevel, handleReset } = useGameContext()
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))
    return (
        <ButtonGroup
            variant="text"
            size="small"
            aria-label="Wybór poziomu trudności"
            orientation={matches ? 'horizontal' : 'vertical'}
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
    )
}
