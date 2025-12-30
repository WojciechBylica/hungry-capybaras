import {
    type Dispatch,
    type SetStateAction,
    createContext,
    useContext,
} from 'react'
import type { DialogDataType, FieldType, HandType, LevelType } from './types'

interface GameContextType {
    setFields: Dispatch<SetStateAction<FieldType[]>>
    count: number
    setCount: Dispatch<SetStateAction<number>>
    timeLeft: number
    setTimeLeft: Dispatch<SetStateAction<number>>
    handleReset: () => void
    resetKey: number
    initialTimeLeft: number
    level: LevelType
    setLevel: Dispatch<SetStateAction<LevelType>>
    dialogData: DialogDataType
    handleClickOpenDialog: (message: string) => void
    handleCloseDialog: () => void
    hand: HandType
    setHand: Dispatch<SetStateAction<HandType>>
}

export const GameContext = createContext<GameContextType | null>(null)

export const useGameContext = () => {
    const ctx = useContext(GameContext)
    if (!ctx) {
        throw new Error(
            'Oh no! The component should be wrapped with ctx provider!'
        )
    }
    return ctx
}
