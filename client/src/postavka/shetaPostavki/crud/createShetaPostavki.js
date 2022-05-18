
import { useEffect, useState } from "react"
import { MakingTable } from '../../../table_select/makingTable'
import { Box, Button, TextField } from '@mui/material'
import axios from "axios"

export default function CreateShetaPostavki() {
   const [zakazy, setZakazy] = useState()
   const [token, setToken] = useState('')
   const [prevQuantity, setPrevQuantity] = useState('')
   const [currentZakaz, setCurrentZakaz] = useState('')
   const [summa, setSumma] = useState('')
   const [idTovar, setIdTovar] = useState('')
   const [idZakaz, setIdZakaz] = useState()
   const [quantity, setQuantity] = useState()

   const [date, setDate] = useState()
   const [month, setMonth] = useState()
   const [year, setYear] = useState()

   const getZakazy = async () => {
      try {
         const response = await axios.get('http://localhost:7000/spisokZakazovPostavki')
         setZakazy(response.data)
      }
      catch (error) { throw new ('failed to get zakazy') }
   }

   const getZakaz = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/getZakazPostavkiById/${token}`)
         setCurrentZakaz(response.data)
         setIdZakaz(response.data[0].id)
         setSumma(response.data[0].totalCost)
         setQuantity(response.data[0].quantity)
         setIdTovar(response.data[0].id_tovar)
      }
      catch (error) { throw new Error(setCurrentZakaz()) }
   }

   const getTovarById = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/getTovarById/${idTovar}`)
         setPrevQuantity(response.data[0].quantity)
      }
      catch (error) { throw new Error('sdf111') }
   }


   const submitShetPostavki = async () => {
      try {
         await axios.post(`http://localhost:7000/payShetaPostavki`, { token, summa, date, month, year })
         alert(`оплачено: ${summa} `)
         setCurrentZakaz('')
         setSumma('')
         setToken('')
      }
      catch (error) { console.log('TR: failed to pay shet postavki') }
   }
   const updateTovar = async () => {
      try {
         let sum = +prevQuantity + +quantity
         await axios.post(`http://localhost:7000/updateTovarsQuantityAndDostupen`, { sum, idTovar })
         alert('tovar updated successfully')
      }
      catch (error) { throw new Error('TR: failed to post dogovor na postavku') }
   }

   const updateZakazPostavki = async () => {
      try {
         await axios.post(`http://localhost:7000/updateZakazPostavkiWasPaid`, { idZakaz })
         alert('zakaz postavki updated successfully')
      }
      catch (error) { throw new Error('TR: failed to post dogovor na postavku') }
   }

   useEffect(() => {
      getZakazy()
   }, [])

   useEffect(() => {
      if (token) {
         getZakaz()
      }
   }, [token])

   useEffect(() => {
      if (currentZakaz) {
         getTovarById()
      }
   }, [currentZakaz])

   useEffect(() => {
      setDate(new Date().getDate())
      setMonth(new Date().getMonth())
      setYear(new Date().getFullYear())
   }, [])


   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>Оплатить заказ поставки</h1>
         <TextField
            value={token}
            onChange={event => setToken(event.target.value)}
            sx={{ width: '23vw', marginLeft: '36.5vw', marginBottom: '3vh' }}
            autoComplete='off'
            label="введите № заказа поставки"
            variant="standard" />
         {
            !token && zakazy && MakingTable(zakazy)
         }
         <div>
            {
               token && currentZakaz && MakingTable(currentZakaz)
            }
            {
               token && currentZakaz &&
               <div>
                  <Box style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                     <p style={{ textAlign: 'center' }}>сумма для оплаты: {summa}</p>
                  </Box>
                  <Button
                     onClick={() => {
                        submitShetPostavki()
                        updateTovar()
                        updateZakazPostavki()
                     }}
                     sx={{ height: '4vh', display: 'block', mx: 'auto', my: '3vh' }} size='small' variant='outlined' color='success'>оплатить</Button>
               </div>
            }
         </div>
      </div>
   )
}