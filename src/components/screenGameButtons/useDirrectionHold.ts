import { useRef, type PointerEvent } from 'react'

import type { Direction } from '../../types'

export const useDirectionHold = (
    onMove: (direction: Direction) => void,
    delay = 300,
    interval = 300
) => {
    const holdTimeoutRef = useRef<number | null>(null)
    const intervalRef = useRef<number | null>(null)
    const activePointerId = useRef<number | null>(null)

    const start = (direction: Direction, e?: PointerEvent) => {
        if (!e) return

        if (activePointerId.current !== null) return
        activePointerId.current = e.pointerId

        e.preventDefault()
        e.stopPropagation()

        e.currentTarget.setPointerCapture(e.pointerId)

        onMove(direction)

        holdTimeoutRef.current = window.setTimeout(() => {
            intervalRef.current = window.setInterval(() => {
                onMove(direction)
            }, interval)
        }, delay)
    }

    const stop = (e?: PointerEvent) => {
        if (!e) return
        if (activePointerId.current !== e.pointerId) return

        e.preventDefault()
        e.stopPropagation()

        try {
            e.currentTarget.releasePointerCapture(e.pointerId)
        } catch {}

        activePointerId.current = null

        if (holdTimeoutRef.current !== null) {
            clearTimeout(holdTimeoutRef.current)
            holdTimeoutRef.current = null
        }

        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    return { start, stop }
}
