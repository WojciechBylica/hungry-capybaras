import type { FieldType, FillType, LevelType } from './types'
import capibara from './assets/capibara-img.png'
import grass from './assets/grass.png'

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

export const getSize = (count: number) =>
    count > 0 ? `${30 * (1 + count / 10)}px` : '30px'

export const getFill = (count: number, fill: FillType) => {
    switch (fill) {
        case 'capibara':
            return (
                <img
                    src={capibara}
                    height={getSize(count)}
                    width="auto"
                    alt=""
                />
            )
        case 'grass':
            return <img src={grass} height="30px" width="auto" alt="" />
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
