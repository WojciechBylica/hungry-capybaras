import { Button, ButtonGroup } from '@mui/material'
import { useGameContext } from '../../context'
import { getHandLabel } from '../../utils'

export const HandButtons = () => {
    const { hand, setHand, handleReset } = useGameContext()
    return (
        <ButtonGroup variant="text" size="small" aria-label="Wybór ręki">
            <Button
                disabled={hand === 'left'}
                onClick={() => {
                    setHand('left')
                    handleReset()
                }}
            >
                {getHandLabel('left')}
            </Button>
            <Button
                disabled={hand === 'right'}
                onClick={() => {
                    setHand('right')
                    handleReset()
                }}
            >
                {getHandLabel('right')}
            </Button>
        </ButtonGroup>
    )
}
