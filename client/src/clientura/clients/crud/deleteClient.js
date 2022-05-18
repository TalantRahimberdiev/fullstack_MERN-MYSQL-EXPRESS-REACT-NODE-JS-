
import { TextField, Button, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { MakingTable } from '../../../table_select/makingTable'



export default function DeleteClient() {

   const [token, setToken] = useState('')
   const [postavshik, setPostavshik] = useState()

   const getPostavshik = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/getPostavshikById/${token}`)
         setPostavshik(response.data)
      }
      catch (error) { throw new Error(<p>TR:could'nt get suitable postavshik</p>) }
   }

   const deletePostavshik = () => {
      axios.delete(`http://localhost:7000/deletePostavshik/${token}`)
      setToken('')
      setPostavshik()
      alert('Postavshik deleted successfully')
   }

   useEffect(() => {
      if (token) {
         setPostavshik()
         getPostavshik()
      }
   }, [token])

   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>Удалить поставщика</h1>
         <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <TextField
               value={token}
               onChange={(event) => setToken(event.target.value)}
               sx={{ width: '24vw' }}
               autoComplete='off'
               label="введите № поставщика..."
               variant="standard" />
         </Box>
         {
            postavshik && (
               <>
                  {
                     MakingTable(postavshik)
                  }
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                     <Button
                        onClick={() => deletePostavshik()}
                        sx={{ height: '4vh', mx: 'auto' }}
                        size='small'
                        variant='outlined'
                        color='error'>
                        delete
                     </Button>
                  </Box>
               </>
            )
         }
      </div>
   )
}
