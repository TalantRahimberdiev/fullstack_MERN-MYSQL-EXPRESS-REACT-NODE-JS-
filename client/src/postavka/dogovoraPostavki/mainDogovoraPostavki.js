
import { Link, Routes, Route } from "react-router-dom"
import { Box } from '@mui/material'

import CreateDogovor from './crud/createDogovor'
import ReadDogovor from "./crud/readDogovor"
import UpdateDogovor from "./crud/updateDogovor"
import DeleteDogovor from "./crud/deleteDogovor"

export default function MainDogovori() {

   return (
      <div>
         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', my: '3vh' }}>
            <Link style={{ marginBottom: '2vh' }} to='CreateDogovor'>заключить договор</Link>
            <Link to='ReadDogovor'>список договоров</Link>
            <Link to='UpdateDogovor'>редактировать договор</Link>
            <Link to='DeleteDogovor'>удалить договор</Link>
         </Box>
         <Routes>
            <Route path="CreateDogovor" element={<CreateDogovor />} />
            <Route path="ReadDogovor" element={<ReadDogovor />} />
            <Route path="UpdateDogovor" element={<UpdateDogovor />} />
            <Route path="DeleteDogovor" element={<DeleteDogovor />} />
         </Routes>
      </div>
   )
}