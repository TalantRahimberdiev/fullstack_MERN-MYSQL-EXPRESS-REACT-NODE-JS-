
import { useEffect, useState } from "react"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from "axios"
import { Box } from "@mui/system"
import { MakingTable } from "../../../table_select/makingTable"

export default function DecadeSales() {

   const [decade, setDecade] = useState('')
   const [month, setMonth] = useState('')
   const [year, setYear] = useState('')
   const listDecades = [1, 2, 3]
   const listMonthes = 'Январь Февраль Март Апрель Май Июнь Июль Август Сентябрь Октябрь Ноябрь Декабрь'.split(' ')
   const [decadeSales, setDecadeSales] = useState()

   const [quantity, setQuantity] = useState(0)
   const [totalCost, setTotalCost] = useState(0)

   const getSales = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/decadeSales/${[decade, month, year]}`)
         if (response.data[0].wasPaid) {
            setDecadeSales(response.data)
            setQuantity(response.data.length)
            setTotalCost(response.data.reduce((total, item) => total + +item.totalCost, 0))
         }
      }
      catch (error) { throw new Error(setDecadeSales()) }
   }

   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>продажи за декаду</h1>

         <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8vh', marginBottom: '8vh',alignItems:'center' }}>
            <FormControl style={{ width: '25vw',marginRight:'5vw' }}>
               <InputLabel>декада</InputLabel>
               <Select
                  label="декада"
                  value={decade}
                  onChange={event => setDecade(event.target.value)
                  }
               >
                  {
                     listDecades.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)
                  }
               </Select>
            </FormControl>

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
               sx={{ width: '20vw', m: 'auto', my: '3vh' }}
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
            decadeSales && <>
               <p style={{ textAlign: 'center' }}>проданных товаров:{quantity}, на общую сумму {totalCost}</p>
               {
                  decadeSales && MakingTable(decadeSales)
               }

            </>

         }
      </div>
   )
}