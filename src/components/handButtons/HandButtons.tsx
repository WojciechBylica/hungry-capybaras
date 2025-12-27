import { Button, ButtonGroup } from '@mui/material'
import { useGameContext } from '../../context'
import { getHandLabel } from '../../utils'
import keysIcon from '../../assets/keysIcon.svg'
import wasdIcon from '../../assets/wasd.svg'

export const HandButtons = () => {
    const { hand, setHand, handleReset } = useGameContext()
    return (
        <ButtonGroup variant="text" size="small" aria-label="Wybór ręki">
            <Button
                startIcon={<img src={wasdIcon} width={40} height={40} />}
                disabled={hand === 'left'}
                onClick={() => {
                    setHand('left')
                    handleReset()
                }}
            >
                {getHandLabel('left')}
            </Button>
            <Button
                endIcon={<img src={keysIcon} width={40} height={40} />}
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
