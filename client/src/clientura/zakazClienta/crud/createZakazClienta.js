
import { useEffect, useState } from "react"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from "axios"
import { Box } from "@mui/system"

export default function CreateZakazClienta() {

   const [day, setDay] = useState('')
   const [month, setMonth] = useState('')
   const [year, setYear] = useState('')
   const listMonthes = 'Январь Февраль Март Апрель Май Июнь Июль Август Сентябрь Октябрь Ноябрь Декабрь'.split(' ')
   const [tovars, setTovars] = useState()
   const [clients, setClients] = useState()
   const [idClient, setIdClient] = useState('')
   const [idTovar, setIdTovar] = useState('')
   const [quantity, setQuantity] = useState('')
   const [price, setPrice] = useState('')
   const [totalCost, setTotalCost] = useState()


   useEffect(() => {
      const getClients = async () => {
         try {
            const response = await axios.get('http://localhost:7000/spisokClientov')
            setClients(response.data)
         }
         catch (error) { throw new (error) }
      }
      getClients()
   }, [])

   useEffect(() => {
      const getTovars = async () => {
         try {
            const response = await axios.get('http://localhost:7000/spisokTovarov')
            setTovars(response.data)
         }
         catch (error) { throw new ('TR: tovary') }
      }
      getTovars()
   }, [])

   const submit = async () => {

      try {
         await axios.post(`http://localhost:7000/CreateZakazClienta`, { day, month, year, idTovar, idClient, quantity, price, totalCost })
         alert('zakaz clienta created successfully')
         setTovars('')
      }
      catch (error) { throw new Error('TR: !post zakaza clienta') }
   }

   useEffect(() => {
      setTotalCost(+quantity * +price)
   }, [price])

   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>оформить заказ клиента</h1>

         <Box style={{ display: 'flex', justifyContent: 'space-around', marginTop: '8vh', marginBottom: '8vh', alignItems: 'center' }}>
            <TextField
               autoComplete='off'
               size='small'
               variant="standard"
               sx={{ width: '25vw', m: 'auto', my: '3vh' }}
               label='день'
               value={day}
               onChange={event => setDay(event.target.value)}
            />
            <FormControl style={{ width: '25vw' }}>
               <InputLabel>месяц</InputLabel>
               <Select
                  label="месяц"
                  value={month}
                  onChange={event => setMonth(event.target.value)
                  }
               >
                  {
                     listMonthes.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                  }
               </Select>
            </FormControl>

            <TextField
               autoComplete='off'
               size='small'
               variant="standard"
               sx={{ width: '25vw', m: 'auto', my: '3vh' }}
               label='год'
               value={year}
               onChange={event => setYear(event.target.value)}
            />
         </Box>

         {
            year && clients && tovars &&
            <div>
               <Box style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '9vh' }}>

                  <FormControl style={{ width: '25vw' }}>
                     <InputLabel>клиенты</InputLabel>
                     <Select
                        label="клиенты"
                        value={idClient}
                        onChange={event => setIdClient(event.target.value)
                        }
                     >
                        {
                           clients.map(item => <MenuItem key={item.id} value={item.id}>{item.lastname}</MenuItem>)
                        }
                     </Select>
                  </FormControl>

                  <FormControl style={{ width: '25vw' }}>
                     <InputLabel>товары</InputLabel>
                     <Select
                        label="товары"
                        value={idTovar}
                        onChange={event => setIdTovar(event.target.value)}
                     >
                        {
                           tovars.map((item, index) => <MenuItem key={index} value={item.id}>{item.product}</MenuItem>)
                        }
                     </Select>
                  </FormControl>
               </Box>
               {
                  idTovar &&
                  <Box style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                     <TextField
                        autoComplete='off'
                        size='small'
                        variant="standard"
                        sx={{ width: '20vw' }}
                        label='количество'
                        value={quantity}
                        onChange={event => setQuantity(event.target.value)}
                     />

                     <TextField
                        autoComplete='off'
                        size='small'
                        variant="standard"
                        sx={{ width: '20vw' }}
                        label='цена'
                        value={price}
                        onChange={event => setPrice(event.target.value)}
                     />
                     <p style={{ textAlign: 'center', marginBottom: '0px' }}>общая стоимость: {totalCost}</p>
                  </Box>
               }
               <Button
                  onClick={() => submit()}
                  sx={{ display: 'block', height: '4vh', mx: 'auto', marginTop: '3vh' }}
                  size='small'
                  variant='outlined'
                  color='success'>
                  заказать
               </Button>
            </div>
         }
      </div>
   )
}