
import { useEffect, useState } from "react"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from "axios"
import { Box } from "@mui/system"

export default function Create() {

   const [product, setProduct] = useState('')
   const measurement = ['метр', 'кг', 'литр', 'мешок', 'тонна', 'штука']
   const [unit, setUnit] = useState('')

   const submit = async () => {
      try {
         await axios.post(`http://localhost:7000/CreateTovar`, { product, unit })
         alert('tovar created successfully')
         setProduct('')
         setUnit('')
      }
      catch (error) { throw new Error('TR: failed to post tovar') }
   }

   return (
      <div>
         <h1 style={{ textAlign: 'center' }}>ввести товар</h1>
         <Box style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

            <TextField
               autoComplete='off'
               size='small'
               variant="standard"
               label='название товара'
               value={product}
               onChange={event => setProduct(event.target.value)}
            />

            <FormControl style={{ width: '25vw' }}>
               <InputLabel>unit</InputLabel>
               <Select
                  label="unit"
                  value={unit}
                  onChange={event => setUnit(event.target.value)}
               >
                  {
                     measurement.map((item, index) => {
                        return <MenuItem key={index} value={item}>{item}</MenuItem>
                     })
                  }
               </Select>
            </FormControl>

            <Button
               onClick={() => submit()}
               size='small'
               variant='outlined'
               color='success'>
               ввести
            </Button>
         </Box>

      </div>
   )
}