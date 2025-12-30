import { useEffect, useRef } from 'react'

import { Typography } from '@mui/material'
import { useGameContext } from '../../context'

export const Timer = () => {
    const { resetKey, setTimeLeft, timeLeft, initialTimeLeft } =
        useGameContext()

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
        <Typography sx={{ mb: { xs: 1, md: 2 } }}>
            Pozostało: {timeLeft}s
        </Typography>
    )
}
