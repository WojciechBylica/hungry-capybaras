import { useEffect, useState } from 'react'
import type { FieldType, HandType, LevelType } from './types'
import {
    getDirectionKeys,
    getInitialState,
    getRandomIndex,
    getTimeLeft,
    playMore,
} from './utils'
import { useDialog } from './components'

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
                const capibaraPos = prevFields.find(
                    ({ fill }) => fill === 'capibara'
                ) as FieldType
                const previousCapibaraField = { ...capibaraPos, fill: null }

                let nextX = capibaraPos.x
                let nextY = capibaraPos.y

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

                const capibaraNextField = prevFields.find(
                    (f) => f.x === nextX && f.y === nextY
                ) as FieldType
                const capibaraNextFieldSettled = {
                    ...capibaraNextField,
                    fill: 'capibara',
                } as FieldType

                const restOfFields = prevFields.filter(
                    ({ id }) =>
                        id !== previousCapibaraField.id &&
                        id !== capibaraNextField.id
                )

                const newFields = [
                    previousCapibaraField,
                    capibaraNextFieldSettled,
                    ...restOfFields,
                ].sort((a, b) => a.id - b.id)

                if (
                    capibaraNextFieldSettled.id ===
                    prevFields.find(({ fill }) => fill === 'grass')?.id
                ) {
                    setCount((c) => c + 1)

                    const availableIds = restOfFields.map(({ id }) => id)
                    const randomId =
                        availableIds[
                            Math.floor(Math.random() * availableIds.length)
                        ]
                    const newFieldToGrass = restOfFields.find(
                        ({ id }) => id === randomId
                    )
                    const newGrassedField = {
                        ...newFieldToGrass,
                        fill: 'grass',
                    } as FieldType
                    const restOfFieldsAfterGrassing = restOfFields.filter(
                        ({ id }) => id !== newGrassedField.id
                    ) as FieldType[]
                    const newFields = [
                        previousCapibaraField,
                        capibaraNextFieldSettled,
                        newGrassedField,
                        ...restOfFieldsAfterGrassing,
                    ].sort((a, b) => a.id - b.id)

                    return newFields
                }

                return newFields
            })
        }
        if (timeLeft === 0 && stage !== 0) {
            const nextLevel = playMore(count, stage)
            if (nextLevel) {
                handleClickOpenDialog(`Brawo! Gramy dalej:)`)
                setStage((s) => s + 1)
                setTimeLeft(getTimeLeft(stage + 1, level))
                setResetKey((k) => k + 1)
            } else {
                setStage(0)
                handleClickOpenDialog(`Kapibara zjadła ${count}:)`)
                return
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
