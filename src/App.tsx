import { Box, Typography } from '@mui/material'
import capibara from './assets/capibara-img.png'

function App() {

  return (
    <>
     <Box component='header'>
         <Typography variant='h1'>Kapibary-głodomory</Typography>
        <Typography>Rozwiąż zadania i nakarm głodną kapibarę</Typography>
        <Box component='img' src={capibara}  sx={{width:160, height: 'auto'}}/>
     </Box>
     <Box component='section' flexGrow='1'>

     </Box>
    </>
  )
}

export default App
