import { Box, Typography } from '@mui/material'
import capibara from './assets/capibara-img.png'
import { FillType, useApp } from './useApp'

function App() {
  const { fields,maxWidth } = useApp()
  const getFill = (fill: FillType)=>{
    switch (fill) {
      case 'capibara':
        return <img src={capibara} height='30px' width='auto'/>
      case 'grass':
        return 'g'
      default:
        return null
    }
  }
  return (
    <>
     <Box component='header'  sx={{display: 'flex'}}>
        <Box>
          <Typography variant='h1'>Kapibary-głodomory </Typography>
          <Typography>Rozwiąż zadania i nakarm głodną kapibarę</Typography>
        </Box>
        <Box component='img' src={capibara}  sx={{width:'80px', height: 'auto'}}/>
     </Box>
     <Box component='section' flexGrow='1' sx={{border: '1px solid gray', width: 'fit-content'}}>
        <Box sx={{display:'grid', gridTemplateColumns: `repeat(${maxWidth}, minmax(30px, 30px))`}}>
          {fields.map(({id,fill})=>(
            <Box
              key={id}
              sx={{ 
                height:'30px', 
                width: '30px', 
                // border: '0.5px solid gray', 
                display: 'flex', 
                justifyContent:'center', 
                alignItems: 'center'
              }}
              >{getFill(fill)}</Box>))}
        </Box>
     </Box>
    </>
  )
}

export default App
