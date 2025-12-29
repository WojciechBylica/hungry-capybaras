import { useEffect, useState } from 'react'

import type { HandType, LevelType } from './types'
import {
    getDirectionKeys,
    getInitialState,
    getNewFields,
    getPreviousCapibaraField,
    getRandomIndex,
    getTimeLeft,
    playMore,
} from './utils'
import { useDialog } from './components'
import capibara from './assets/capibara-img.png'
import { Box } from '@mui/material'

export const useApp = () => {
    const maxWidth = 25
    const initialCapibaraIdPosition = getRandomIndex(maxWidth)
    const initialGrassPosition = getRandomIndex(maxWidth)

    const initialValues = getInitialState(
        maxWidth,
        initialCapibaraIdPosition,
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
                    src={capibara}
                    sx={{
                        width: '20px',
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
                const previousCapibaraField =
                    getPreviousCapibaraField(prevFields)

                let nextX = previousCapibaraField.x
                let nextY = previousCapibaraField.y

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
                    previousCapibaraField,
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
    }
}
