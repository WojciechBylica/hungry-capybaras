import { Button, ButtonGroup } from '@mui/material'
import { useGameContext } from '../../context'
import { KeysIcon, WASDIcon } from '../../assets'

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
                aria-label="Lewa"
            >
                <WASDIcon />
            </Button>
            <Button
                disabled={hand === 'right'}
                onClick={() => {
                    setHand('right')
                    handleReset()
                }}
                aria-label="Prawa"
            >
                <KeysIcon />
            </Button>
        </ButtonGroup>
    )
}
