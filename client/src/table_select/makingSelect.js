
import { MenuItem, FormControl, Select } from '@mui/material'
import { useState } from 'react'

export const MakingSelect = (response, f, selected, setSelected) => {
   const [open, setOpen] = useState(false)
   return (
      <FormControl sx={{ width: '33vw', ml: '33.3vw' }}>
         <Select
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            value={selected}
            onChange={event => { f(event.target.value); setSelected(event.target.value) }}
         >
            {
               response.map((item, index) => <MenuItem key={index} value={item.byType}>{item.byType}</MenuItem>)
            }
         </Select>
      </FormControl>
   )
}