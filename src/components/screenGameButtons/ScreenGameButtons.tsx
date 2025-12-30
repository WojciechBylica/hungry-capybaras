import { type PointerEvent, type MouseEvent } from 'react'

import { handleScreenButton } from '../../utils'
import { Button, Box, type SxProps, type ButtonProps } from '@mui/material'
import {
    ArrowUpward,
    ArrowDownward,
    ArrowBack,
    ArrowForward,
} from '@mui/icons-material'
import { useGameContext } from '../../context'
import { useDirectionHold } from './useDirrectionHold'

export const ScreenGameButtons = () => {
    const { setFields, setCount, hand, timeLeft, isTouchDevice } =
        useGameContext()

    const { start, stop } = useDirectionHold((direction) => {
        if (timeLeft !== 0) {
            handleScreenButton(setFields, setCount, direction)
        }
    })

    const commonBtnProps: ButtonProps = {
        disableRipple: true,
        disableTouchRipple: true,
        disableFocusRipple: true,
        onPointerUp: (e: PointerEvent<HTMLButtonElement>) => stop(e),
        onPointerCancel: (e: PointerEvent<HTMLButtonElement>) => stop(e),
        onPointerLeave: (e: PointerEvent<HTMLButtonElement>) => stop(e),
        onClick: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) =>
            e.preventDefault(),
        sx: { touchAction: 'none', userSelect: 'none' } as SxProps,
    }

    return (
        <Box
            sx={{
                display: isTouchDevice ? 'grid' : 'none',
                gridTemplateColumns: 'repeat(3, 48px)',
                gap: 1,
                height: 80,
                position: 'fixed',
                bottom: 16,
                right: hand === 'right' ? 16 : 'auto',
                left: hand === 'left' ? 0 : 'auto',
                zIndex: '1000',
                userSelect: 'none',
            }}
        >
            <Box />
            <Button {...commonBtnProps} onPointerDown={(e) => start('up', e)}>
                <ArrowUpward />
            </Button>

            <Box />
            <Button {...commonBtnProps} onPointerDown={(e) => start('left', e)}>
                <ArrowBack />
            </Button>

            <Button {...commonBtnProps} onPointerDown={(e) => start('down', e)}>
                <ArrowDownward />
            </Button>

            <Button
                {...commonBtnProps}
                onPointerDown={(e) => start('right', e)}
            >
                <ArrowForward />
            </Button>
        </Box>
    )
}
