import { type ReactNode } from 'react'

export type FillType = 'capybara' | 'grass' | null

export type FieldType = {
    id: number
    x: number
    y: number
    fill: FillType
}

export type LevelType = 'easy' | 'medium' | 'hard'

export type DialogDataType = { open: boolean; message: string | ReactNode }

export type HandType = 'left' | 'right'

export type Direction = 'up' | 'down' | 'left' | 'right'
