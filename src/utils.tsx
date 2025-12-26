import type { FieldType, FillType } from './types'
import capibara from './assets/capibara-img.png'
import grass from './assets/grass.png'

export const initialTimeLeft = 5

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
