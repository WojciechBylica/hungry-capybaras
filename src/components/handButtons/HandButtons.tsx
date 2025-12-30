import { Button, ButtonGroup } from '@mui/material'
import { useGameContext } from '../../context'
import { KeysIcon, WASDIcon } from '../../assets'
import PanToolIcon from '@mui/icons-material/PanTool'

export const HandButtons = () => {
    const { hand, setHand, handleReset, isTouchDevice } = useGameContext()
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
                {!isTouchDevice ? (
                    <WASDIcon />
                ) : (
                    <PanToolIcon sx={{ transform: 'scale(-1, 1)' }} />
                )}
            </Button>
            <Button
                disabled={hand === 'right'}
                onClick={() => {
                    setHand('right')
                    handleReset()
                }}
                aria-label="Prawa"
            >
                {!isTouchDevice ? <KeysIcon /> : <PanToolIcon />}
            </Button>
        </ButtonGroup>
    )
}
