import { handleScreenButton } from '../../utils'
import { Button, Box } from '@mui/material'
import {
    ArrowUpward,
    ArrowDownward,
    ArrowBack,
    ArrowForward,
} from '@mui/icons-material'
import { useGameContext } from '../../context'
import { useDirectionHold } from './useDirrectionHold'
import { useIsTouchDevice } from './useTouchDevice'

export const ScreenGameButtons = () => {
    const { setFields, setCount, hand } = useGameContext()

    const { start, stop } = useDirectionHold((direction) =>
        handleScreenButton(setFields, setCount, direction)
    )

    return (
        <Box
            sx={{
                display: useIsTouchDevice() ? 'grid' : 'none',
                gridTemplateColumns: 'repeat(3, 48px)',
                gap: 1,
                height: 'fit-content',
                alignSelf: 'flex-end',
                position: 'fixed',
                bottom: 0,
                right: hand === 'right' ? 0 : 'auto',
                left: hand === 'left' ? 0 : 'auto',
            }}
        >
            <Box />
            <Button
                onMouseDown={() => start('up')}
                onMouseUp={stop}
                onMouseLeave={stop}
                onTouchStart={() => start('up')}
                onTouchEnd={stop}
            >
                <ArrowUpward />
            </Button>

            <Box />
            <Button
                onMouseDown={() => start('left')}
                onMouseUp={stop}
                onMouseLeave={stop}
                onTouchStart={() => start('left')}
                onTouchEnd={stop}
            >
                <ArrowBack />
            </Button>

            <Button
                onMouseDown={() => start('down')}
                onMouseUp={stop}
                onMouseLeave={stop}
                onTouchStart={() => start('down')}
                onTouchEnd={stop}
            >
                <ArrowDownward />
            </Button>

            <Button
                onMouseDown={() => start('right')}
                onMouseUp={stop}
                onMouseLeave={stop}
                onTouchStart={() => start('right')}
                onTouchEnd={stop}
            >
                <ArrowForward />
            </Button>
        </Box>
    )
}
