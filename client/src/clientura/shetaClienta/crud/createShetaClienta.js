
import { useEffect, useState } from "react"
import { MakingTable } from '../../../table_select/makingTable'
import { Box, Button, TextField } from '@mui/material'
import axios from "axios"

export default function CreateShetaClienta() {
   const [zakazy, setZakazy] = useState()
   const [token, setToken] = useState('')
   const [prevQuantity, setPrevQuantity] = useState('')
   const [currentZakaz, setCurrentZakaz] = useState('')
   const [summa, setSumma] = useState('')
   const [idTovar, setIdTovar] = useState('')
   const [idZakaz, setIdZakaz] = useState()
   const [quantity, setQuantity] = useState()
   const [result, setResult] = useState(0)

   const getZakazy = async () => {
      try {
         const response = await axios.get('http://localhost:7000/spisokZakazovClienta')
         setZakazy(response.data)
      }
      catch (error) { throw new ('failed to get zakazy clienta') }
   }

   const getZakaz = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/getZakazClientaById/${token}`)
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
      catch (error) { throw new Error('tovar by id') }
   }

   const submitShetClienta = async () => {
      try {
         await axios.post(`http://localhost:7000/payShetaClienta`, { token, summa, idTovar, quantity })
         alert(`оплачено: ${summa} `)
         setCurrentZakaz('')
         setSumma('')
         setToken('')
      }
      catch (error) { console.log('TR: failed to pay shet postavki') }
   }
   const updateTovar = async () => {
      try {
         let sum = +prevQuantity - +quantity
         await axios.post(`http://localhost:7000/updateTovarsQuantityAndDostupen`, { sum, idTovar })
         alert('tovar updated successfully')
      }
      catch (error) { throw new Error('TR: failed to post dogovor na postavku') }
   }

   const updateZakazClienta = async () => {
      try {
         await axios.post(`http://localhost:7000/updateZakazClientaWasPaid`, { idZakaz })
         alert('zakaz clienta updated successfully')
      }
      catch (error) { throw new Error('TR: !update zakaz clienta') }
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
      setResult(+prevQuantity - +quantity)
   }, [prevQuantity])

   const submit = () => {
      if (result <= 0) {
         alert('not enough tovar')
      }
      else {
         submitShetClienta()
         updateTovar()
         updateZakazClienta()
      }
   }


   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>Оплатить заказ клиента</h1>
         <TextField
            value={token}
            onChange={event => setToken(event.target.value)}
            sx={{ width: '23vw', marginLeft: '36.5vw', marginBottom: '3vh' }}
            autoComplete='off'
            label="введите № заказа клиента"
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
                     onClick={() => submit()}
                     sx={{ height: '4vh', display: 'block', mx: 'auto', my: '3vh' }} size='small' variant='outlined' color='success'>оплатить</Button>
               </div>
            }
         </div>
      </div>
   )
}