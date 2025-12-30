import { useEffect, useState } from 'react'

import { boxSize, maxWidth } from './utils'

export const useCustomBoxSize = () => {
    const getVW = () =>
        Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
        )

    const getHeight = () => {
        return !(window.innerHeight - 24 > maxWidth * boxSize)
            ? (window.innerHeight - 24) / maxWidth
            : boxSize
    }

    const getWidth = () => {
        const vw = getVW()
        return !(vw - 24 > maxWidth * boxSize) ? (vw - 24) / maxWidth : boxSize
    }

    const updateBoxSize = () => {
        setCustomBoxWidth(getWidth())
        setCustomBoxHeight(getHeight())
    }
    const [customBoxWidth, setCustomBoxWidth] = useState(getWidth())
    const [customBoxHeight, setCustomBoxHeight] = useState(getHeight())

    useEffect(() => {
        window.addEventListener('resize', updateBoxSize)
        return () => removeEventListener('resize', updateBoxSize)
    }, [])

    return { customBoxWidth, customBoxHeight }
}
