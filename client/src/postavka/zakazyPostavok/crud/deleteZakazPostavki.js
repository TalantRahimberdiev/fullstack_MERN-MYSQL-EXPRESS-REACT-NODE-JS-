
import { TextField, Button, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { MakingTable } from '../../../table_select/makingTable'

export default function DeleteZakazPostavki() {

   const [token, setToken] = useState('')
   const [zakazy, setZakazy] = useState()
   const [currentZakaz, setCurrentZakaz] = useState()

   const getList = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/spisokZakazovPostavki`)
         setZakazy(response.data)
      }
      catch (error) { throw new Error(`TR: failed to get zakazy postavki`) }
   }

   const getZakaz = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/getZakazPostavkiById/${token}`)
         setCurrentZakaz(response.data)
      }
      catch (error) { throw new Error('TR:failed to get current zakaz') }
   }

   const deleteZakaz = () => {
      axios.delete(`http://localhost:7000/deleteZakazPostavki/${token}`)
      setToken('')
      setCurrentZakaz()
      alert('zakaz postavki deleted successfully')
   }

   useEffect(() => {
      if (token) {
         getZakaz()
      }
   }, [token])

   useEffect(() => {
      if (!token) getList()
   })

   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>Удалить заказ поставки</h1>
         <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <TextField
               value={token}
               onChange={(event) => setToken(event.target.value)}
               sx={{ width: '24vw' }}
               autoComplete='off'
               label="введите № заказа поставки..."
               variant="standard" />
         </Box>
         {
            !token && zakazy &&
            <div>
               {
                  MakingTable(zakazy)
               }

            </div>
         }
         {
            token && currentZakaz && (
               <div>
                  {
                     MakingTable(currentZakaz)
                  }
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                     <Button
                        onClick={() => deleteZakaz()}
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
