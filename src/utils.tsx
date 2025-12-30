import { type Dispatch, type SetStateAction } from 'react'

import type { FieldType, FillType, HandType, LevelType } from './types'
import capibara from './assets/capibara-img.png'
import grass from './assets/grass.png'
import { Box } from '@mui/material'

export const maxWidth = 25
export const boxSize = 22

export const getDirectionKeys = (hand: HandType) =>
    hand === 'right'
        ? ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        : ['w', 's', 'a', 'd']

export const getLevelMultiplier = (level: LevelType) => {
    switch (level) {
        case 'easy':
            return 3
        case 'medium':
            return 2
        case 'hard':
            return 1
        default:
            return 1
    }
}
export const getLevelLabel = (level: LevelType) => {
    switch (level) {
        case 'easy':
            return 'łatwy'
        case 'medium':
            return 'średni'
        case 'hard':
            return 'trudny'
        default:
            return 'łatwy'
    }
}

export const getHandLabel = (hand: HandType) =>
    hand === 'right' ? 'prawa' : 'lewa'

export const getTimeLeft = (stage: number, level: LevelType) => {
    switch (stage) {
        case 1:
            return 60 * getLevelMultiplier(level)
        case 2:
            return 45 * getLevelMultiplier(level)
        case 3:
            return 30 * getLevelMultiplier(level)
        case 4:
            return 15 * getLevelMultiplier(level)
        case 5:
            return 10 * getLevelMultiplier(level)
        default:
            return 0
    }
}

export const getMinPointsLevel = (stage: number) => {
    switch (stage) {
        case 1:
            return 20
        case 2:
            return 35
        case 3:
            return 45
        case 4:
            return 55
        case 5:
            return 60
        default:
            return 10000
    }
}

export const playMore = (count: number, stage: number) => {
    if (stage === 5) {
        return false
    }

    if (count >= getMinPointsLevel(stage)) {
        return true
    }

    return false
}

export const getSize = (count: number, boxSize: number) =>
    count > 0 ? `${boxSize * (1 + count / 10)}px` : `${boxSize}px`

export const getFill = (
    count: number,
    fill: FillType,
    boxWidth: number,
    boxHeight: number
) => {
    switch (fill) {
        case 'capibara':
            return (
                <img
                    src={capibara}
                    height={getSize(count, boxHeight)}
                    width="auto"
                    alt=""
                />
            )
        case 'grass':
            return (
                <Box
                    component="img"
                    src={grass}
                    height={`${boxHeight}px`}
                    width={`${boxWidth}px`}
                    alt=""
                />
            )
        default:
            return null
    }
}

export const getInitialState = (
    maxWidth: number,
    capibaraIndex: number,
    grassIndex: number
) => {
    const maxIndex = maxWidth * maxWidth

    const array: FieldType[] = []
    let x = 1
    let y = 1
    for (let step = 1; step <= maxIndex; step++) {
        array.push({
            id: step,
            x,
            y,
            fill:
                capibaraIndex === step
                    ? 'capibara'
                    : grassIndex === step
                    ? 'grass'
                    : null,
        })
        x++
        if (x > maxWidth) {
            y++
            x = 1
        }
    }
    return array
}

export const getRandomIndex = (maxWidth: number) => {
    const max = maxWidth * maxWidth
    return Math.floor(Math.random() * max) + 1
}

export const getNewFields = (
    prevFields: FieldType[],
    nextX: number,
    nextY: number,
    previousCapibaraField: FieldType,
    setCount: Dispatch<SetStateAction<number>>
) => {
    const capibaraNextField = prevFields.find(
        ({ x, y }) => x === nextX && y === nextY
    ) as FieldType
    const capibaraNextFieldSettled = {
        ...capibaraNextField,
        fill: 'capibara',
    } as FieldType

    const restOfFields = prevFields.filter(
        ({ id }) =>
            id !== previousCapibaraField.id && id !== capibaraNextField.id
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
            availableIds[Math.floor(Math.random() * availableIds.length)]
        const newFieldToGrass = restOfFields.find(({ id }) => id === randomId)
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
}

export const getPreviousCapibaraField = (prevFields: FieldType[]) => {
    const capibaraPos = prevFields.find(
        ({ fill }) => fill === 'capibara'
    ) as FieldType
    const previousCapibaraField: FieldType = {
        ...capibaraPos,
        fill: null,
    }

    return previousCapibaraField
}

export const handleScreenButton = (
    setFields: Dispatch<SetStateAction<FieldType[]>>,
    setCount: Dispatch<SetStateAction<number>>,
    direction: 'up' | 'down' | 'left' | 'right'
) => {
    setFields((prevFields) => {
        const previousCapibaraField = getPreviousCapibaraField(prevFields)

        let nextX = previousCapibaraField.x
        let nextY = previousCapibaraField.y

        switch (direction) {
            case 'up':
                nextY = nextY > 1 ? nextY - 1 : maxWidth
                break
            case 'down':
                nextY = nextY < maxWidth ? nextY + 1 : 1
                break
            case 'left':
                nextX = nextX > 1 ? nextX - 1 : maxWidth
                break
            case 'right':
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
