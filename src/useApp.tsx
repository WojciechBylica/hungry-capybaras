import { useEffect, useState } from 'react'

import type { HandType, LevelType } from './types'
import {
    getDirectionKeys,
    getInitialState,
    getNewFields,
    getPreviousCapybaraField,
    getRandomIndex,
    getTimeLeft,
    maxWidth,
    playMore,
} from './utils'
import { useDialog } from './components'
import capybara from './assets/capybara-img.png'
import { Box } from '@mui/material'
import { useCustomBoxSize } from './useCustomBoxSize'

export const useApp = () => {
    const initialCapybaraIdPosition = getRandomIndex(maxWidth)
    const initialGrassPosition = getRandomIndex(maxWidth)

    const initialValues = getInitialState(
        maxWidth,
        initialCapybaraIdPosition,
        initialGrassPosition
    )

    const [fields, setFields] = useState(initialValues)
    const [count, setCount] = useState(0)
    const [stage, setStage] = useState(1)
    const [level, setLevel] = useState<LevelType>('easy')
    const initialTimeLeft = getTimeLeft(stage, level)
    const [timeLeft, setTimeLeft] = useState(initialTimeLeft)
    const [resetKey, setResetKey] = useState(0)
    const { handleClickOpenDialog, handleCloseDialog, dialogData } = useDialog()
    const [hand, setHand] = useState<HandType>('right')
    const { customBoxWidth, customBoxHeight } = useCustomBoxSize()

    const handleReset = () => {
        setFields(initialValues)
        setCount(0)
        setStage(1)
        setTimeLeft(getTimeLeft(1, level))
        setResetKey((k) => k + 1)
    }

    const handleNextLevel = () => {
        handleClickOpenDialog(`Brawo! Gramy dalej!`)
        setStage((s) => s + 1)
        setTimeLeft(getTimeLeft(stage + 1, level))
        setResetKey((k) => k + 1)
    }

    const handleEndOfTheGame = () => {
        setStage(0)
        handleClickOpenDialog(
            <>
                <Box
                    component="img"
                    src={capybara}
                    sx={{
                        width: `${customBoxWidth}px`,
                        height: 'auto',
                        marginRight: '4px',
                    }}
                    alt=""
                />
                zjadła {count}
            </>
        )
        return
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const directionKeys = getDirectionKeys(hand)
            if (directionKeys.includes(event.key)) {
                event.preventDefault()
            }
            if (
                !directionKeys.includes(event.key) ||
                stage === 0 ||
                dialogData.open
            )
                return

            setFields((prevFields) => {
                const previousCapybaraField =
                    getPreviousCapybaraField(prevFields)

                let nextX = previousCapybaraField.x
                let nextY = previousCapybaraField.y

                switch (event.key) {
                    case directionKeys[0]:
                        nextY = nextY > 1 ? nextY - 1 : maxWidth
                        break
                    case directionKeys[1]:
                        nextY = nextY < maxWidth ? nextY + 1 : 1
                        break
                    case directionKeys[2]:
                        nextX = nextX > 1 ? nextX - 1 : maxWidth
                        break
                    case directionKeys[3]:
                        nextX = nextX < maxWidth ? nextX + 1 : 1
                        break
                }

                return getNewFields(
                    prevFields,
                    nextX,
                    nextY,
                    previousCapybaraField,
                    setCount
                )
            })
        }
        if (timeLeft === 0 && stage !== 0) {
            const nextLevel = playMore(count, stage)
            if (nextLevel) {
                handleNextLevel()
            } else {
                handleEndOfTheGame()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [fields, resetKey, timeLeft, stage, hand])

    return {
        fields,
        setFields,
        maxWidth,
        count,
        setCount,
        handleReset,
        timeLeft,
        setTimeLeft,
        resetKey,
        initialTimeLeft,
        level,
        setLevel,
        handleClickOpenDialog,
        handleCloseDialog,
        dialogData,
        hand,
        setHand,
        customBoxHeight,
        customBoxWidth,
    }
}
