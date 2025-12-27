import {
    type Dispatch,
    type SetStateAction,
    createContext,
    useContext,
} from 'react'

interface GameContextType {
    count: number
    timeLeft: number
    setTimeLeft: Dispatch<SetStateAction<number>>
    handleReset: () => void
    resetKey: number
    initialTimeLeft: number
}

export const GameContext = createContext<GameContextType | null>(null)

export const useGameContext = () => {
    const ctx = useContext(GameContext)
    if (!ctx) {
        throw new Error(
            'Oh no! The component should be wrapped with ctx provider!'
        )
        return
    }
    return ctx
}
