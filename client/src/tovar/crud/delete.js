
import { TextField, Button, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { MakingTable } from '../../table_select/makingTable'

export default function Delete() {

   const [token, setToken] = useState('')
   const [tovars, setTovars] = useState()
   const [currentTovar, setCurrentTovar] = useState()

   const getList = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/spisokTovarov`)
         setTovars(response.data)
      }
      catch (error) { throw new Error(`TR: couldn't get tovars`) }
   }

   const getTovar = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/getTovarById/${token}`)
         setCurrentTovar(response.data)
      }
      catch (error) { throw new Error('TR:failed to get current tovar') }
   }

   const deleteTovar = () => {
      axios.delete(`http://localhost:7000/deleteTovar/${token}`)
      setToken('')
      setCurrentTovar()
      alert('tovar deleted successfully')
   }

   useEffect(() => {
      if (token) {
         getTovar()
      }
   }, [token])

   useEffect(() => {
      if (!token) getList()
   })

   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>Удалить товар</h1>
         <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <TextField
               value={token}
               onChange={(event) => setToken(event.target.value)}
               sx={{ width: '24vw' }}
               autoComplete='off'
               label="введите № товара..."
               variant="standard" />
         </Box>
         {
            !token && tovars &&
            <div>
               {
                  MakingTable(tovars)
               }

            </div>
         }
         {
            token && currentTovar && (
               <div>
                  {
                     MakingTable(currentTovar)
                  }
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                     <Button
                        onClick={() => deleteTovar()}
                        sx={{ height: '4vh', mx: 'auto' }}
                        size='small'
                        variant='outlined'
                        color='error'>
                        delete
                     </Button>
                  </Box>
               </div>
            )
         }
      </div>
   )
}
