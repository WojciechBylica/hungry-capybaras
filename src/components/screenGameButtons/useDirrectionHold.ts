import { useRef } from 'react'

import type { Direction } from '../../types'

export const useDirectionHold = (
    onMove: (direction: Direction) => void,
    interval = 200
) => {
    const intervalRef = useRef<number | null>(null)

    const start = (direction: Direction) => {
        onMove(direction)
        if (intervalRef.current) return

        intervalRef.current = window.setInterval(() => {
            onMove(direction)
        }, interval)
    }

    const stop = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    return { start, stop }
}
