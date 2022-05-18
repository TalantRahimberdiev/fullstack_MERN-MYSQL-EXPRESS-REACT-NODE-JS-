
import { useEffect, useState } from "react"
import { TextField } from '@mui/material'
import axios from "axios"
import { Box } from "@mui/system"
import { MakingTable } from "../../../table_select/makingTable"

export default function YearlySales() {

   const [year, setYear] = useState('')
   const [yearlySales, setYearlySales] = useState()

   const [quantity, setQuantity] = useState(0)
   const [totalCost, setTotalCost] = useState(0)

   const getSales = async () => {
      try {
         const response = await axios.get(`http://localhost:7000/yearlySupply/${year}`)
         if (response.data[0].id) {
            setYearlySales(response.data)
            setQuantity(response.data.length)
            setTotalCost(response.data.reduce((total, item) => total + +item.totalCost, 0))
         }
      }
      catch (error) { throw new Error(setYearlySales()) }
   }

   useEffect(() => {
      if (year) {
         getSales()
      }
   }, [year])

   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>поставки за год</h1>

         <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8vh', alignItems: 'center' }}>

            <TextField
               autoComplete='off'
               size='small'
               variant="standard"
               sx={{ width: '20vw', m: 'auto' }}
               label='год'
               value={year}
               onChange={event => setYear(event.target.value)}
            />
         </Box>

         {
            yearlySales && <>
               <p style={{ textAlign: 'center' }}>поставленных товаров:{quantity}, на общую сумму {totalCost}</p>
               {
                  yearlySales && MakingTable(yearlySales)
               }
            </>
         }
      </div>
   )
}