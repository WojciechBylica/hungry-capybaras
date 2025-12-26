import { useEffect, useRef, useState } from 'react'

import { Box } from '@mui/material'
import { useGameContext } from '../../context'
import { initialTimeLeft } from '../../utils'

export const Timer = () => {
    const { resetKey, setTimeLeft, timeLeft } = useGameContext()

    const startTimeRef = useRef<number>(0)
    const rafRef = useRef<number>()

    useEffect(() => {
        startTimeRef.current = performance.now()

        const tick = (now: number) => {
            const elapsed = Math.floor((now - startTimeRef.current) / 1000)
            const remaining = Math.max(initialTimeLeft - elapsed, 0)

            setTimeLeft(remaining)

            if (remaining > 0) {
                rafRef.current = requestAnimationFrame(tick)
            }
        }

        rafRef.current = requestAnimationFrame(tick)

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [resetKey])

    return (
        <Box
            sx={{
                m: '0 8px 8px 8px',
                p: '8px',
                border: '1px solid #333',
                borderRadius: '12px',
                width: '150px',
                height: 'fit-content',
                display: 'flex',
                justifyContent: 'center',
                alignItmes: 'center',
            }}
        >
            Pozostało: {timeLeft}s
        </Box>
    )
}
