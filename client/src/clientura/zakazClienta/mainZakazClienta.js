
import { Link, Routes, Route } from "react-router-dom"
import { Box } from '@mui/material'

import CreateZakazClienta from './crud/createZakazClienta'
import ReadZakazClienta from "./crud/readZakazClienta"
import UpdateZakazClienta from "./crud/updateZakazClienta"
import DeleteZakazClienta from "./crud/deleteZakazClienta"

export default function MainZakazClienta() {

   return (
      <div>
         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', my: '3vh' }}>
            <Link style={{ marginBottom: '2vh' }} to='CreateZakazClienta'>заказать</Link>
            <Link to='ReadZakazClienta'>список</Link>
            <Link to='UpdateZakazClienta'>редактировать</Link>
            <Link to='DeleteZakazClienta'>удалить</Link>
         </Box>
         <Routes>
            <Route path="CreateZakazClienta" element={<CreateZakazClienta />} />
            <Route path="ReadZakazClienta" element={<ReadZakazClienta />} />
            <Route path="UpdateZakazClienta" element={<UpdateZakazClienta />} />
            <Route path="DeleteZakazClienta" element={<DeleteZakazClienta />} />
         </Routes>
      </div>
   )
}