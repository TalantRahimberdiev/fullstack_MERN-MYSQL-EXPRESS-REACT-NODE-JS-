
import { Link, Routes, Route } from "react-router-dom"
import { Box } from '@mui/material'

import CreateZakazPostavki from './crud/createZakazPostavki'
import ReadZakazPostavki from "./crud/readZakazPostavki"
import UpdateZakazPostavki from "./crud/updateZakazPostavki"
import DeleteZakazPostavki from "./crud/deleteZakazPostavki"

export default function MainZakazPostavki() {

   return (
      <div>
         <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', my: '3vh' }}>
            <Link style={{ marginBottom: '2vh' }} to='CreateZakazPostavki'>заказать</Link>
            <Link to='ReadZakazPostavki'>список</Link>
            <Link to='UpdateZakazPostavki'>редактировать</Link>
            <Link to='DeleteZakazPostavki'>удалить</Link>
         </Box>
         <Routes>
            <Route path="CreateZakazPostavki" element={<CreateZakazPostavki />} />
            <Route path="ReadZakazPostavki" element={<ReadZakazPostavki />} />
            <Route path="UpdateZakazPostavki" element={<UpdateZakazPostavki />} />
            <Route path="DeleteZakazPostavki" element={<DeleteZakazPostavki />} />
         </Routes>
      </div>
   )
}