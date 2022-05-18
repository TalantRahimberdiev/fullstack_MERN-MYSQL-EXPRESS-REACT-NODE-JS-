
import { Link, Routes, Route } from "react-router-dom"
import { Box } from '@mui/material'

import Create from './crud/create'
import Read from "./crud/read"
import Update from "./crud/update"
import Delete from "./crud/delete"

export default function MainTovar() {

   return (
      <div>
         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', my: '3vh' }}>
            <Link style={{ marginBottom: '2vh' }} to='Create'>ввести товар</Link>
            <Link to='Read'>список товаров</Link>
            <Link to='Update'>редактировать товар</Link>
            <Link to='Delete'>удалить товар</Link>
         </Box>
         <Routes>
            <Route path="Create" element={<Create />} />
            <Route path="Read" element={<Read />} />
            <Route path="Update" element={<Update />} />
            <Route path="Delete" element={<Delete />} />
         </Routes>
      </div>
   )
}