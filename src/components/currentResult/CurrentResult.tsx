import { Typography } from '@mui/material'
import { useGameContext } from '../../context'

export const CurrentResult = () => {
    const { count } = useGameContext()

    return (
        <Typography
            sx={{
                position: 'relative',
                border: '1px solid #333',
                borderRadius: '12px',
                p: '8px',
                ml: '8px',
                height: 'fit-content',
                '::before': {
                    content: '"▶"',
                    position: 'absolute',
                    left: '-12px',
                    rotate: '180deg',
                    fontSize: '14px',
                },
            }}
        >
            mam już w brzuszku: {count}
        </Typography>
    )
}
