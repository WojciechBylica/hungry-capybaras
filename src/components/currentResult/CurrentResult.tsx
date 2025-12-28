import { Typography, Box } from '@mui/material'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import { useGameContext } from '../../context'

export const CurrentResult = () => {
    const { count } = useGameContext()

    return (
        <Box
            component="section"
            sx={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'flex-start',
            }}
        >
            <ArrowLeftIcon
                sx={{
                    color: '#d3cece',
                    position: 'absolute',
                    left: '-15px',
                    fontSize: 40,
                }}
            />

            <Typography
                sx={{
                    border: '1px solid #d3cece',
                    borderRadius: '12px',
                    p: '8px',
                    ml: '8px',
                    height: 'fit-content',
                }}
            >
                Mam już w brzuszku: {count}
            </Typography>
        </Box>
    )
}
