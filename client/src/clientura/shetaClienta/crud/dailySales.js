
import { useEffect, useState } from "react"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from "axios"
import { Box } from "@mui/system"
import { MakingTable } from "../../../table_select/makingTable"

export default function DailySales() {

   const [day, setDay] = useState('')
   const [month, setMonth] = useState('')
   const [year, setYear] = useState('')
   const listMonthes = 'Январь Февраль Март Апрель Май Июнь Июль Август Сентябрь Октябрь Ноябрь Декабрь'.split(' ')
   const [dailySales, setDailySales] = useState()

   const [quantity, setQuantity] = useState(0)
   const [totalCost, setTotalCost] = useState(0)

   const getSales = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/dailySales/${[day, month, year]}`)
         if (response.data[0].wasPaid) {
            setDailySales(response.data)
            setQuantity(response.data.length)
            setTotalCost(response.data.reduce((total, item) => total + +item.totalCost, 0))
         }
      }
      catch (error) { throw new Error(setDailySales()) }
   }

   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>суточные продажи</h1>

         <Box style={{ display: 'flex', justifyContent: 'space-around', marginTop: '8vh', marginBottom: '8vh', alignItems: 'center' }}>
            <TextField
               autoComplete='off'
               size='small'
               variant="standard"
               sx={{ width: '25vw', m: 'auto', my: '3vh' }}
               label='число'
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
            year &&
            <Button
               onClick={() => getSales()}
               sx={{ display: 'block', height: '4vh', mx: 'auto', marginTop: '3vh' }}
               size='small'
               variant='outlined'
               color='success'>
               получить
            </Button>
         }

         {
            dailySales && <>
               <p style={{ textAlign: 'center' }}>проданных товаров:{quantity}, на общую сумму {totalCost}</p>
               {
                  dailySales && MakingTable(dailySales)
               }

            </>

         }
      </div>
   )
}