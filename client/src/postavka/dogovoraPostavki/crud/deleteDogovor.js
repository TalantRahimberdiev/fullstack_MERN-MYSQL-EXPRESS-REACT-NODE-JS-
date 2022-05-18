
import { TextField, Button, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { MakingTable } from '../../../table_select/makingTable'

export default function DeleteDogovor() {

   const [token, setToken] = useState('')
   const [dogovora, setDogovora] = useState()
   const [currentDogovor, setCurrentDogovor] = useState()

   const getList = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/spisokDogovorovPostavki`)
         setDogovora(response.data)
      }
      catch (error) { throw new Error(`TR: couldn't get dogovora postavki`) }
   }

   const getDogovor = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/getDogovorPostavkiById/${token}`)
         setCurrentDogovor(response.data)
      }
      catch (error) { throw new Error('TR:failed to get current dogovor') }
   }

   const deleteDogovor = () => {
      axios.delete(`http://localhost:7000/deleteDogovorPostavki/${token}`)
      setToken('')
      setCurrentDogovor()
      alert('dogovor deleted successfully')
   }

   useEffect(() => {
      if (token) {
         getDogovor()
      }
   }, [token])

   useEffect(() => {
      if (!token) getList()
   })

   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>Удалить договор поставки</h1>
         <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <TextField
               value={token}
               onChange={(event) => setToken(event.target.value)}
               sx={{ width: '24vw' }}
               autoComplete='off'
               label="введите № договора поставки..."
               variant="standard" />
         </Box>
         {
            !token && dogovora &&
            <div>
               {
                  MakingTable(dogovora)
               }

            </div>
         }
         {
            token && currentDogovor && (
               <div>
                  {
                     MakingTable(currentDogovor)
                  }
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                     <Button
                        onClick={() => deleteDogovor()}
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
