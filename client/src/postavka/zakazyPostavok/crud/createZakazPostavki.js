
import { useEffect, useState } from "react"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from "axios"
import { Box } from "@mui/system"

export default function CreateZakaz() {

   const [tovars, setTovars] = useState()
   const [dogovora, setDogovora] = useState()
   const [idTovar, setIdTovar] = useState('')
   const [idDogovor, setIdDogovor] = useState('')
   const [quantity, setQuantity] = useState('')
   const [price, setPrice] = useState('')
   const [totalCost, setTotalCost] = useState()
   const [postavshiks, setPostavshiks] = useState()
   const [organization, setOrganization] = useState('')
   const [ids, setIds] = useState()

   const getTovars = async () => {
      try {
         const response = await axios.get('http://localhost:7000/spisokTovarov')
         setTovars(response.data)
      }
      catch (error) { throw new ('TR: tovary') }
   }

   const getDogovors = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/spisokDogovorovPostavki`)
         setDogovora(response.data)
      }
      catch (error) { throw new Error(`TR: dogovor postavok`) }
   }

   const submit = async () => {

      try {
         await axios.post(`http://localhost:7000/CreateZakazPostavki`, { idTovar, idDogovor, quantity, price, totalCost })
         alert('zakaz created successfully')
         setTovars('')
      }
      catch (error) { throw new Error('TR: !post zakaza postavki') }
   }

   useEffect(() => {
      const getPostavshiks = async () => {
         try {
            const response = await axios.get('http://localhost:7000/spisokPostavshikov')
            setPostavshiks(response.data)
         }
         catch (error) { throw new (error) }
      }
      getPostavshiks()
   }, [])

   useEffect(() => {
      const getPostavshikIds = async () => {
         try {
            const response = await axios.get(`http://localhost:7000/postavshikIdsOfDogovors/${organization}`)
            setIds(response.data)
         }
         catch (error) { }
      }
      if (organization) {
         getPostavshikIds()
      }

   }, [organization])

   useEffect(()=>{
      setIdDogovor('')
   },[organization])




   useEffect(() => {
      getTovars()
      getDogovors()
   }, [])

   useEffect(() => {
      setTotalCost(+quantity * +price)
   }, [price])

   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>оформить заказ на поставку</h1>

         {
            tovars && dogovora &&
            <div>
               <Box style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '9vh' }}>
                  <FormControl style={{ width: '20vw' }}>
                     <InputLabel>товары</InputLabel>
                     <Select
                        label="товары"
                        value={idTovar}
                        onChange={event => setIdTovar(event.target.value)
                        }
                     >
                        {
                           tovars.map((item, index) => <MenuItem key={index} value={item.id}>{item.product}</MenuItem>)
                        }
                     </Select>
                  </FormControl>
                  {
                     postavshiks &&
                     <FormControl style={{ width: '25vw' }}>
                        <InputLabel>поставщики</InputLabel>
                        <Select
                           label="поставщики"
                           value={organization}
                           onChange={event => setOrganization(event.target.value)
                           }
                        >
                           {
                              postavshiks.map(item => <MenuItem key={item.organization} value={item.id}>{item.organization}</MenuItem>)
                           }
                        </Select>
                     </FormControl>
                  }

                  <FormControl style={{ width: '20vw' }}>
                     <InputLabel>ID договора поставки</InputLabel>
                     <Select
                        label='ID договора поставки'
                        value={idDogovor}
                        onChange={event => setIdDogovor(event.target.value)
                        }
                     >
                        {
                           ids && ids.map((item, index) => <MenuItem key={index} value={item.id}>{item.id}</MenuItem>)
                        }
                     </Select>
                  </FormControl>
               </Box>
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
               </Box>

               <p style={{ textAlign: 'center' }}>общая стоимость: {totalCost}</p>
               {
                  <Button
                     onClick={() => submit()}
                     sx={{ display: 'block', height: '4vh', mx: 'auto', marginTop: '3vh' }}
                     size='small'
                     variant='outlined'
                     color='success'>
                     заказать
                  </Button>
               }
            </div>
         }
      </div>

   )
}