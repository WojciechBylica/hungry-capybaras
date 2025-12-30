import { useEffect, useState } from 'react'

import { boxSize, maxWidth } from './utils'

export const useCustomBoxSize = () => {
    const getHeight = () => {
        return !(window.innerHeight - 24 > maxWidth * boxSize)
            ? (window.innerHeight - 24) / maxWidth
            : boxSize
    }

    const getWidth = () =>
        !(window.innerWidth - 24 > maxWidth * boxSize)
            ? (window.innerWidth - 24) / maxWidth
            : boxSize

    const updateBoxSize = () => {
        console.log(
            'header-height',
            window.document?.querySelector('.js-header')?.clientHeight || 0
        )
        console.log(document.body.offsetHeight)
        setCustomBoxWidth(getWidth())
        setCustomBoxHeight(getHeight())
    }
    const [customBoxWidth, setCustomBoxWidth] = useState(getWidth())
    const [customBoxHeight, setCustomBoxHeight] = useState(getHeight())

    useEffect(() => {
        updateBoxSize()
        window.addEventListener('resize', updateBoxSize)
        return () => removeEventListener('resize', updateBoxSize)
    }, [])

    return { customBoxWidth, customBoxHeight }
}
