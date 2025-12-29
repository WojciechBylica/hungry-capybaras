import { type ReactNode } from 'react'

export type FillType = 'capibara' | 'grass' | null

export type FieldType = {
    id: number
    x: number
    y: number
    fill: FillType
}

export type LevelType = 'easy' | 'medium' | 'hard'

export type DialogDataType = { open: boolean; message: string | ReactNode }

export type HandType = 'left' | 'right'
